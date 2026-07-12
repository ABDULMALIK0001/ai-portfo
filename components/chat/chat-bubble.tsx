"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import type { UIMessage } from "ai";
import { isRTL } from "@/lib/rtl";
import { TypingIndicator } from "./typing-indicator";
import { ProjectsCarousel } from "./projects-carousel";
import { SkillsGroups } from "./skills-groups";
import { ContactCard } from "./contact-card";
import { ExperienceTimeline } from "./experience-timeline";
import { ResumeCard } from "./resume-card";
import { FunCard } from "./fun-card";
import { ProfileCard } from "./profile-card";
import type { Project, SkillGroup, ExperienceEntry, CONTACT, PROFILE } from "@/content/data";

type ToolPart = {
  type: string;
  state?: string;
  output?: unknown;
};

function renderToolResult(part: ToolPart) {
  if (part.state !== "output-available" || !part.output) return null;
  const toolName = part.type.replace(/^tool-/, "");
  const output = part.output as Record<string, unknown>;

  switch (toolName) {
    case "getProfile":
      return <ProfileCard profile={output.profile as typeof PROFILE} />;
    case "getProjects":
      return <ProjectsCarousel projects={output.projects as Project[]} />;
    case "getSkills":
      return <SkillsGroups groups={output.groups as SkillGroup[]} />;
    case "getContact":
      return <ContactCard contact={output.contact as typeof CONTACT} />;
    case "getExperience":
      return <ExperienceTimeline entries={output.entries as ExperienceEntry[]} />;
    case "getResume":
      return <ResumeCard url={output.url as string} />;
    case "getFun":
      return <FunCard blurb={output.blurb as string} />;
    default:
      return null;
  }
}

export function ChatBubbleRow({ message, isStreaming }: { message: UIMessage; isStreaming: boolean }) {
  const isUser = message.role === "user";
  const textParts = message.parts.filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text");
  const toolParts = message.parts.filter((p) => p.type.startsWith("tool-")) as unknown as ToolPart[];
  const text = textParts.map((p) => p.text).join("");
  const rtl = isRTL(text);
  const showTyping = isStreaming && !text && toolParts.length === 0;

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-row-reverse items-start gap-2.5"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-3.5 w-3.5" />
        </span>
        <div
          dir={rtl ? "rtl" : "ltr"}
          className={`max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-[13.5px] leading-relaxed text-primary-foreground ${rtl ? "text-right" : "text-left"}`}
        >
          {text}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-2.5"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface-soft text-primary">
        <Bot className="h-3.5 w-3.5" />
      </span>
      <div className="flex max-w-[86%] flex-col gap-2.5">
        {showTyping ? (
          <div className="rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-2.5">
            <TypingIndicator />
          </div>
        ) : (
          text && (
            <div
              dir={rtl ? "rtl" : "ltr"}
              className={`rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-2.5 text-[13.5px] leading-relaxed text-foreground ${rtl ? "text-right" : "text-left"}`}
            >
              {text}
            </div>
          )
        )}
        {toolParts.map((part, i) => <div key={i}>{renderToolResult(part)}</div>)}
      </div>
    </motion.div>
  );
}
