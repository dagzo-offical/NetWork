"use client";

import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, RotateCcw } from "lucide-react";
import type { Lesson, TestAttempt } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useTest } from "@/hooks/useTest";
import { useProgress } from "@/hooks/useProgress";
import { getAdjacentLessons } from "@/lib/course-data";
import { TestQuestion } from "./TestQuestion";
import { TestResult } from "./TestResult";
import { CooldownTimer } from "./CooldownTimer";
import { PASSING_SCORE } from "@/lib/constants";

export function TestModal({
  open,
  onClose,
  lesson,
}: {
  open: boolean;
  onClose: () => void;
  lesson: Lesson;
}) {
  const router = useRouter();
  const { progress, completeLesson } = useProgress();
  const previousQuestions = (progress.testResults[lesson.id] ?? []).flatMap(
    (a) => a.questions.map((q) => q.question)
  );

  const test = useTest(lesson.id, lesson.title, previousQuestions);
  const { next } = getAdjacentLessons(lesson.sectionId, lesson.id);

  const handleSubmit = async () => {
    const res = await test.submit();
    if (res) {
      const attempt: TestAttempt = {
        lessonId: lesson.id,
        questions: test.questions,
        answers: test.answers,
        score: res.score,
        passed: res.passed,
        timestamp: Date.now(),
      };
      completeLesson(lesson.id, attempt);
    }
  };

  const goNext = () => {
    onClose();
    if (next) router.push(`/courses/${next.sectionId}/${next.id}`);
    else router.push(`/courses/${lesson.sectionId}`);
  };

  const dismissible = test.phase !== "validating";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Lesson Exam — ${lesson.title}`}
      dismissible={dismissible}
    >
      {test.phase === "loading" && (
        <div className="flex flex-col items-center py-12 gap-3 text-slate-400">
          <Loader2 className="h-7 w-7 animate-spin text-neon-green" />
          Generating your exam questions...
        </div>
      )}

      {test.phase === "error" && (
        <div className="py-10 text-center">
          <p className="text-neon-red mb-4">{test.error}</p>
          <Button onClick={test.retry}>Try Again</Button>
        </div>
      )}

      {test.phase === "cooldown" && (
        <CooldownTimer seconds={test.cooldownSeconds} onComplete={test.retry} />
      )}

      {test.phase === "answering" && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-slate-400">
            Answer all {test.questions.length} questions in detail. You need an
            average of {PASSING_SCORE}% to pass. Failing triggers a 30-minute
            cooldown.
          </p>
          {test.questions.map((q, i) => (
            <TestQuestion
              key={q.id}
              question={q}
              index={i}
              value={test.answers[q.id] ?? ""}
              onChange={(v) => test.setAnswer(q.id, v)}
            />
          ))}
          <Button
            variant="solid"
            size="lg"
            disabled={!test.allAnswered}
            onClick={handleSubmit}
          >
            Submit for AI Grading
          </Button>
          {!test.allAnswered && (
            <p className="text-center text-xs text-slate-600">
              Answer every question to submit.
            </p>
          )}
        </div>
      )}

      {test.phase === "validating" && (
        <div className="flex flex-col items-center py-12 gap-3 text-slate-400">
          <Loader2 className="h-7 w-7 animate-spin text-neon-green" />
          <span>AI is grading your answers...</span>
          <span className="text-xs text-slate-600">
            Checking depth, accuracy and terminology.
          </span>
        </div>
      )}

      {test.phase === "result" && test.result && (
        <div className="flex flex-col gap-5">
          <TestResult result={test.result} />
          {test.result.passed ? (
            <Button variant="solid" size="lg" onClick={goNext}>
              {next ? "Next Lesson" : "Back to Section"}{" "}
              <ArrowRight className="h-5 w-5" />
            </Button>
          ) : (
            <div className="text-center text-sm text-slate-400">
              <p className="mb-3">
                Review the lesson — the exam unlocks again after a 30-minute
                cooldown.
              </p>
              <Button variant="ghost" onClick={onClose}>
                <RotateCcw className="h-4 w-4" /> Close & Review
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
