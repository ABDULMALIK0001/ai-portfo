"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/content/data";

const CATEGORY_STYLES: Record<Project["category"], string> = {
  "AI / ML": "bg-blue-50 text-blue-700",
  "AI App": "bg-violet-50 text-violet-700",
  "Full-Stack": "bg-amber-50 text-amber-700",
};

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {projects.map((p, i) => (
          <motion.button
            key={p.title}
            type="button"
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="group flex w-[min(280px,calc(100vw-5.5rem))] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:w-[280px]"
          >
            <div className="relative h-36 w-full overflow-hidden bg-surface-soft">
              <Image
                src={p.coverImage.src}
                alt={p.coverImage.alt}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-heading text-[15px] font-semibold leading-snug">{p.title}</h3>
              <p className="text-[12.5px] leading-snug text-muted-foreground line-clamp-2">{p.tagline}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border-border bg-surface sm:w-full">
          {active && (
            <>
              <DialogHeader>
                <span
                  className={`mb-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_STYLES[active.category]}`}
                >
                  {active.category}
                </span>
                <DialogTitle className="font-heading text-xl font-bold">{active.title}</DialogTitle>
              </DialogHeader>

              <p className="text-[13.5px] leading-relaxed text-foreground">{active.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {active.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {active.links && active.links.length > 0 && (
                <div className="flex flex-col gap-1.5 border-t border-border pt-3">
                  {active.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] font-medium text-primary transition-colors hover:bg-surface-soft"
                    >
                      {l.name}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}

              {active.images.length > 0 && (
                <div className="grid grid-cols-1 gap-3 border-t border-border pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    App preview
                  </p>
                  {active.images.map((img) => (
                    <div key={img.src} className="relative aspect-video overflow-hidden rounded-xl bg-surface-soft">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 90vw, 720px" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
