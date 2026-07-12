import { tool } from "ai";
import { z } from "zod";
import { FUN_BLURB } from "@/content/data";

export const getFun = tool({
  description:
    "Share something light and personal about Abdulmalik beyond work when the visitor asks for something fun or personal.",
  inputSchema: z.object({}),
  execute: async () => ({ blurb: FUN_BLURB }),
});
