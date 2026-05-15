"use client";

import { useMemo } from "react";
import type { UserProgress } from "@/lib/types";

/**
 * A GitHub-style study heatmap for the last ~16 weeks, built from the
 * timestamps of completed tests and exams.
 */
export function ActivityHeatmap({ progress }: { progress: UserProgress }) {
  const { weeks, total } = useMemo(() => {
    const counts = new Map<string, number>();
    const add = (ts: number) => {
      const d = new Date(ts).toISOString().split("T")[0];
      counts.set(d, (counts.get(d) ?? 0) + 1);
    };
    for (const attempts of Object.values(progress.testResults))
      for (const a of attempts) add(a.timestamp);
    for (const exams of Object.values(progress.sectionExams))
      for (const e of exams) add(e.timestamp);

    const DAYS = 16 * 7;
    const cells: { date: string; count: number }[] = [];
    const today = new Date();
    for (let i = DAYS - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      cells.push({ date: key, count: counts.get(key) ?? 0 });
    }
    const weeks: { date: string; count: number }[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    let total = 0;
    counts.forEach((v) => (total += v));
    return { weeks, total };
  }, [progress]);

  const level = (c: number) => {
    if (c === 0) return "bg-white/5";
    if (c === 1) return "bg-neon-green/25";
    if (c === 2) return "bg-neon-green/50";
    return "bg-neon-green/90";
  };

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-100">Study Activity</h3>
        <span className="text-xs text-slate-500">
          {total} activit{total === 1 ? "y" : "ies"} logged
        </span>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((cell) => (
              <div
                key={cell.date}
                title={`${cell.date}: ${cell.count} activities`}
                className={`h-3 w-3 rounded-sm ${level(cell.count)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        Less
        <span className="h-3 w-3 rounded-sm bg-white/5" />
        <span className="h-3 w-3 rounded-sm bg-neon-green/25" />
        <span className="h-3 w-3 rounded-sm bg-neon-green/50" />
        <span className="h-3 w-3 rounded-sm bg-neon-green/90" />
        More
      </div>
    </div>
  );
}
