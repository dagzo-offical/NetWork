"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { getSection } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { Icon } from "@/components/ui/Icon";
import { Badge, difficultyColor } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";

export default function SectionPage() {
  const params = useParams<{ sectionId: string }>();
  const section = getSection(params.sectionId);
  const {
    isLessonComplete,
    isLessonUnlocked,
    sectionProgress,
    loaded,
    isSectionExamPassed,
  } = useProgress();

  if (!section) return notFound();

  const prog = loaded
    ? sectionProgress(section.id)
    : { done: 0, total: section.lessons.length, percent: 0 };
  const allComplete = prog.done === prog.total && prog.total > 0;
  const examPassed = loaded && isSectionExamPassed(section.id);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-green mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> All Courses
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass gradient-border rounded-xl p-6 mb-8"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: `${section.color}1a`,
              borderColor: `${section.color}55`,
            }}
          >
            <Icon name={section.icon} className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-100">
              {section.title}
            </h1>
            <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
              {section.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge color="slate">{section.lessons.length} lessons</Badge>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" /> {section.totalDuration}
              </span>
              {examPassed && <Badge color="green">Section Mastered</Badge>}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Progress value={prog.percent} showLabel />
        </div>
      </motion.div>

      <div className="flex flex-col gap-2.5 mb-8">
        {section.lessons.map((lesson, i) => {
          const done = loaded && isLessonComplete(lesson.id);
          const unlocked =
            !loaded || isLessonUnlocked(section.id, lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={unlocked ? `/courses/${section.id}/${lesson.id}` : "#"}
                className={!unlocked ? "pointer-events-none" : ""}
              >
                <div
                  className={`glass rounded-lg p-4 flex items-center gap-4 transition-all ${
                    unlocked ? "glass-hover cursor-pointer" : "opacity-50"
                  }`}
                >
                  <div className="shrink-0">
                    {done ? (
                      <CheckCircle2 className="h-6 w-6 text-neon-green" />
                    ) : !unlocked ? (
                      <Lock className="h-6 w-6 text-slate-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-slate-500" />
                    )}
                  </div>
                  <span className="font-mono text-sm text-slate-600 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {lesson.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge color={difficultyColor(lesson.difficulty)}>
                        {lesson.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" /> {lesson.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="glass rounded-xl p-6 text-center">
        <GraduationCap
          className={`mx-auto h-8 w-8 ${
            allComplete ? "text-neon-green" : "text-slate-600"
          }`}
        />
        <h3 className="mt-2 font-semibold text-slate-100">
          Final Exam — {section.title}
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          {allComplete
            ? "All lessons complete. Take the final exam to master this section."
            : `Complete all ${section.lessons.length} lessons to unlock the final exam.`}
        </p>
        <div className="mt-4">
          {allComplete ? (
            <Button variant="solid" href={`/exam/${section.id}`}>
              Start Final Exam
            </Button>
          ) : (
            <Button variant="ghost" disabled>
              <Lock className="h-4 w-4" /> Exam Locked
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
