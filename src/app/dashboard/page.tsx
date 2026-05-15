"use client";

import { motion } from "framer-motion";
import { Loader2, RotateCcw, Zap } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { Achievements } from "@/components/dashboard/Achievements";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { levelFromXp } from "@/lib/utils";

export default function DashboardPage() {
  const { progress, loaded, resetProgress } = useProgress();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-40 text-slate-400">
        <Loader2 className="h-7 w-7 animate-spin text-neon-green" />
      </div>
    );
  }

  const { level, current, needed } = levelFromXp(progress.xp);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="gradient-text">Operator</span>
          </h1>
          <p className="mt-1 text-slate-400">
            {progress.completedLessons.length === 0
              ? "Start your first lesson to begin tracking progress."
              : `You're on a ${progress.streak}-day streak. Keep the momentum.`}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Reset all progress? This cannot be undone."))
              resetProgress();
          }}
        >
          <RotateCcw className="h-4 w-4" /> Reset Progress
        </Button>
      </motion.div>

      <div className="glass rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <Zap className="h-4 w-4 text-neon-green" />
            Level {level}
          </span>
          <span className="text-xs text-slate-500">
            {current} / {needed} XP to level {level + 1}
          </span>
        </div>
        <Progress value={(current / Math.max(needed, 1)) * 100} />
      </div>

      <StatsGrid progress={progress} />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CourseProgress progress={progress} />
          <ActivityHeatmap progress={progress} />
        </div>
        <Achievements progress={progress} />
      </div>
    </div>
  );
}
