"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  showLabel = false,
  height = "h-2.5",
}: {
  value: number;
  className?: string;
  showLabel?: boolean;
  height?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full rounded-full bg-white/5 overflow-hidden border border-white/10",
          height
        )}
      >
        <motion.div
          className="h-full progress-neon rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-right text-xs text-slate-400">
          {Math.round(clamped)}%
        </div>
      )}
    </div>
  );
}
