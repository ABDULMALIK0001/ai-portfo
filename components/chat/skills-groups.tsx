"use client";

import { motion } from "framer-motion";
import { Code2, Server, Sparkles, HeartHandshake } from "lucide-react";
import type { SkillGroup } from "@/content/data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Frontend Development": Code2,
  "Backend & Systems": Server,
  "AI & Fullstack Engineering": Sparkles,
  "Soft Skills": HeartHandshake,
};

export function SkillsGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {groups.map((g, i) => {
        const Icon = ICONS[g.name] ?? Code2;
        return (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-surface p-3.5"
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-primary" />
              <h3 className="font-heading text-[12.5px] font-semibold">{g.name}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
