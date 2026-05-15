"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ThumbsUp, AlertCircle, XCircle } from "lucide-react";
import type { ValidationResult } from "@/lib/types";

export function TestResult({ result }: { result: ValidationResult }) {
  const { score, passed, strengths, weaknesses, feedback } = result;
  const accent = passed ? "#00ff88" : "#ff0066";

  return (
    <div className="py-2">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 14 }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full border-2"
          style={{ borderColor: accent, boxShadow: `0 0 30px ${accent}55` }}
        >
          <span className="text-4xl font-bold" style={{ color: accent }}>
            {score}
          </span>
          <span
            className="absolute bottom-3 text-[10px] uppercase tracking-wider"
            style={{ color: accent }}
          >
            / 100
          </span>
        </motion.div>

        <h3
          className="mt-4 flex items-center gap-2 text-xl font-semibold"
          style={{ color: accent }}
        >
          {passed ? (
            <>
              <CheckCircle2 className="h-6 w-6" /> Passed
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6" /> Not Passed
            </>
          )}
        </h3>
        <p className="mt-1 text-sm text-slate-400 max-w-md">{feedback}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="glass rounded-lg p-4 border-neon-green/20">
          <h4 className="flex items-center gap-1.5 text-sm font-medium text-neon-green mb-2">
            <ThumbsUp className="h-4 w-4" /> Strengths
          </h4>
          <ul className="flex flex-col gap-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="text-xs text-slate-400 leading-relaxed">
                • {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-lg p-4 border-amber-400/20">
          <h4 className="flex items-center gap-1.5 text-sm font-medium text-amber-300 mb-2">
            <AlertCircle className="h-4 w-4" /> To Improve
          </h4>
          <ul className="flex flex-col gap-1.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-slate-400 leading-relaxed">
                • {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
