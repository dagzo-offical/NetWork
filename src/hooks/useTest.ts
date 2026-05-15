"use client";

import { useCallback, useEffect, useState } from "react";
import type { TestQuestion, ValidationResult } from "@/lib/types";
import { generateQuestions, validateAnswers } from "@/lib/ai-validator";
import { COOLDOWN_MINUTES, COOLDOWN_STORAGE_KEY } from "@/lib/constants";

type Phase = "loading" | "answering" | "validating" | "result" | "cooldown" | "error";

interface CooldownMap {
  [lessonId: string]: number; // unix ms when cooldown ends
}

function readCooldowns(): CooldownMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(COOLDOWN_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeCooldowns(map: CooldownMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOLDOWN_STORAGE_KEY, JSON.stringify(map));
}

export function getCooldownRemaining(lessonId: string): number {
  const end = readCooldowns()[lessonId];
  if (!end) return 0;
  return Math.max(0, Math.round((end - Date.now()) / 1000));
}

/**
 * Manages the full lesson-test lifecycle: question generation, answering,
 * AI validation, results, and the 30-minute cooldown after a failure.
 */
export function useTest(lessonId: string, lessonTopic: string, previousQuestions: string[]) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string>("");

  const loadQuestions = useCallback(async () => {
    const remaining = getCooldownRemaining(lessonId);
    if (remaining > 0) {
      setPhase("cooldown");
      return;
    }
    setPhase("loading");
    try {
      const qs = await generateQuestions(lessonId, lessonTopic, previousQuestions);
      setQuestions(qs);
      setAnswers({});
      setResult(null);
      setPhase("answering");
    } catch {
      setError("Could not generate questions. Please try again.");
      setPhase("error");
    }
  }, [lessonId, lessonTopic, previousQuestions]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((a) => ({ ...a, [questionId]: value }));
  }, []);

  const submit = useCallback(async (): Promise<ValidationResult | null> => {
    setPhase("validating");
    try {
      const items = questions.map((q) => ({
        question: q.question,
        answer: answers[q.id] ?? "",
      }));
      const res = await validateAnswers(items, lessonTopic, lessonId);
      setResult(res);
      if (!res.passed) {
        const map = readCooldowns();
        map[lessonId] = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
        writeCooldowns(map);
      }
      setPhase("result");
      return res;
    } catch {
      setError("Validation failed. Please try again.");
      setPhase("error");
      return null;
    }
  }, [questions, answers, lessonTopic, lessonId]);

  const clearCooldownAndRetry = useCallback(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const allAnswered = questions.every(
    (q) => (answers[q.id] ?? "").trim().length > 0
  );

  return {
    phase,
    questions,
    answers,
    result,
    error,
    setAnswer,
    submit,
    allAnswered,
    retry: clearCooldownAndRetry,
    cooldownSeconds: getCooldownRemaining(lessonId),
  };
}
