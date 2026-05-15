"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { COURSE_SECTIONS } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

export default function CoursesPage() {
  const { sectionProgress, isSectionUnlocked, isSectionExamPassed, loaded } =
    useProgress();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold">
          The <span className="gradient-text">Curriculum</span>
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl">
          Seven sections, taken in sequence. Complete every lesson in a section,
          then pass its final exam to unlock the next.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSE_SECTIONS.map((section, i) => {
          const prog = loaded
            ? sectionProgress(section.id)
            : { done: 0, total: section.lessons.length, percent: 0 };
          const unlocked = !loaded || isSectionUnlocked(section.id);
          const mastered = loaded && isSectionExamPassed(section.id);

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={unlocked ? `/courses/${section.id}` : "#"}
                className={!unlocked ? "pointer-events-none" : ""}
              >
                <div
                  className={`glass rounded-xl p-5 h-full transition-all ${
                    unlocked
                      ? "glass-hover cursor-pointer"
                      : "opacity-60"
                  } ${mastered ? "border-neon-green/40" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border"
                      style={{
                        backgroundColor: `${section.color}1a`,
                        borderColor: `${section.color}55`,
                      }}
                    >
                      <Icon name={section.icon} className="h-6 w-6" />
                    </div>
                    {!unlocked ? (
                      <Lock className="h-5 w-5 text-slate-600" />
                    ) : mastered ? (
                      <CheckCircle2 className="h-5 w-5 text-neon-green" />
                    ) : (
                      <ArrowRight className="h-5 w-5 text-slate-600" />
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-slate-100">
                      {section.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {section.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge color="slate">{section.lessons.length} lessons</Badge>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {section.totalDuration}
                    </span>
                    {mastered && <Badge color="green">Mastered</Badge>}
                    {!unlocked && <Badge color="red">Locked</Badge>}
                  </div>

                  <div className="mt-4">
                    <Progress value={prog.percent} height="h-1.5" />
                    <p className="mt-1 text-xs text-slate-500">
                      {prog.done} of {prog.total} lessons complete
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
