"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUp, Square } from "lucide-react";
import { isRTL } from "@/lib/rtl";

export function MessageInput({
  onSend,
  onStop,
  isStreaming,
  autoFocus,
}: {
  onSend: (text: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState("");
  const rtl = isRTL(value);

  function submit() {
    const text = value.trim();
    if (!text || isStreaming) return;
    onSend(text);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="flex w-full flex-row-reverse items-center gap-2.5 rounded-2xl border border-border-strong bg-surface p-2 pr-4 shadow-sm">
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop generating"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Square className="h-3.5 w-3.5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        dir={rtl ? "rtl" : "ltr"}
        placeholder="Ask me anything…"
        rows={1}
        autoFocus={autoFocus}
        className="max-h-28 min-h-[24px] flex-1 resize-none bg-transparent text-[14px] leading-relaxed text-foreground outline-none placeholder:text-text-faint"
      />
    </div>
  );
}
