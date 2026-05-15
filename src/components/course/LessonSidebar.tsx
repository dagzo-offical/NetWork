"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import type { CourseSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";

export function LessonSidebar({
  section,
  currentLessonId,
}: {
  section: CourseSection;
  currentLessonId: string;
}) {
  const { isLessonComplete, isLessonUnlocked, loaded } = useProgress();

  return (
    <aside className="glass rounded-xl p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Section
        </p>
        <h3 className="font-semibold text-slate-100">{section.title}</h3>
      </div>
      <nav className="flex flex-col gap-0.5">
        {section.lessons.map((lesson, i) => {
          const done = loaded && isLessonComplete(lesson.id);
          const unlocked = !loaded || isLessonUnlocked(section.id, lesson.id);
          const active = lesson.id === currentLessonId;

          const content = (
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-neon-green/10 border border-neon-green/30 text-neon-green"
                  : unlocked
                  ? "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                  : "text-slate-600 cursor-not-allowed"
              )}
            >
              {done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-neon-green" />
              ) : !unlocked ? (
                <Lock className="h-4 w-4 shrink-0" />
              ) : (
                <Circle className="h-4 w-4 shrink-0" />
              )}
              <span className="text-xs text-slate-600 font-mono w-5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{lesson.title}</span>
            </div>
          );

          return unlocked ? (
            <Link key={lesson.id} href={`/courses/${section.id}/${lesson.id}`}>
              {content}
            </Link>
          ) : (
            <div key={lesson.id}>{content}</div>
          );
        })}
      </nav>
    </aside>
  );
}
