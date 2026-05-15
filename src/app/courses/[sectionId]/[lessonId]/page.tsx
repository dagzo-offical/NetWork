"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, CheckCircle2, ClipboardCheck, Lock } from "lucide-react";
import { getSection, getLesson, getAdjacentLessons } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { LessonContent } from "@/components/course/LessonContent";
import { TestModal } from "@/components/test/TestModal";

const DIFFICULTY_LABELS: Record<string, string> = {
  Beginner: "Boshlang'ich",
  Intermediate: "O'rta",
  Advanced: "Ilg'or",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "#00ff88",
  Intermediate: "#0088ff",
  Advanced: "#ff0066",
};

const UZ_TITLES: Record<string, string> = {
  "network-fundamentals": "Tarmoq Asoslari",
  "http-tls": "HTTP, HTTPS, TLS va SSL",
  "web-servers": "Web Serverlar",
  "server-infrastructure": "Server Infratuzilmasi",
  "software-architecture": "Dasturiy Ta'minot Arxitekturasi",
  "network-security": "Tarmoq Xavfsizligi",
  "pentesting": "Penetratsion Testlash",
};

export default function LessonPage() {
  const params = useParams<{ sectionId: string; lessonId: string }>();
  const section = getSection(params.sectionId);
  const lesson = getLesson(params.sectionId, params.lessonId);
  const { isLessonComplete, loaded } = useProgress();
  const [testOpen, setTestOpen] = useState(false);

  if (!section || !lesson) {
    return (
      <div style={{ padding: "60px 24px", textAlign: "center", color: "#94a3b8" }}>
        Dars topilmadi.{" "}
        <Link href="/courses" style={{ color: "#00ff88" }}>Orqaga qaytish</Link>
      </div>
    );
  }

  const completed = loaded && isLessonComplete(lesson.id);
  const { prev, next } = getAdjacentLessons(section.id, lesson.id);
  const sectionTitle = UZ_TITLES[section.id] ?? section.title;
  const diffColor = DIFFICULTY_COLORS[lesson.difficulty] ?? "#00ff88";
  const diffLabel = DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty;

  return (
    <div style={{ minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Back */}
        <Link
          href={`/courses/${section.id}`}
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#94a3b8",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          <ArrowLeft size={16} /> {sectionTitle}
        </Link>

        {/* Lesson header */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            padding: "24px",
            marginBottom: "20px",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                background: `${diffColor}20`,
                border: `1px solid ${diffColor}40`,
                borderRadius: "12px",
                padding: "2px 10px",
                fontSize: "11px",
                color: diffColor,
              }}
            >
              {diffLabel}
            </span>
            <span style={{ color: "#64748b", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={12} /> {lesson.duration}
            </span>
            {completed && (
              <span
                style={{
                  background: "#00ff8820",
                  border: "1px solid #00ff8840",
                  borderRadius: "12px",
                  padding: "2px 10px",
                  fontSize: "11px",
                  color: "#00ff88",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <CheckCircle2 size={11} /> Tugatilgan
              </span>
            )}
          </div>
          <h1 style={{ color: "#e2e8f0", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.2 }}>
            {lesson.title}
          </h1>
        </div>

        {/* Lesson content */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "clamp(20px, 4vw, 40px)",
            marginBottom: "20px",
            backdropFilter: "blur(16px)",
          }}
        >
          <LessonContent lesson={lesson} />

          {/* Exam CTA */}
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "28px",
              background: "rgba(0,255,136,0.03)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <ClipboardCheck size={36} color="#00ff88" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>
              {completed ? "Dars Yakunlangan ✓" : "Bilimingizni Sinab Ko'ring"}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px", maxWidth: "500px", margin: "0 auto 20px" }}>
              {completed
                ? "Siz bu dars testidan o'tdingiz. Istalgan vaqt qayta topshirishingiz mumkin."
                : "3 ta AI tekshiriladigan yozma savol javob bering. 70% dan yuqori ball olsangiz dars ochiladi."}
            </p>
            <button
              onClick={() => setTestOpen(true)}
              style={{
                padding: "12px 28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00ff88, #00cc66)",
                color: "#000",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(0,255,136,0.3)",
              }}
            >
              {completed ? "📝 Qayta Topshirish" : "📝 Testni Boshlash"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {prev ? (
            <Link
              href={`/courses/${prev.sectionId}/${prev.id}`}
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
                fontSize: "13px",
              }}
            >
              <ArrowLeft size={15} /> Oldingi Dars
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            completed ? (
              <Link
                href={`/courses/${next.sectionId}/${next.id}`}
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #00ff88, #00cc66)",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Keyingi Dars <ArrowRight size={15} />
              </Link>
            ) : (
              <button
                disabled
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#475569",
                  fontSize: "13px",
                  cursor: "not-allowed",
                }}
              >
                <Lock size={13} /> Keyingi Dars (qulflangan)
              </button>
            )
          ) : (
            <span />
          )}
        </div>
      </div>

      <TestModal open={testOpen} onClose={() => setTestOpen(false)} lesson={lesson} />
    </div>
  );
}
