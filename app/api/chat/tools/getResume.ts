import { tool } from "ai";
import { z } from "zod";
import { RESUME_URL } from "@/content/data";

export const getResume = tool({
  description: "Give the visitor a link to Abdulmalik's résumé/CV when they ask for it.",
  inputSchema: z.object({}),
  execute: async () => ({ url: RESUME_URL }),
});
