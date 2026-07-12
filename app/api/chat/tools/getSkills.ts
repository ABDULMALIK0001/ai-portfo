import { tool } from "ai";
import { z } from "zod";
import { SKILL_GROUPS } from "@/content/data";

export const getSkills = tool({
  description: "Show Abdulmalik's technical and soft skills when the visitor asks about his skills or tech stack.",
  inputSchema: z.object({}),
  execute: async () => ({ groups: SKILL_GROUPS }),
});
