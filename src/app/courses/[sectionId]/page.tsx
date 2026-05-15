"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle, Lock, Clock, GraduationCap, ArrowLeft } from "lucide-react";
import { getSection } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";

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

const UZ_DESCRIPTIONS: Record<string, string> = {
  "network-fundamentals": "Tarmoqlar qanday ishlashini chuqur o'rganing — fizik ramkalardan mantiqiy manzillash, routing va transport qatlamigacha.",
  "http-tls": "Zamonaviy veb protokollarini o'zlashtirishning asosi — so'rovlar, headers, cookies va kriptografik handshake.",
  "web-servers": "Apache, NGINX, IIS, Caddy va Tomcat — arxitektura, konfiguratsiya va xavfsizlikni mustahkamlash.",
  "server-infrastructure": "Bare metal dan cloudgacha, firewall dan service mesh gacha — zamonaviy ilovalarni xosting va himoya qilish.",
  "software-architecture": "Tizimlar qanday scale, fail va evolve bo'lishini belgilaydigan arxitektura stillar.",
  "network-security": "Hujumlar va mudofaa — MITM, DDoS, IDS/IPS, SIEM va zamonaviy kiberoperatsiyalar.",
  "pentesting": "Professional pentestchi toolkiti — Wireshark, Burp Suite, Nmap, Metasploit va boshqalar.",
};

const SECTION_COLORS: Record<string, string> = {
  "network-fundamentals": "#00ff88",
  "http-tls": "#0088ff",
  "web-servers": "#8800ff",
  "server-infrastructure": "#00ff88",
  "software-architecture": "#0088ff",
  "network-security": "#ff0066",
  "pentesting": "#8800ff",
};

export default function SectionPage() {
  const params = useParams<{ sectionId: string }>();
  const section = getSection(params.sectionId);
  const { isLessonComplete, isLessonUnlocked, sectionProgress, loaded, isSectionExamPassed } = useProgress();

  if (!section) {
    return (
      <div style={{ padding: "60px 24px", textAlign: "center", color: "#94a3b8" }}>
        Bo&apos;lim topilmadi.{" "}
        <Link href="/courses" style={{ color: "#00ff88" }}>Orqaga</Link>
      </div>
    );
  }

  const color = SECTION_COLORS[section.id] ?? "#00ff88";
  const title = UZ_TITLES[section.id] ?? section.title;
  const desc = UZ_DESCRIPTIONS[section.id] ?? section.description;
  const prog = loaded
    ? sectionProgress(section.id)
    : { done: 0, total: section.lessons.length, percent: 0 };
  const allComplete = prog.done === prog.total && prog.total > 0;
  const examPassed = loaded && isSectionExamPassed(section.id);

  return (
    <div style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Back link */}
        <Link
          href="/courses"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#94a3b8",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={16} /> Barcha Kurslar
        </Link>

        {/* Section header card */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: `1px solid ${color}40`,
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "24px",
            backdropFilter: "blur(16px)",
            boxShadow: `0 0 30px ${color}15`,
          }}
        >
          <h1 style={{ color: "#e2e8f0", fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
            {title}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>
            {desc}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#cbd5e1",
              }}
            >
              📚 {section.lessons.length} ta dars
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Clock size={12} /> {section.totalDuration}
            </span>
            {examPassed && (
              <span
                style={{
                  background: "#00ff8820",
                  border: "1px solid #00ff8840",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  color: "#00ff88",
                }}
              >
                ✓ Bo'lim yakunlangan
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                {prog.done} / {prog.total} dars tugatildi
              </span>
              <span style={{ fontSize: "12px", color: color }}>
                {prog.percent}%
              </span>
            </div>
            <div
              style={{
                height: "6px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${prog.percent}%`,
                  background: `linear-gradient(90deg, ${color}, ${color}80)`,
                  boxShadow: `0 0 10px ${color}50`,
                  transition: "width 0.8s ease",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Lessons list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          {section.lessons.map((lesson, i) => {
            const done = loaded && isLessonComplete(lesson.id);
            const unlocked = !loaded || isLessonUnlocked(section.id, lesson.id);
            const diffColor = DIFFICULTY_COLORS[lesson.difficulty] ?? "#00ff88";
            const diffLabel = DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty;

            return (
              <Link
                key={lesson.id}
                href={unlocked ? `/courses/${section.id}/${lesson.id}` : "#"}
                style={{ textDecoration: "none", pointerEvents: unlocked ? "auto" : "none" }}
              >
                <div
                  style={{
                    background: "rgba(13,13,26,0.8)",
                    border: `1px solid ${done ? color + "40" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "10px",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    opacity: unlocked ? 1 : 0.5,
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(8px)",
                    cursor: unlocked ? "pointer" : "not-allowed",
                  }}
                  onMouseEnter={(e) => {
                    if (unlocked) {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${color}50`;
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(13,13,26,0.95)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (unlocked) {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${done ? color + "40" : "rgba(255,255,255,0.07)"}`;
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(13,13,26,0.8)";
                    }
                  }}
                >
                  {/* Status icon */}
                  <div style={{ flexShrink: 0 }}>
                    {done ? (
                      <CheckCircle2 size={22} color="#00ff88" />
                    ) : !unlocked ? (
                      <Lock size={22} color="#475569" />
                    ) : (
                      <Circle size={22} color="#475569" />
                    )}
                  </div>

                  {/* Number */}
                  <span style={{ color: "#475569", fontSize: "12px", fontFamily: "monospace", width: "20px", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title + meta */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                      {lesson.title}
                    </p>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span
                        style={{
                          background: `${diffColor}20`,
                          border: `1px solid ${diffColor}40`,
                          borderRadius: "12px",
                          padding: "1px 8px",
                          fontSize: "10px",
                          color: diffColor,
                        }}
                      >
                        {diffLabel}
                      </span>
                      <span style={{ color: "#64748b", fontSize: "11px", display: "flex", alignItems: "center", gap: "3px" }}>
                        <Clock size={11} /> {lesson.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Final exam card */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: `1px solid ${allComplete ? color + "50" : "rgba(255,255,255,0.07)"}`,
            borderRadius: "16px",
            padding: "28px",
            textAlign: "center",
            backdropFilter: "blur(16px)",
          }}
        >
          <GraduationCap size={36} color={allComplete ? color : "#475569"} style={{ margin: "0 auto 12px" }} />
          <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>
            Final Imtihon — {title}
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>
            {allComplete
              ? "Barcha darslar tugallandi. Final imtihonni topshiring va bo'limni yakunlang."
              : `Final imtihon uchun barcha ${section.lessons.length} ta darsni tugatishingiz kerak.`}
          </p>

          {allComplete ? (
            <Link
              href={`/exam/${section.id}`}
              style={{
                textDecoration: "none",
                display: "inline-block",
                padding: "12px 28px",
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${color}, ${color}99)`,
                color: color === "#ff0066" ? "#fff" : "#000",
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: `0 0 20px ${color}30`,
              }}
            >
              🎓 Final Imtihonni Boshlash
            </Link>
          ) : (
            <button
              disabled
              style={{
                padding: "12px 28px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#475569",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "not-allowed",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Lock size={14} /> Imtihon Qulflangan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
