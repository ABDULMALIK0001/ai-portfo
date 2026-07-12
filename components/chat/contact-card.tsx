"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Briefcase, Code2 } from "lucide-react";
import type { CONTACT } from "@/content/data";

export function ContactCard({ contact }: { contact: typeof CONTACT }) {
  const rows = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` },
    { icon: Briefcase, label: "LinkedIn", value: "abdulmalik-bajandouh", href: contact.linkedin },
    { icon: Code2, label: "GitHub", value: "ABDULMALIK0001", href: contact.github },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1.5 rounded-2xl border border-border bg-surface p-3.5"
    >
      {rows.map((r) => (
        <a
          key={r.label}
          href={r.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-surface-soft"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <r.icon className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] font-semibold text-foreground">{r.label}</span>
            <span className="block truncate text-[11.5px] text-muted-foreground">{r.value}</span>
          </span>
        </a>
      ))}
    </motion.div>
  );
}
