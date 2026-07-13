# Abdulmalik — AI-Native Portfolio

An interactive, conversation-first portfolio. Instead of scrolling through a
static page, visitors ask questions ("What have you built?", "What are your
skills?") and an AI answers in first person as Abdulmalik — calling tools that
render rich cards (projects, skills, contact, experience) instead of plain text.

Inspired by [omarlebda.com](https://www.omarlebda.com), built on
[toukoum/portfolio](https://github.com/toukoum/portfolio)'s architecture,
rebuilt from scratch on **Google Gemini** (free tier) instead of OpenAI.

## How it works

1. The hero shows an avatar, a greeting, an "Ask me anything" input, and
   suggestion chips (Me / Projects / Skills / Experience / Contact / Fun).
2. Every message goes to `/api/chat`, which streams a response from
   `gemini-2.5-flash` via the Vercel AI SDK, using a system prompt that makes
   the model answer **as** Abdulmalik (first person, bilingual Arabic/English).
3. When relevant, the model calls a **tool** (`getProjects`, `getSkills`,
   `getContact`, `getExperience`, `getResume`, `getFun`) that returns
   structured data. The client renders that data as a rich UI component —
   a horizontally-scrolling project carousel with an expandable detail view,
   grouped skill pills, a contact card, etc. — instead of dumping it as text.
4. Rate limiting (Upstash, falls back to in-memory locally), input validation,
   and system-prompt guardrails protect the endpoint (see "Security" below).

## Setup

1. **Gemini API key** — reuse the same free key from the other AI projects, or
   get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=AIza...
   ```
3. (Optional, recommended before deploying publicly) Rate limiting: create a
   free [Upstash Redis](https://upstash.com) database and add
   `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` to `.env.local`.
   Without it, the app falls back to a basic in-memory limiter (fine for local
   dev, not for a real deployment with multiple server instances).
4. `npm install`
5. `npm run dev` → open [http://localhost:3000](http://localhost:3000)

## Before going live

- **Replace `public/avatar.png`** with a real photo/memoji — it's currently a
  placeholder.
- Add final screenshots for VitaVision and JobTrack.
- Add live demo links after the projects are deployed.
- Set up Upstash for real rate limiting before deploying publicly (see Setup).

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Vercel AI SDK (`ai`, `@ai-sdk/react`) + `@ai-sdk/google` (Gemini, free tier)
- Tailwind CSS v4 + shadcn/ui + framer-motion
- Upstash Redis for rate limiting (optional, graceful fallback)

## Security

Unlike the original template (which has no protection at all), this app adds:
- **Rate limiting** — 8 messages/minute per IP.
- **Input validation** — message length and history length caps.
- **Prompt guardrails** — the AI only discusses Abdulmalik; it refuses to
  reveal its system prompt, roleplay as something else, or be used as a
  general-purpose assistant, and ignores injected instructions in messages.

## Deploy

Push to GitHub, import on [Vercel](https://vercel.com/new), and set
`GOOGLE_GENERATIVE_AI_API_KEY` (and the Upstash vars, if using them) in the
project's environment variables.
