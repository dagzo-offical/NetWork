"use client";

import { motion } from "framer-motion";
import { Flame, Star, BookCheck, Layers } from "lucide-react";
import type { UserProgress } from "@/lib/types";
import { COURSE_SECTIONS, TOTAL_LESSONS } from "@/lib/course-data";

export function StatsGrid({ progress }: { progress: UserProgress }) {
  const sectionsDone = COURSE_SECTIONS.filter((s) =>
    s.lessons.every((l) => progress.completedLessons.includes(l.id))
  ).length;

  const stats = [
    {
      icon: BookCheck,
      label: "Lessons Completed",
      value: `${progress.completedLessons.length}`,
      sub: `of ${TOTAL_LESSONS}`,
      color: "#00ff88",
    },
    {
      icon: Star,
      label: "Total XP",
      value: progress.xp.toLocaleString(),
      sub: "experience points",
      color: "#0088ff",
    },
    {
      icon: Flame,
      label: "Study Streak",
      value: `${progress.streak}`,
      sub: progress.streak === 1 ? "day" : "days",
      color: "#ff0066",
    },
    {
      icon: Layers,
      label: "Sections Mastered",
      value: `${sectionsDone}`,
      sub: `of ${COURSE_SECTIONS.length}`,
      color: "#8800ff",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass glass-hover rounded-xl p-5"
        >
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border mb-3"
            style={{ backgroundColor: `${s.color}1a`, borderColor: `${s.color}55` }}
          >
            <s.icon className="h-5 w-5" style={{ color: s.color }} />
          </div>
          <div className="text-3xl font-bold text-slate-100">{s.value}</div>
          <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
          <div className="text-sm text-slate-400 mt-1">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
