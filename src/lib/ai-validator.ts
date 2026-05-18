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
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const key = localStorage.getItem("netsec_ai_api_key") ?? "";
    const provider = localStorage.getItem("netsec_ai_provider") ?? "";
    if (key && provider) {
      headers["x-api-key"] = key;
      headers["x-api-provider"] = provider;
    }
  }
  const response = await fetch("/api/validate", {
    method: "POST",
    headers,
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
    return "Outstanding work — your answers show deep, accurate understanding of the material.";
  if (score >= 70)
    return "Solid pass. You have a working grasp of the topic; tighten the weaker areas to reach mastery.";
  if (score >= 50)
    return "Close, but not yet passing. Re-read the lesson and address the weaknesses below.";
  return "This needs more work. Review the lesson carefully and focus on the technical specifics.";
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
    weaknesses.push("Answer is too short to demonstrate understanding.");
  } else if (wordCount < 25) {
    lengthScore = 14 + (wordCount - 8) * 0.7;
    weaknesses.push("Answer could be expanded with more detail and examples.");
  } else if (wordCount <= 140) {
    lengthScore = 30;
    strengths.push("Answer has a thorough, well-developed length.");
  } else {
    lengthScore = 26;
    strengths.push("Detailed answer, though concision would help.");
  }

  // 2. Keyword coverage component (0-45)
  const matched = keywords.filter((k) => lower.includes(k.toLowerCase()));
  const coverage = keywords.length ? matched.length / keywords.length : 0;
  const keywordScore = Math.min(45, coverage * 70);
  if (matched.length >= Math.max(2, keywords.length * 0.35)) {
    strengths.push(
      `Uses relevant technical terminology (${matched.slice(0, 4).join(", ")}).`
    );
  } else {
    weaknesses.push(
      "Missing key technical concepts — be specific and use correct terminology."
    );
  }

  // 3. Structure component (0-15)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 3);
  let structureScore: number;
  if (sentences.length >= 3) {
    structureScore = 15;
    strengths.push("Well-structured explanation across multiple points.");
  } else if (sentences.length === 2) {
    structureScore = 9;
  } else {
    structureScore = 4;
    weaknesses.push("Break the answer into clearer, separate points.");
  }

  // 4. Specificity component (0-10) — numbers, protocol names, mechanisms
  const hasSpecifics = /\b(tcp|udp|ip|tls|http|dns|port|\d{1,5})\b/i.test(text);
  const specificityScore = hasSpecifics ? 10 : 3;
  if (!hasSpecifics) {
    weaknesses.push("Add concrete specifics — protocols, ports, or mechanisms.");
  }

  // 5. Low-effort / gibberish penalty
  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const diversity = wordCount ? uniqueWords / wordCount : 0;
  let penalty = 0;
  if (wordCount > 6 && diversity < 0.4) {
    penalty = 25;
    weaknesses.push("Answer appears repetitive or low-effort.");
  }

  let score = Math.round(
    lengthScore + keywordScore + structureScore + specificityScore - penalty
  );
  score = Math.max(0, Math.min(100, score));

  if (strengths.length === 0) strengths.push("Attempted the question.");
  if (weaknesses.length === 0) weaknesses.push("Minor: aim for even greater precision.");

  return {
    score,
    passed: score >= 70,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    feedback: aggregateFeedback(score),
  };
}
