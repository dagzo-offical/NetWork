"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Eye, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { CourseSection, ExamAttempt, TestQuestion } from "@/lib/types";
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

const UZ_TITLES: Record<string, string> = {
  "network-fundamentals": "Tarmoq Asoslari",
  "http-tls": "HTTP, HTTPS, TLS va SSL",
  "web-servers": "Web Serverlar",
  "server-infrastructure": "Server Infratuzilmasi",
  "software-architecture": "Dasturiy Arxitektura",
  "network-security": "Tarmoq Xavfsizligi",
  "pentesting": "Penetratsion Testlash",
};

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

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function FinalExam({ section }: { section: CourseSection }) {
  const { recordExam } = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions] = useState<TestQuestion[]>(() => buildExamQuestions(section));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const phaseRef = useRef<Phase>("intro");
  phaseRef.current = phase;

  const sectionTitle = UZ_TITLES[section.id] ?? section.title;

  const submit = useCallback(async () => {
    setPhase("grading");
    const items = questions.map((q) => ({
      question: q.question,
      answer: answers[q.id] ?? "",
    }));
    const res = await validateAnswers(items, section.title);
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

  const timer = useTimer(
    EXAM_TIME_LIMIT_MINUTES * 60,
    () => { if (phaseRef.current === "active") void submit(); },
    false
  );

  useEffect(() => {
    if (phase !== "active") return;
    const handler = () => { if (document.hidden) setTabSwitches((n) => n + 1); };
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
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          background: "rgba(13,13,26,0.9)",
          border: "1px solid rgba(0,255,136,0.25)",
          borderRadius: "18px",
          padding: "40px 32px",
          textAlign: "center",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 40px rgba(0,255,136,0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #00ff88, #0088ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "12px",
          }}
        >
          Final Imtihon — {sectionTitle}
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
          Bu imtihon bo&apos;limdagi barcha darslardan olingan{" "}
          <strong style={{ color: "#e2e8f0" }}>{QUESTIONS_PER_EXAM} ta</strong> yozma savol.
          Sizda <strong style={{ color: "#e2e8f0" }}>{EXAM_TIME_LIMIT_MINUTES} daqiqa</strong> vaqt
          va kamida <strong style={{ color: "#00ff88" }}>{EXAM_PASSING_SCORE}%</strong> ball
          to&apos;plashingiz kerak.
        </p>

        <div
          style={{
            background: "rgba(245,158,11,0.07)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "12px",
            padding: "16px 20px",
            textAlign: "left",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f59e0b",
              fontWeight: 600,
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            <AlertTriangle size={16} /> Imtihon qoidalari
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "16px", fontSize: "13px", color: "#94a3b8" }}>
            <li>Boshlangandan keyin taymer to&apos;xtatib bo&apos;lmaydi.</li>
            <li>Tab almashtirish aniqlanadi va qayd etiladi.</li>
            <li>Javob berilmagan savollar nol ball oladi.</li>
            <li>Vaqt tugaganda imtihon avtomatik topshiriladi.</li>
          </ul>
        </div>

        <button
          onClick={start}
          style={{
            padding: "14px 32px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #00ff88, #00cc66)",
            color: "#000",
            fontWeight: 700,
            fontSize: "15px",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 0 24px rgba(0,255,136,0.3)",
          }}
        >
          Imtihonni Boshlash <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (phase === "grading") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0", gap: "14px", color: "#94a3b8" }}>
        <Loader2 size={36} color="#00ff88" style={{ animation: "spin 1s linear infinite" }} />
        <span style={{ fontWeight: 600, fontSize: "16px" }}>Imtihon tekshirilmoqda...</span>
        <span style={{ fontSize: "13px", color: "#64748b" }}>
          Barcha {QUESTIONS_PER_EXAM} ta javob baholanmoqda
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          background: "rgba(13,13,26,0.9)",
          border: "1px solid rgba(0,255,136,0.25)",
          borderRadius: "18px",
          padding: "32px",
          backdropFilter: "blur(16px)",
        }}
      >
        <TestResult result={result} />

        {tabSwitches > 0 && (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#f59e0b",
              marginTop: "16px",
            }}
          >
            <Eye size={14} />
            Anti-cheat: ushbu imtihon davomida {tabSwitches} ta tab almashtirish qayd etildi.
          </p>
        )}

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
          <a
            href={`/courses/${section.id}`}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#94a3b8",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Bo&apos;limga Qaytish
          </a>
          {result.passed && (
            <a
              href="/certificate"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00ff88, #00cc66)",
                color: "#000",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              🏆 Sertifikatni Ko&apos;rish
            </a>
          )}
        </div>
      </div>
    );
  }

  // active phase
  const q = questions[current];
  const isWarning = timer.remaining <= 300;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Sticky header */}
      <div
        style={{
          position: "sticky",
          top: "72px",
          zIndex: 20,
          background: "rgba(10,10,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "14px 18px",
          marginBottom: "20px",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>
            Savol{" "}
            <span style={{ color: "#00ff88", fontWeight: 700 }}>{current + 1}</span>
            {" "}/ {questions.length}
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              fontWeight: 700,
              color: isWarning ? "#ff0066" : "#00ff88",
              background: isWarning ? "rgba(255,0,102,0.08)" : "rgba(0,255,136,0.08)",
              border: `1px solid ${isWarning ? "rgba(255,0,102,0.3)" : "rgba(0,255,136,0.3)"}`,
              borderRadius: "8px",
              padding: "4px 12px",
            }}
          >
            ⏱ {formatTime(timer.remaining)}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${(answeredCount / questions.length) * 100}%`,
              background: "linear-gradient(90deg, #00ff88, #0088ff)",
              borderRadius: "2px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
          {answeredCount}/{questions.length} ta savol javoblandi
        </p>
      </div>

      {/* Question */}
      <QuestionField
        question={q}
        index={current}
        value={answers[q.id] ?? ""}
        onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
      />

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gap: "12px" }}>
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: current === 0 ? "#475569" : "#94a3b8",
            fontSize: "13px",
            cursor: current === 0 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft size={16} /> Oldingi
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "8px",
              background: "rgba(0,136,255,0.12)",
              border: "1px solid rgba(0,136,255,0.3)",
              color: "#0088ff",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Keyingi <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => void submit()}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #00ff88, #00cc66)",
              border: "none",
              color: "#000",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0,255,136,0.3)",
            }}
          >
            ✅ Imtihonni Topshirish
          </button>
        )}
      </div>

      {/* Question grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "24px" }}>
        {questions.map((qq, i) => {
          const answered = (answers[qq.id] ?? "").trim().length > 0;
          const isCurrent = i === current;
          return (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                fontSize: "11px",
                fontFamily: "monospace",
                cursor: "pointer",
                border: isCurrent
                  ? "1px solid rgba(0,255,136,0.5)"
                  : answered
                  ? "1px solid rgba(0,136,255,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: isCurrent
                  ? "rgba(0,255,136,0.15)"
                  : answered
                  ? "rgba(0,136,255,0.1)"
                  : "rgba(255,255,255,0.04)",
                color: isCurrent ? "#00ff88" : answered ? "#0088ff" : "#475569",
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
