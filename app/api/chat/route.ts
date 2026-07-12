import { google } from "@ai-sdk/google";
import { streamText, stepCountIs, convertToModelMessages, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "./prompt";
import { tools } from "./tools";
import { checkRateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_MESSAGES = 10;
const MAX_REQUEST_BYTES = 24_000;
const MAX_TOTAL_CHARS = 4_000;

function toUserMessage(value: unknown): UIMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as { role?: unknown; parts?: unknown };
  if (message.role !== "user" || !Array.isArray(message.parts)) return null;

  const text = message.parts
    .filter((part): part is { type: "text"; text: string } =>
      !!part && typeof part === "object" &&
      (part as { type?: unknown }).type === "text" &&
      typeof (part as { text?: unknown }).text === "string",
    )
    .map((part) => part.text.trim())
    .filter(Boolean)
    .join(" ");

  return text ? { id: crypto.randomUUID(), role: "user", parts: [{ type: "text", text }] } : null;
}

function isPromptProbe(text: string): boolean {
  return /(?:system\s*prompt|developer\s*message|hidden\s*instructions?|reveal\s+(?:your\s+)?(?:prompt|instructions?)|ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions?|jailbreak|tool\s*(?:names?|configuration)|what\s+are\s+your\s+instructions?)/i.test(text);
}

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return new Response("Request too large.", { status: 413 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return new Response("You're chatting fast — give me a sec and try again.", { status: 429 });
    }

    const body: unknown = await req.json();
    const incomingMessages = body && typeof body === "object" && Array.isArray((body as { messages?: unknown }).messages)
      ? (body as { messages: unknown[] }).messages
      : [];
    const userMessages = incomingMessages.map(toUserMessage).filter((message): message is UIMessage => message !== null);

    if (userMessages.length === 0) {
      return new Response("Bad request", { status: 400 });
    }

    const textOf = (message: UIMessage) => (message.parts[0] as { text: string }).text;
    const lastMessage = userMessages[userMessages.length - 1];
    const totalChars = userMessages.reduce((sum, message) => sum + textOf(message).length, 0);
    if (userMessages.some((message) => textOf(message).length > MAX_MESSAGE_CHARS) || totalChars > MAX_TOTAL_CHARS) {
      return new Response("Message too long.", { status: 400 });
    }
    if (isPromptProbe(textOf(lastMessage))) {
      return new Response("I can’t help with internal instructions, but I’m happy to talk about Abdulmalik’s work.", { status: 400 });
    }

    // Only user-authored text is sent back to the model. This prevents callers from forging
    // assistant or tool messages in the request to influence the next response.
    const trimmedMessages = userMessages.slice(-MAX_HISTORY_MESSAGES);
    const modelMessages = await convertToModelMessages(trimmedMessages);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      tools,
      stopWhen: stepCountIs(2), // allow 1 tool call + final text
      temperature: 0.6,
      maxOutputTokens: 800,
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error("chat stream error:", error);
        const message = error instanceof Error ? error.message.toLowerCase() : "";
        return message.includes("quota") || message.includes("rate limit")
          ? "The AI request limit has been reached. Please try again shortly."
          : "Something went wrong, please try again.";
      },
    });
  } catch (err) {
    console.error("chat error:", err);
    return new Response("Something went wrong, please try again.", { status: 500 });
  }
}
