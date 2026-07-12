import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(8, "1 m"), // 8 messages/minute per IP
      prefix: "portfolio-chat",
    })
  : null;

// In-memory fallback so local dev / no-Upstash-yet still gets basic protection.
// NOTE: per-instance only — not shared across serverless invocations.
const memoryHits = new Map<string, number[]>();
function memoryLimit(ip: string, max = 8, windowMs = 60_000): boolean {
  const now = Date.now();
  const hits = (memoryHits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    memoryHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  memoryHits.set(ip, hits);
  return true;
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return success;
  }
  return memoryLimit(ip);
}
