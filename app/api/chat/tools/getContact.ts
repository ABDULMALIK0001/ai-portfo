import { tool } from "ai";
import { z } from "zod";
import { CONTACT } from "@/content/data";

export const getContact = tool({
  description: "Show ways to contact Abdulmalik when the visitor asks how to reach him or get in touch.",
  inputSchema: z.object({}),
  execute: async () => ({ contact: CONTACT }),
});
