import { NextResponse } from "next/server";
import { scoreAnswer } from "@/lib/ai-validator";
import { getBank } from "@/lib/question-bank";

interface ValidateBody {
  question: string;
  answer: string;
  lessonTopic: string;
  lessonId?: string;
}

/**
 * Validates a written answer. Uses the per-topic keyword bank to drive an
 * intelligent heuristic score. Swap `scoreAnswer` for a real LLM call here
 * to upgrade to model-based grading without changing any client code.
 */
export async function POST(request: Request) {
  let body: ValidateBody;
  try {
    body = (await request.json()) as ValidateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { answer, lessonTopic, lessonId } = body;
  if (typeof answer !== "string") {
    return NextResponse.json({ error: "Missing answer" }, { status: 400 });
  }

  const bank = getBank(lessonId ?? "", lessonTopic ?? "this topic");
  const result = scoreAnswer(answer, bank.keywords);

  return NextResponse.json(result);
}
