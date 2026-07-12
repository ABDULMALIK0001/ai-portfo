"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { ExperienceEntry } from "@/content/data";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3.5"
    >
      {entries.map((e, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground">{e.title}</p>
            <p className="text-[12px] text-muted-foreground">{e.org}</p>
            <p className="mt-0.5 text-[11px] font-medium text-text-faint">
              {e.period}
              {e.detail ? ` · ${e.detail}` : ""}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
