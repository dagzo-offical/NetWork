"use client";

import { Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Timer({
  seconds,
  label,
  warning = false,
  className,
}: {
  seconds: number;
  label?: string;
  warning?: boolean;
  className?: string;
}) {
  const isLow = warning || seconds <= 60;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-sm",
        isLow
          ? "border-neon-red/50 text-neon-red bg-neon-red/10"
          : "border-neon-green/40 text-neon-green bg-neon-green/10",
        className
      )}
    >
      <Clock className={cn("h-4 w-4", isLow && "animate-pulse")} />
      {label && <span className="text-slate-400 text-xs">{label}</span>}
      <span className="tabular-nums">{formatTime(seconds)}</span>
    </div>
  );
}
