"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import type { PROFILE } from "@/content/data";

export function ProfileCard({ profile }: { profile: typeof PROFILE }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-surface p-4"
    >
      <div className="flex items-center gap-3">
        <Image src="/avatar.png" alt={profile.name} width={56} height={56} className="h-14 w-14 rounded-2xl border border-border object-cover" />
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-foreground">{profile.name}</h3>
          <p className="mt-0.5 text-[12.5px] text-primary">{profile.role}</p>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line text-[12.5px] leading-relaxed text-foreground">{profile.bio}</p>
      <div className="mt-4 space-y-2 text-[12.5px] text-muted-foreground">
        <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 shrink-0 text-primary" /><span>{profile.education} · {profile.university}</span></div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" /><span>{profile.location}</span></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {profile.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"><Sparkles className="h-3 w-3" />{tag}</span>)}
      </div>
    </motion.div>
  );
}
