"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { UserProgress } from "@/lib/types";
import { ACHIEVEMENTS } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function Achievements({ progress }: { progress: UserProgress }) {
  const earned = new Set(progress.achievements);
  const entries = Object.entries(ACHIEVEMENTS);

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-100">Achievements</h3>
        <span className="text-xs text-slate-500">
          {earned.size}/{entries.length} unlocked
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {entries.map(([key, def], i) => {
          const unlocked = earned.has(key);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-lg border p-3 text-center ${
                unlocked
                  ? "border-neon-green/40 bg-neon-green/5"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div
                className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                  unlocked
                    ? "bg-neon-green/15 text-neon-green"
                    : "bg-white/5 text-slate-600"
                }`}
              >
                {unlocked ? (
                  <Icon name={def.icon} className="h-5 w-5" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </div>
              <div
                className={`text-xs font-medium ${
                  unlocked ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {def.title}
              </div>
              <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                {def.description}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
