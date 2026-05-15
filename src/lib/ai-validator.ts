import type { TestQuestion, ValidationResult } from "./types";

export type { ValidationResult } from "./types";

/**
 * Client-side helpers that call the validation and question-generation
 * API routes. In production these routes could be wired to a real LLM;
 * the default implementation uses an intelligent heuristic scorer.
 */

export async function validateAnswer(
  question: string,
  answer: string,
  lessonTopic: string,
  lessonId?: string
): Promise<ValidationResult> {
  const response = await fetch("/api/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer, lessonTopic, lessonId }),
  });
  if (!response.ok) throw new Error("Validation request failed");
  return response.json();
}

export async function validateAnswers(
  items: { question: string; answer: string }[],
  lessonTopic: string,
  lessonId?: string
): Promise<ValidationResult> {
  const results = await Promise.all(
    items.map((it) => validateAnswer(it.question, it.answer, lessonTopic, lessonId))
  );
  const score = Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / Math.max(results.length, 1)
  );
  const strengths = Array.from(new Set(results.flatMap((r) => r.strengths))).slice(0, 4);
  const weaknesses = Array.from(new Set(results.flatMap((r) => r.weaknesses))).slice(0, 4);
  return {
    score,
    passed: score >= 70,
    strengths,
    weaknesses,
    feedback: aggregateFeedback(score),
  };
}

function aggregateFeedback(score: number): string {
  if (score >= 90)
    return "Ajoyib natija — javoblaringiz mavzuni chuqur va aniq tushunganingizni ko'rsatadi.";
  if (score >= 70)
    return "Yaxshi natija. Mavzuni yaxshi tushunyapsiz; ustunlikka erishish uchun zaif tomonlarni mustahkamlang.";
  if (score >= 50)
    return "Yaqin, lekin hali o'tmadingiz. Darsni qayta o'qing va quyidagi zaif tomonlarni bartaraf eting.";
  return "Bu ko'proq ish talab qiladi. Darsni diqqat bilan ko'rib chiqing va texnik tafsilotlarga e'tibor qarating.";
}

export async function generateQuestions(
  lessonId: string,
  lessonTopic: string,
  previousQuestions: string[],
  count = 3
): Promise<TestQuestion[]> {
  const response = await fetch("/api/generate-questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId, lessonTopic, previousQuestions, count }),
  });
  if (!response.ok) throw new Error("Question generation failed");
  return response.json();
}

/**
 * Pure heuristic scorer — also used directly by the API route so the
 * logic lives in one place. Scores an answer 0-100 based on length,
 * keyword coverage, sentence structure and topic relevance.
 */
export function scoreAnswer(
  answer: string,
  keywords: string[]
): ValidationResult {
  const text = answer.trim();
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // 1. Length component (0-30)
  let lengthScore: number;
  if (wordCount < 8) {
    lengthScore = wordCount * 1.5;
    weaknesses.push("Javob tushunishni ko'rsatish uchun juda qisqa.");
  } else if (wordCount < 25) {
    lengthScore = 14 + (wordCount - 8) * 0.7;
    weaknesses.push("Javobni ko'proq tafsilot va misollar bilan kengaytirish mumkin.");
  } else if (wordCount <= 140) {
    lengthScore = 30;
    strengths.push("Javob to'liq va yaxshi rivojlangan uzunlikka ega.");
  } else {
    lengthScore = 26;
    strengths.push("Batafsil javob, ammo qisqaroq bo'lsa yaxshiroq bo'lardi.");
  }

  // 2. Keyword coverage component (0-45)
  const matched = keywords.filter((k) => lower.includes(k.toLowerCase()));
  const coverage = keywords.length ? matched.length / keywords.length : 0;
  const keywordScore = Math.min(45, coverage * 70);
  if (matched.length >= Math.max(2, keywords.length * 0.35)) {
    strengths.push(
      `Tegishli texnik terminologiyadan foydalanilgan (${matched.slice(0, 4).join(", ")}).`
    );
  } else {
    weaknesses.push(
      "Asosiy texnik tushunchalar etishmayapti — aniqroq bo'ling va to'g'ri terminologiya ishlating."
    );
  }

  // 3. Structure component (0-15)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 3);
  let structureScore: number;
  if (sentences.length >= 3) {
    structureScore = 15;
    strengths.push("Bir necha nuqta bo'ylab yaxshi tuzilgan tushuntirish.");
  } else if (sentences.length === 2) {
    structureScore = 9;
  } else {
    structureScore = 4;
    weaknesses.push("Javobni aniqroq, alohida nuqtalarga bo'ling.");
  }

  // 4. Specificity component (0-10) — numbers, protocol names, mechanisms
  const hasSpecifics = /\b(tcp|udp|ip|tls|http|dns|port|\d{1,5})\b/i.test(text);
  const specificityScore = hasSpecifics ? 10 : 3;
  if (!hasSpecifics) {
    weaknesses.push("Aniq tafsilotlar qo'shing — protokollar, portlar yoki mexanizmlar.");
  }

  // 5. Low-effort / gibberish penalty
  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const diversity = wordCount ? uniqueWords / wordCount : 0;
  let penalty = 0;
  if (wordCount > 6 && diversity < 0.4) {
    penalty = 25;
    weaknesses.push("Javob takroriy yoki kam harakat sarflangan ko'rinadi.");
  }

  let score = Math.round(
    lengthScore + keywordScore + structureScore + specificityScore - penalty
  );
  score = Math.max(0, Math.min(100, score));

  if (strengths.length === 0) strengths.push("Savolga urinildi.");
  if (weaknesses.length === 0) weaknesses.push("Kichik: yanada katta aniqlikka intiling.");

  return {
    score,
    passed: score >= 70,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    feedback: aggregateFeedback(score),
  };
}
