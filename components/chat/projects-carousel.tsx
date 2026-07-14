"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
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
        {projects.map((p, i) => {
          const githubLink = p.links?.find((link) => link.url.includes("github.com"));

          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="group flex w-[min(280px,calc(100vw-5.5rem))] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:w-[280px]"
            >
              <button type="button" onClick={() => setActive(p)} className="flex flex-1 flex-col text-left">
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface-soft to-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage.src}
                    alt={p.coverImage.alt}
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-[25px] shadow-lg transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-heading text-[15px] font-semibold leading-snug">{p.title}</h3>
                  <p className="text-[12.5px] leading-snug text-muted-foreground line-clamp-2">{p.tagline}</p>
                </div>
              </button>

              {githubLink && (
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${p.title} repository on GitHub`}
                  className="flex items-center gap-2 border-t border-border px-4 py-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-surface-soft hover:text-foreground"
                >
                  <FaGithub className="h-4 w-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5" />
                </a>
              )}
            </motion.article>
          );
        })}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto rounded-2xl border-border bg-surface sm:w-[calc(100%-3rem)] sm:max-w-5xl">
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
                      <span className="flex items-center gap-2">
                        <FaGithub className="h-4 w-4" />
                        {l.name}
                      </span>
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
                    <div key={img.src} className="overflow-hidden rounded-xl border border-border bg-surface-soft">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1280}
                        height={720}
                        className="h-auto w-full"
                        sizes="(max-width: 768px) 90vw, 720px"
                      />
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
