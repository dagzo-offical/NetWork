"use client";

import Link from "next/link";
import { Lock, CheckCircle2, ArrowRight, Clock, BookOpen } from "lucide-react";
import { COURSE_SECTIONS } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";

const SECTION_ICONS: Record<string, string> = {
  "network-fundamentals": "🌐",
  "http-tls": "🔒",
  "web-servers": "🖥️",
  "server-infrastructure": "☁️",
  "software-architecture": "🏗️",
  "network-security": "🛡️",
  "pentesting": "⚔️",
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
  "network-fundamentals":
    "Tarmoqlar qanday ishlashini chuqur o'rganing — fizik ramkalardan mantiqiy manzillash, routing va transport qatlamigacha.",
  "http-tls":
    "Zamonaviy veb protokollarini o'zlashtirishning asosi — so'rovlar, headers, cookies va kriptografik handshake.",
  "web-servers":
    "Apache, NGINX, IIS, Caddy va Tomcat — arxitektura, konfiguratsiya va xavfsizlikni mustahkamlash.",
  "server-infrastructure":
    "Bare metal dan cloudgacha, firewall dan service mesh gacha — zamonaviy ilovalarni xosting va himoya qilish.",
  "software-architecture":
    "Tizimlar qanday scale, fail va evolve bo'lishini belgilaydigan arxitektura stillar.",
  "network-security":
    "Hujumlar va mudofaa — MITM, DDoS, IDS/IPS, SIEM va zamonaviy kiberoperatsiyalar.",
  "pentesting":
    "Professional pentestchi toolkiti — Wireshark, Burp Suite, Nmap, Metasploit va boshqalar.",
};

export default function CoursesPage() {
  const { sectionProgress, isSectionUnlocked, isSectionExamPassed, loaded } =
    useProgress();

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #00ff88, #0088ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "12px",
            }}
          >
            Kurs Dasturi
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px" }}>
            7 ta bo&apos;lim ketma-ket o&apos;tiladi. Har bir bo&apos;limdagi barcha darslarni tugatib,
            final imtihondan o&apos;ting — keyingi bo&apos;lim ochiladi.
          </p>
        </div>

        {/* Sections Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {COURSE_SECTIONS.map((section, i) => {
            const prog = loaded
              ? sectionProgress(section.id)
              : { done: 0, total: section.lessons.length, percent: 0 };
            const unlocked = !loaded || isSectionUnlocked(section.id);
            const mastered = loaded && isSectionExamPassed(section.id);
            const color = SECTION_COLORS[section.id] ?? "#00ff88";
            const icon = SECTION_ICONS[section.id] ?? "📚";
            const title = UZ_TITLES[section.id] ?? section.title;
            const desc = UZ_DESCRIPTIONS[section.id] ?? section.description;

            return (
              <Link
                key={section.id}
                href={unlocked ? `/courses/${section.id}` : "#"}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "rgba(13, 13, 26, 0.85)",
                    border: `1px solid ${mastered ? color : unlocked ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
                    borderRadius: "16px",
                    padding: "24px",
                    height: "100%",
                    cursor: unlocked ? "pointer" : "not-allowed",
                    opacity: unlocked ? 1 : 0.6,
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(16px)",
                    boxShadow: mastered ? `0 0 20px ${color}30` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (unlocked) {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${color}80`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${color}20`;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (unlocked) {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${mastered ? color : "rgba(255,255,255,0.1)"}`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = mastered ? `0 0 20px ${color}30` : "none";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "12px",
                        background: `${color}20`,
                        border: `1px solid ${color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      {!unlocked ? (
                        <span style={{ color: "#64748b", fontSize: "20px" }}>🔒</span>
                      ) : mastered ? (
                        <CheckCircle2 size={20} color="#00ff88" />
                      ) : (
                        <ArrowRight size={20} color="#64748b" />
                      )}
                    </div>
                  </div>

                  {/* Section number + title */}
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ color: "#64748b", fontSize: "11px", fontFamily: "monospace", marginRight: "8px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "16px" }}>
                      {title}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6", marginBottom: "16px", minHeight: "60px" }}>
                    {desc}
                  </p>

                  {/* Stats row */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "20px",
                        padding: "2px 10px",
                        fontSize: "11px",
                        color: "#cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <BookOpen size={11} /> {section.lessons.length} ta dars
                    </span>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "20px",
                        padding: "2px 10px",
                        fontSize: "11px",
                        color: "#cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={11} /> {section.totalDuration}
                    </span>
                    {mastered && (
                      <span
                        style={{
                          background: "#00ff8820",
                          border: "1px solid #00ff8840",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          fontSize: "11px",
                          color: "#00ff88",
                        }}
                      >
                        ✓ Yakunlangan
                      </span>
                    )}
                    {!unlocked && (
                      <span
                        style={{
                          background: "#ff006620",
                          border: "1px solid #ff006640",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          fontSize: "11px",
                          color: "#ff0066",
                        }}
                      >
                        🔒 Qulflangan
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div
                      style={{
                        height: "4px",
                        background: "rgba(255,255,255,0.07)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${prog.percent}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                          borderRadius: "2px",
                          boxShadow: `0 0 8px ${color}60`,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                    <p style={{ marginTop: "6px", fontSize: "11px", color: "#64748b" }}>
                      {prog.done} / {prog.total} dars tugatildi
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
