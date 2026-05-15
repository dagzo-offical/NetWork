"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getSection } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { FinalExam } from "@/components/test/FinalExam";
import { Button } from "@/components/ui/Button";

export default function ExamPage() {
  const params = useParams<{ sectionId: string }>();
  const section = getSection(params.sectionId);
  const { sectionProgress, loaded } = useProgress();

  if (!section) return notFound();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-40 text-slate-400">
        <Loader2 className="h-7 w-7 animate-spin text-neon-green" />
      </div>
    );
  }

  const prog = sectionProgress(section.id);
  const allComplete = prog.done === prog.total && prog.total > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <Link
        href={`/courses/${section.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-green mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> {section.title}
      </Link>

      {allComplete ? (
        <FinalExam section={section} />
      ) : (
        <div className="glass rounded-xl p-10 text-center max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-slate-100">
            Exam Locked
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            You must complete all {prog.total} lessons in{" "}
            <span className="text-neon-green">{section.title}</span> before
            taking the final exam. You have completed {prog.done}.
          </p>
          <Button variant="solid" className="mt-5" href={`/courses/${section.id}`}>
            Continue Lessons
          </Button>
        </div>
      )}
    </div>
  );
}
