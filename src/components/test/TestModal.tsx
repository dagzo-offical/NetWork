"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import type { Lesson, TestAttempt } from "@/lib/types";
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

  if (!open) return null;

  const dismissible = test.phase !== "validating";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={dismissible ? onClose : undefined}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          cursor: dismissible ? "pointer" : "default",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "rgba(10,10,20,0.98)",
          border: "1px solid rgba(0,255,136,0.25)",
          borderRadius: "18px",
          boxShadow: "0 0 60px rgba(0,255,136,0.1)",
          padding: "28px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#00ff88", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
              📝 Dars Testi
            </div>
            <h2 style={{ color: "#e2e8f0", fontSize: "18px", fontWeight: 700 }}>
              {lesson.title}
            </h2>
          </div>
          {dismissible && (
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "6px",
                cursor: "pointer",
                color: "#64748b",
                display: "flex",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Loading */}
        {test.phase === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: "12px", color: "#94a3b8" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid #00ff88",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span>Test savollari tayyorlanmoqda...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error */}
        {test.phase === "error" && (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <p style={{ color: "#ff0066", marginBottom: "16px" }}>{test.error}</p>
            <button
              onClick={test.retry}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Qayta Urinish
            </button>
          </div>
        )}

        {/* Cooldown */}
        {test.phase === "cooldown" && (
          <CooldownTimer seconds={test.cooldownSeconds} onComplete={test.retry} />
        )}

        {/* Answering */}
        {test.phase === "answering" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                background: "rgba(0,136,255,0.08)",
                border: "1px solid rgba(0,136,255,0.2)",
                borderRadius: "10px",
                padding: "14px 16px",
                fontSize: "13px",
                color: "#94a3b8",
                lineHeight: 1.6,
              }}
            >
              📌 {test.questions.length} ta savolga batafsil javob bering.
              O&apos;rtacha <strong style={{ color: "#0088ff" }}>{PASSING_SCORE}%</strong> ball olsangiz o&apos;tasiz.
              Yiqilsangiz <strong style={{ color: "#ff0066" }}>30 daqiqa</strong> cooldown bo&apos;ladi.
            </div>

            {test.questions.map((q, i) => (
              <TestQuestion
                key={q.id}
                question={q}
                index={i}
                value={test.answers[q.id] ?? ""}
                onChange={(v) => test.setAnswer(q.id, v)}
              />
            ))}

            <button
              disabled={!test.allAnswered}
              onClick={handleSubmit}
              style={{
                padding: "14px",
                borderRadius: "10px",
                background: test.allAnswered
                  ? "linear-gradient(135deg, #00ff88, #00cc66)"
                  : "rgba(255,255,255,0.05)",
                border: test.allAnswered ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: test.allAnswered ? "#000" : "#475569",
                fontWeight: 700,
                fontSize: "15px",
                cursor: test.allAnswered ? "pointer" : "not-allowed",
                boxShadow: test.allAnswered ? "0 0 20px rgba(0,255,136,0.25)" : "none",
              }}
            >
              🤖 AI Tekshiruviga Yuborish
            </button>
            {!test.allAnswered && (
              <p style={{ textAlign: "center", fontSize: "12px", color: "#64748b" }}>
                Barcha savollarga javob bering
              </p>
            )}
          </div>
        )}

        {/* Validating */}
        {test.phase === "validating" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", gap: "12px", color: "#94a3b8" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid #00ff88",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span style={{ fontWeight: 600 }}>AI javoblaringizni tekshirmoqda...</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Chuqurlik, aniqlik va terminologiya tekshirilmoqda
            </span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Result */}
        {test.phase === "result" && test.result && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TestResult result={test.result} />

            {test.result.passed ? (
              <button
                onClick={goNext}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #00ff88, #00cc66)",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 0 24px rgba(0,255,136,0.3)",
                }}
              >
                {next ? "Keyingi Darsga O'tish" : "Bo'limga Qaytish"}
                <ArrowRight size={18} />
              </button>
            ) : (
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "14px" }}>
                  Darsni qayta ko&apos;ring — 30 daqiqa cooldown tugagach qayta topshirishingiz mumkin.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={14} /> Yopish va Ko&apos;rish
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
