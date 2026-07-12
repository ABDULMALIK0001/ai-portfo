"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { isRTL } from "@/lib/rtl";

export function FunCard({ blurb }: { blurb: string }) {
  const rtl = isRTL(blurb);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3.5"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Gamepad2 className="h-4 w-4" />
      </span>
      <p dir={rtl ? "rtl" : "ltr"} className={`text-[13px] leading-relaxed text-foreground ${rtl ? "text-right" : "text-left"}`}>
        {blurb}
      </p>
    </motion.div>
  );
}
