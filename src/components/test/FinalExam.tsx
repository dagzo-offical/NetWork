"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Eye, ArrowRight } from "lucide-react";
import type { CourseSection, ExamAttempt, TestQuestion } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/ui/Timer";
import { Progress } from "@/components/ui/Progress";
import { Card } from "@/components/ui/Card";
import { TestQuestion as QuestionField } from "./TestQuestion";
import { TestResult } from "./TestResult";
import { useTimer } from "@/hooks/useTimer";
import { useProgress } from "@/hooks/useProgress";
import { getBank } from "@/lib/question-bank";
import { validateAnswers } from "@/lib/ai-validator";
import { shuffle } from "@/lib/utils";
import {
  EXAM_PASSING_SCORE,
  EXAM_TIME_LIMIT_MINUTES,
  QUESTIONS_PER_EXAM,
} from "@/lib/constants";
import type { ValidationResult } from "@/lib/types";

type Phase = "intro" | "active" | "grading" | "result";

/** Builds the exam question set by sampling across all lessons in the section. */
function buildExamQuestions(section: CourseSection): TestQuestion[] {
  const pool: string[] = [];
  for (const lesson of section.lessons) {
    const bank = getBank(lesson.id, lesson.title);
    for (const q of bank.questions) pool.push(q);
  }
  return shuffle(pool)
    .slice(0, QUESTIONS_PER_EXAM)
    .map((q, i) => ({ id: `exam-${section.id}-${i}`, question: q, type: "written" }));
}

export function FinalExam({ section }: { section: CourseSection }) {
  const router = useRouter();
  const { recordExam } = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions] = useState<TestQuestion[]>(() => buildExamQuestions(section));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [startedAt, setStartedAt] = useState(0);

  const timer = useTimer(
    EXAM_TIME_LIMIT_MINUTES * 60,
    () => {
      if (phase === "active") void submit();
    },
    false
  );

  const submit = useCallback(async () => {
    setPhase("grading");
    const items = questions.map((q) => ({
      question: q.question,
      answer: answers[q.id] ?? "",
    }));
    const res = await validateAnswers(items, section.title);
    // Exam uses a higher bar than lesson tests.
    const examResult: ValidationResult = {
      ...res,
      passed: res.score >= EXAM_PASSING_SCORE,
    };
    setResult(examResult);
    const attempt: ExamAttempt = {
      sectionId: section.id,
      score: examResult.score,
      passed: examResult.passed,
      timestamp: Date.now(),
      duration: Math.round((Date.now() - startedAt) / 1000),
    };
    recordExam(attempt);
    setPhase("result");
  }, [questions, answers, section.id, section.title, startedAt, recordExam]);

  // Anti-cheat: count tab switches while the exam is active.
  useEffect(() => {
    if (phase !== "active") return;
    const handler = () => {
      if (document.hidden) setTabSwitches((n) => n + 1);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [phase]);

  const answeredCount = useMemo(
    () => questions.filter((q) => (answers[q.id] ?? "").trim().length > 0).length,
    [questions, answers]
  );

  const start = () => {
    setStartedAt(Date.now());
    setPhase("active");
    timer.start();
  };

  if (phase === "intro") {
    return (
      <Card gradientBorder className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold gradient-text">
          Final Exam — {section.title}
        </h2>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          This exam has {QUESTIONS_PER_EXAM} written questions drawn from every
          lesson in the section. You have {EXAM_TIME_LIMIT_MINUTES} minutes and
          must score at least {EXAM_PASSING_SCORE}% to pass and earn your
          section badge.
        </p>
        <div className="mt-5 glass rounded-lg p-4 text-left text-sm text-slate-400">
          <p className="flex items-center gap-2 text-amber-300 font-medium mb-2">
            <AlertTriangle className="h-4 w-4" /> Exam rules
          </p>
          <ul className="flex flex-col gap-1 list-disc pl-5">
            <li>The timer cannot be paused once started.</li>
            <li>Switching tabs is detected and logged.</li>
            <li>Unanswered questions score zero.</li>
            <li>The exam auto-submits when time runs out.</li>
          </ul>
        </div>
        <Button variant="solid" size="lg" className="mt-6" onClick={start}>
          Begin Exam <ArrowRight className="h-5 w-5" />
        </Button>
      </Card>
    );
  }

  if (phase === "grading") {
    return (
      <div className="flex flex-col items-center py-20 gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-neon-green" />
        <span>Grading your exam — this assesses all {QUESTIONS_PER_EXAM} answers.</span>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <Card gradientBorder className="max-w-2xl mx-auto">
        <TestResult result={result} />
        {tabSwitches > 0 && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-amber-300">
            <Eye className="h-3.5 w-3.5" />
            Anti-cheat: {tabSwitches} tab switch{tabSwitches > 1 ? "es" : ""}{" "}
            recorded during this exam.
          </p>
        )}
        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="ghost" href={`/courses/${section.id}`}>
            Back to Section
          </Button>
          {result.passed && (
            <Button variant="solid" href="/certificate">
              View Certificate
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // active
  const q = questions[current];
  return (
    <div className="max-w-3xl mx-auto">
      <div className="sticky top-16 z-20 -mx-2 mb-5 glass rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-slate-300">
            Question{" "}
            <span className="text-neon-green font-semibold">{current + 1}</span>{" "}
            of {questions.length}
          </div>
          <Timer
            seconds={timer.remaining}
            label="time left"
            warning={timer.remaining <= 300}
          />
        </div>
        <Progress value={(answeredCount / questions.length) * 100} className="mt-3" />
        <p className="mt-1 text-xs text-slate-500">
          {answeredCount}/{questions.length} answered
        </p>
      </div>

      <motion.div
        key={q.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <QuestionField
          question={q}
          index={current}
          value={answers[q.id] ?? ""}
          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
        />
      </motion.div>

      <div className="mt-5 flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        >
          Previous
        </Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)}>Next Question</Button>
        ) : (
          <Button variant="solid" onClick={() => void submit()}>
            Submit Exam
          </Button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            onClick={() => setCurrent(i)}
            className={`h-8 w-8 rounded-md text-xs font-mono transition-colors ${
              i === current
                ? "bg-neon-green/20 border border-neon-green/50 text-neon-green"
                : (answers[qq.id] ?? "").trim()
                ? "bg-neon-blue/15 border border-neon-blue/40 text-neon-blue"
                : "bg-white/5 border border-white/10 text-slate-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
