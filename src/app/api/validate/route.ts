import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { scoreAnswer } from "@/lib/ai-validator";
import { getBank } from "@/lib/question-bank";
import type { ValidationResult } from "@/lib/types";

interface ValidateBody {
  question: string;
  answer: string;
  lessonTopic: string;
  lessonId?: string;
}

async function gradeWithGroq(
  apiKey: string,
  question: string,
  answer: string,
  lessonTopic: string
): Promise<ValidationResult> {
  const groq = new Groq({ apiKey });

  const prompt = `Siz tarmoq xavfsizligi bo'yicha mutaxassis o'qituvchisiz. Talaba javobini baholang.

Mavzu: ${lessonTopic}
Savol: ${question}
Talaba javobi: ${answer}

Javobni 0-100 ball bilan baholang. Quyidagi JSON formatida javob bering (boshqa hech narsa yozmang):
{
  "score": <0-100 oraliqda son>,
  "strengths": ["kuchli tomon 1", "kuchli tomon 2"],
  "weaknesses": ["zaif tomon 1", "zaif tomon 2"],
  "feedback": "umumiy sharh"
}

Baholash mezonlari:
- 90-100: Mavzuni chuqur va to'liq tushungan, texnik terminologiya to'g'ri ishlatilgan
- 70-89: Yaxshi tushungan, lekin ba'zi tafsilotlar etishmaydi
- 50-69: Asosiy tushuncha bor, lekin chuqurlik yetarli emas
- 0-49: Javob noto'g'ri yoki juda sirtaki

Uzbek tilida javob bering.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 500,
  });

  const text = completion.choices[0]?.message?.content ?? "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid Groq response format");

  const parsed = JSON.parse(jsonMatch[0]) as {
    score: number;
    strengths: string[];
    weaknesses: string[];
    feedback: string;
  };

  const score = Math.max(0, Math.min(100, Math.round(parsed.score)));
  return {
    score,
    passed: score >= 70,
    strengths: (parsed.strengths ?? []).slice(0, 4),
    weaknesses: (parsed.weaknesses ?? []).slice(0, 4),
    feedback: parsed.feedback ?? "",
  };
}

export async function POST(request: Request) {
  let body: ValidateBody;
  try {
    body = (await request.json()) as ValidateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { question, answer, lessonTopic, lessonId } = body;
  if (typeof answer !== "string") {
    return NextResponse.json({ error: "Missing answer" }, { status: 400 });
  }

  const apiKey = request.headers.get("x-api-key");
  const provider = request.headers.get("x-api-provider");

  if (provider === "groq" && apiKey) {
    try {
      const result = await gradeWithGroq(apiKey, question ?? "", answer, lessonTopic ?? "");
      return NextResponse.json(result);
    } catch {
      // Fall through to heuristic on Groq failure
    }
  }

  const bank = getBank(lessonId ?? "", lessonTopic ?? "this topic");
  const result = scoreAnswer(answer, bank.keywords);
  return NextResponse.json(result);
}
