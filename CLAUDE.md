@AGENTS.md

# Portfolio Site — Quick Context

This is the AI-native conversational portfolio for Abdulmalik Bajandouh.
For the full project context (all 4 projects, decisions, status), read the
master document: `../CLAUDE.md`

## Key files
- `app/page.tsx` — Hero + chat view (single-page conversational UI)
- `app/api/chat/route.ts` — AI SDK v5 streamText + Gemini + tools
- `app/api/chat/prompt.ts` — System prompt (first-person persona)
- `app/api/chat/tools/` — 6 tools (getProjects, getSkills, getContact, etc.)
- `content/data.ts` — All portfolio content (projects, skills, experience, contact)
- `hooks/use-fluid-cursor.ts` — WebGL fluid simulation (ported from toukoum/portfolio)
- `components/fluid-cursor.tsx` — React wrapper for WebGL fluid cursor
- `components/chat/` — Chat UI components (bubbles, input, tool-result cards)

## Reference site
Modeled after **omarlebda.com** (source: `github.com/toukoum/portfolio`)

## Running locally
```bash
npm run dev
```
Requires `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local` (Gemini free tier).
