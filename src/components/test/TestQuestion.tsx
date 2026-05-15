"use client";

import type { TestQuestion as TQ } from "@/lib/types";

export function TestQuestion({
  question,
  index,
  value,
  onChange,
  disabled,
}: {
  question: TQ;
  index: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neon-green/15 border border-neon-green/40 text-sm font-semibold text-neon-green">
          {index + 1}
        </span>
        <p className="text-sm text-slate-200 leading-relaxed pt-0.5">
          {question.question}
        </p>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={5}
        placeholder="Write a detailed, technical answer..."
        className="w-full resize-y rounded-lg bg-bg-primary/80 border border-white/10 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/40 p-3 text-sm text-slate-200 placeholder:text-slate-600 disabled:opacity-50"
      />
      <div className="mt-1.5 flex justify-between text-xs">
        <span className="text-slate-600">
          Be specific — terminology and mechanisms are graded.
        </span>
        <span
          className={words >= 25 ? "text-neon-green" : "text-slate-500"}
        >
          {words} words
        </span>
      </div>
    </div>
  );
}
