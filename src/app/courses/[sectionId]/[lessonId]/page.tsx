"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";
import { getSection, getLesson, getAdjacentLessons } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { Badge, difficultyColor } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LessonSidebar } from "@/components/course/LessonSidebar";
import { LessonContent } from "@/components/course/LessonContent";
import { TestModal } from "@/components/test/TestModal";

export default function LessonPage() {
  const params = useParams<{ sectionId: string; lessonId: string }>();
  const section = getSection(params.sectionId);
  const lesson = getLesson(params.sectionId, params.lessonId);
  const { isLessonComplete, loaded } = useProgress();
  const [testOpen, setTestOpen] = useState(false);

  if (!section || !lesson) return notFound();

  const completed = loaded && isLessonComplete(lesson.id);
  const { prev, next } = getAdjacentLessons(section.id, lesson.id);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <Link
        href={`/courses/${section.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-green mb-5"
      >
        <ArrowLeft className="h-4 w-4" /> {section.title}
      </Link>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <LessonSidebar section={section} currentLessonId={lesson.id} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0"
        >
          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge color={difficultyColor(lesson.difficulty)}>
                {lesson.difficulty}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" /> {lesson.duration}
              </span>
              {completed && (
                <Badge color="green">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-100">
              {lesson.title}
            </h1>
          </div>

          <div className="glass rounded-xl p-6 sm:p-8">
            <LessonContent lesson={lesson} />

            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="glass rounded-xl p-5 text-center">
                <ClipboardCheck className="mx-auto h-8 w-8 text-neon-green" />
                <h3 className="mt-2 font-semibold text-slate-100">
                  {completed ? "Lesson Complete" : "Ready to test your knowledge?"}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {completed
                    ? "You've passed this lesson's exam. Retake it any time."
                    : "Pass a 3-question AI-graded exam to complete this lesson and unlock the next."}
                </p>
                <Button
                  variant="solid"
                  size="lg"
                  className="mt-4"
                  onClick={() => setTestOpen(true)}
                >
                  {completed ? "Retake Exam" : "Take Lesson Exam"}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {prev ? (
              <Button variant="ghost" href={`/courses/${prev.sectionId}/${prev.id}`}>
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
            ) : (
              <span />
            )}
            {next && completed && (
              <Button href={`/courses/${next.sectionId}/${next.id}`}>
                Next Lesson <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <TestModal open={testOpen} onClose={() => setTestOpen(false)} lesson={lesson} />
    </div>
  );
}
