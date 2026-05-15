import { NextResponse } from "next/server";
import type { TestQuestion } from "@/lib/types";
import { getBank } from "@/lib/question-bank";

interface GenerateBody {
  lessonId: string;
  lessonTopic: string;
  previousQuestions?: string[];
  count?: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generates `count` written questions for a lesson, preferring questions
 * the learner has not seen before so retries differ from the first attempt.
 */
export async function POST(request: Request) {
  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { lessonId, lessonTopic, previousQuestions = [], count = 3 } = body;
  const bank = getBank(lessonId ?? "", lessonTopic ?? "this topic");

  const seen = new Set(previousQuestions);
  const unseen = bank.questions.filter((q) => !seen.has(q));
  const pool = unseen.length >= count ? unseen : bank.questions;

  const selected = shuffle(pool).slice(0, count);
  const questions: TestQuestion[] = selected.map((q, i) => ({
    id: `${lessonId}-q${i + 1}-${Date.now()}`,
    question: q,
    type: "written",
  }));

  return NextResponse.json(questions);
}
