"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { UserProgress } from "@/lib/types";
import { COURSE_SECTIONS } from "@/lib/course-data";
import { Progress } from "@/components/ui/Progress";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export function CourseProgress({ progress }: { progress: UserProgress }) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-semibold text-slate-100 mb-4">Course Progress</h3>
      <div className="flex flex-col gap-3">
        {COURSE_SECTIONS.map((section, i) => {
          const done = section.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;
          const percent = Math.round((done / section.lessons.length) * 100);
          const examPassed = (progress.sectionExams[section.id] ?? []).some(
            (e) => e.passed
          );
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/courses/${section.id}`}
                className="block rounded-lg p-3 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: `${section.color}1a`,
                      borderColor: `${section.color}55`,
                    }}
                  >
                    <Icon name={section.icon} className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-slate-200 truncate">
                        {section.title}
                      </span>
                      {examPassed && <Badge color="green">Mastered</Badge>}
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Progress value={percent} className="flex-1" height="h-1.5" />
                      <span className="text-xs text-slate-500 tabular-nums">
                        {done}/{section.lessons.length}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
