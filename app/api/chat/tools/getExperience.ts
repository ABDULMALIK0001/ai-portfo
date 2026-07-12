import { tool } from "ai";
import { z } from "zod";
import { EXPERIENCE } from "@/content/data";

export const getExperience = tool({
  description:
    "Show Abdulmalik's education and background when the visitor asks about his experience, education, or history.",
  inputSchema: z.object({}),
  execute: async () => ({ entries: EXPERIENCE }),
});
