"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import type { CourseSection } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";

const UZ_TITLES: Record<string, string> = {
  "network-fundamentals": "Tarmoq Asoslari",
  "http-tls": "HTTP / HTTPS / TLS",
  "web-servers": "Web Serverlar",
  "server-infrastructure": "Server Infratuzilmasi",
  "software-architecture": "Dasturiy Arxitektura",
  "network-security": "Tarmoq Xavfsizligi",
  "pentesting": "Penetratsion Testlash",
};

export function LessonSidebar({
  section,
  currentLessonId,
}: {
  section: CourseSection;
  currentLessonId: string;
}) {
  const { isLessonComplete, isLessonUnlocked, loaded } = useProgress();
  const sectionTitle = UZ_TITLES[section.id] ?? section.title;

  return (
    <aside
      style={{
        background: "rgba(13,13,26,0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "16px",
        position: "sticky",
        top: "80px",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <p style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "2px" }}>
          Bo&apos;lim
        </p>
        <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "14px" }}>{sectionTitle}</h3>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {section.lessons.map((lesson, i) => {
          const done = loaded && isLessonComplete(lesson.id);
          const unlocked = !loaded || isLessonUnlocked(section.id, lesson.id);
          const active = lesson.id === currentLessonId;

          const item = (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "8px",
                padding: "7px 10px",
                fontSize: "12px",
                background: active ? "rgba(0,255,136,0.08)" : "transparent",
                border: active ? "1px solid rgba(0,255,136,0.25)" : "1px solid transparent",
                color: active ? "#00ff88" : unlocked ? "#94a3b8" : "#475569",
                cursor: unlocked ? "pointer" : "not-allowed",
                transition: "all 0.15s ease",
              }}
            >
              {done ? (
                <CheckCircle2 size={14} color="#00ff88" style={{ flexShrink: 0 }} />
              ) : !unlocked ? (
                <Lock size={14} style={{ flexShrink: 0 }} />
              ) : (
                <Circle size={14} style={{ flexShrink: 0 }} />
              )}
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#475569", width: "18px", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {lesson.title}
              </span>
            </div>
          );

          return unlocked ? (
            <Link key={lesson.id} href={`/courses/${section.id}/${lesson.id}`} style={{ textDecoration: "none" }}>
              {item}
            </Link>
          ) : (
            <div key={lesson.id}>{item}</div>
          );
        })}
      </nav>
    </aside>
  );
}
