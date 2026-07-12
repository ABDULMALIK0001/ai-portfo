import { tool } from "ai";
import { z } from "zod";
import { PROJECTS } from "@/content/data";

export const getProjects = tool({
  description:
    "Show Abdulmalik's projects when the visitor asks about his work, projects, portfolio, or what he has built.",
  inputSchema: z.object({}),
  execute: async () => ({ projects: PROJECTS }),
});
