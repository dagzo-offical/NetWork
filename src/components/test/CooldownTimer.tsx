"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { formatTime } from "@/lib/utils";

/**
 * Shows the remaining 30-minute cooldown after a failed test attempt.
 * Calls `onComplete` once the cooldown elapses.
 */
export function CooldownTimer({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, onComplete]);

  const pct = seconds > 0 ? (1 - remaining / seconds) * 100 : 100;

  return (
    <div className="text-center py-8">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-neon-red/40 bg-neon-red/10">
        <Lock className="h-7 w-7 text-neon-red" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100">Test Locked</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
        You did not pass. Take time to review the lesson — the exam unlocks
        again when the cooldown ends.
      </p>
      <div className="mt-5 font-mono text-3xl text-neon-red tabular-nums">
        {formatTime(remaining)}
      </div>
      <div className="mt-4 mx-auto max-w-xs h-2 rounded-full bg-white/5 overflow-hidden border border-white/10">
        <div
          className="h-full bg-gradient-to-r from-neon-red to-neon-purple transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
