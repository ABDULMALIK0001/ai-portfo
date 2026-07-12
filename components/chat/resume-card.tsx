"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export function ResumeCard({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-fit items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 pr-4 transition-colors hover:border-primary/30"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-[13px] font-semibold text-foreground">My Résumé</span>
        <span className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
          <Download className="h-3 w-3" />
          View or download PDF
        </span>
      </span>
    </motion.a>
  );
}
