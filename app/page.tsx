"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { toast } from "sonner";
import { X, User, Briefcase, Sparkles, Mail, Gamepad2 } from "lucide-react";
import { FluidCursor } from "@/components/fluid-cursor";
import { MessageInput } from "@/components/chat/message-input";
import { ChatBubbleRow } from "@/components/chat/chat-bubble";
import { CONTACT, FUN_BLURB, PROFILE, PROJECTS, SKILL_GROUPS } from "@/content/data";

const CHIPS = [
  { label: "Me", icon: User, question: "Tell me about yourself", reply: "" },
  { label: "Projects", icon: Briefcase, question: "What have you built?", reply: "I've built a few things I'm really proud of! Take a look:", toolName: "getProjects", output: { projects: PROJECTS } },
  { label: "Skills", icon: Sparkles, question: "What are your skills?", reply: "Here are the tools and areas I work with most:", toolName: "getSkills", output: { groups: SKILL_GROUPS } },
  { label: "Contact", icon: Mail, question: "How can I reach you?", reply: "I'd be happy to connect. Here's where you can find me:", toolName: "getContact", output: { contact: CONTACT } },
  { label: "Fun", icon: Gamepad2, question: "Tell me something fun about you", reply: "", toolName: "getFun", output: { blurb: FUN_BLURB } },
];

export default function Home() {
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat" }));
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport,
    onError: (error) => {
      const isRateLimit = error.message?.includes("429") || error.message?.toLowerCase().includes("fast");
      toast.error(isRateLimit ? "You're chatting fast — give me a sec and try again." : "Something went wrong — please try again.");
    },
  });

  const isChatting = messages.length > 0;
  const isStreaming = status === "streaming" || status === "submitted";

  function handleSend(text: string) {
    sendMessage({ text });
  }

  function handleQuickReply(chip: (typeof CHIPS)[number]) {
    const userMessage: UIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: chip.question }],
    };
    const assistantParts: UIMessage["parts"] = [{ type: "text", text: chip.reply }];

    if (chip.label === "Me") {
      assistantParts.push({
        type: "tool-getProfile",
        toolCallId: crypto.randomUUID(),
        state: "output-available",
        input: {},
        output: { profile: PROFILE },
      } as UIMessage["parts"][number]);
    }

    if (chip.toolName && chip.output) {
      assistantParts.push({
        type: `tool-${chip.toolName}`,
        toolCallId: crypto.randomUUID(),
        state: "output-available",
        input: {},
        output: chip.output,
      } as UIMessage["parts"][number]);
    }

    setMessages([
      ...messages,
      userMessage,
      { id: crypto.randomUUID(), role: "assistant", parts: assistantParts },
    ]);
  }

  // Smooth client-side "go back home" — no page reload, matches omarlebda.com's pattern
  // of a clear, persistent close (X) button instead of relying on the browser back button.
  function handleGoHome() {
    if (isStreaming) stop();
    setMessages([]);
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <FluidCursor />

      <header className="relative z-10 flex items-center gap-3 px-4 py-4 sm:px-6">
        {isChatting && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={handleGoHome}
            aria-label="Back to home"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:bg-surface-soft hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col">
        <AnimatePresence mode="wait">
          {!isChatting ? (
            <motion.div
              key="hero"
              initial={false}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col items-center justify-center px-4 pb-16 sm:px-6 sm:pb-24"
            >
              <motion.div
                className="order-3 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => handleQuickReply(CHIPS[0])}
                  aria-label="Learn more about Abdulmalik"
                  className="h-56 w-56 cursor-pointer overflow-hidden rounded-3xl border border-white/50 bg-white/20 p-3 shadow-sm backdrop-blur-md sm:h-72 sm:w-72"
                >
                  <Image
                    src="/avatar.png"
                    alt="Abdulmalik Bajandouh"
                    width={288}
                    height={288}
                    className="h-full w-full object-contain"
                    preload
                    unoptimized
                  />
                </motion.button>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-1 text-center text-lg font-medium text-foreground sm:text-xl"
              >
                Hey, I&apos;m Abdulmalik 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-2 mt-1 text-center font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl"
              >
                AI Portfolio
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="order-4 mt-7 w-full max-w-[500px]"
              >
                <MessageInput onSend={handleSend} onStop={stop} isStreaming={isStreaming} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="order-5 mt-5 flex flex-wrap justify-center gap-2"
              >
                {CHIPS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => handleQuickReply(c)}
                    className="flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-surface-soft"
                  >
                    <c.icon className="h-3.5 w-3.5 text-primary" />
                    {c.label}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-3 pb-3 sm:px-4 sm:pb-4">
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-6">
                  {messages.map((m, i) => (
                    <ChatBubbleRow
                      key={m.id}
                      message={m}
                      isStreaming={isStreaming && i === messages.length - 1 && m.role === "assistant"}
                    />
                  ))}
                </div>

                <div className="sticky bottom-4">
                  <MessageInput onSend={handleSend} onStop={stop} isStreaming={isStreaming} autoFocus />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!isChatting && (
        <footer className="hidden">
          <span>© 2026 Abdulmalik Bajandouh</span>
          <Link href={CONTACT.github} target="_blank" className="hover:text-foreground">
            GitHub
          </Link>
          <Link href={CONTACT.linkedin} target="_blank" className="hover:text-foreground">
            LinkedIn
          </Link>
        </footer>
      )}
    </div>
  );
}
