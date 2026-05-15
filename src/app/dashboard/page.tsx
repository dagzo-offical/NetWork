"use client";

import { RotateCcw, Zap, BookOpen, Flame, Trophy, Target } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { COURSE_SECTIONS } from "@/lib/course-data";
import { levelFromXp } from "@/lib/utils";

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
  "http-tls": "HTTP / HTTPS / TLS",
  "web-servers": "Web Serverlar",
  "server-infrastructure": "Server Infratuzilmasi",
  "software-architecture": "Dasturiy Arxitektura",
  "network-security": "Tarmoq Xavfsizligi",
  "pentesting": "Penetratsion Testlash",
};

export default function DashboardPage() {
  const { progress, loaded, resetProgress, sectionProgress } = useProgress();

  if (!loaded) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          color: "#64748b",
          fontSize: "16px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            border: "2px solid #00ff88",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginRight: "12px",
          }}
        />
        Yuklanmoqda...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const { level, current, needed } = levelFromXp(progress.xp);
  const xpPercent = Math.round((current / Math.max(needed, 1)) * 100);
  const totalLessons = COURSE_SECTIONS.reduce((n, s) => n + s.lessons.length, 0);

  return (
    <div style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                color: "#e2e8f0",
                marginBottom: "6px",
              }}
            >
              Xush kelibsiz,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00ff88, #0088ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Operator
              </span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              {progress.completedLessons.length === 0
                ? "Birinchi darsni boshlang va progressingizni kuzating."
                : `Siz ${progress.streak} kunlik seriyada davom etyapsiz. Davom eting!`}
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Barcha progressni o'chirishni xohlaysizmi? Bu qaytarib bo'lmaydi."))
                resetProgress();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} /> Progressni Tiklash
          </button>
        </div>

        {/* XP / Level bar */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "14px",
            padding: "20px 24px",
            marginBottom: "20px",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>
              <Zap size={16} color="#00ff88" /> Daraja {level}
            </span>
            <span style={{ color: "#64748b", fontSize: "12px" }}>
              {current} / {needed} XP → Daraja {level + 1}
            </span>
          </div>
          <div style={{ height: "8px", background: "rgba(255,255,255,0.07)", borderRadius: "4px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${xpPercent}%`,
                background: "linear-gradient(90deg, #00ff88, #0088ff)",
                boxShadow: "0 0 10px rgba(0,255,136,0.4)",
                borderRadius: "4px",
                transition: "width 1s ease",
              }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {[
            { icon: <BookOpen size={22} color="#00ff88" />, label: "Tugatilgan Darslar", value: progress.completedLessons.length, total: totalLessons, color: "#00ff88" },
            { icon: <Flame size={22} color="#ff8800" />, label: "Kunlik Seriya", value: progress.streak, total: null, color: "#ff8800", suffix: " kun" },
            { icon: <Zap size={22} color="#0088ff" />, label: "Jami XP", value: progress.xp, total: null, color: "#0088ff", suffix: " XP" },
            { icon: <Trophy size={22} color="#ffd700" />, label: "Yutuqlar", value: progress.achievements.length, total: null, color: "#ffd700" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(13,13,26,0.85)",
                border: `1px solid ${stat.color}20`,
                borderRadius: "12px",
                padding: "20px",
                backdropFilter: "blur(16px)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>{stat.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: stat.color, marginBottom: "4px" }}>
                {stat.value}{stat.suffix ?? ""}
                {stat.total !== null && (
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 400 }}>
                    {" "}/ {stat.total}
                  </span>
                )}
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Course progress */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "24px",
            marginBottom: "20px",
            backdropFilter: "blur(16px)",
          }}
        >
          <h2 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "18px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Target size={18} color="#00ff88" /> Kurs Progressi
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {COURSE_SECTIONS.map((section) => {
              const prog = sectionProgress(section.id);
              const color = SECTION_COLORS[section.id] ?? "#00ff88";
              const title = UZ_TITLES[section.id] ?? section.title;
              return (
                <div key={section.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 500 }}>{title}</span>
                    <span style={{ color: color, fontSize: "12px" }}>
                      {prog.done}/{prog.total}
                    </span>
                  </div>
                  <div style={{ height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${prog.percent}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}80)`,
                        boxShadow: `0 0 8px ${color}40`,
                        borderRadius: "3px",
                        transition: "width 0.8s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        {progress.achievements.length > 0 && (
          <div
            style={{
              background: "rgba(13,13,26,0.85)",
              border: "1px solid rgba(255,215,0,0.2)",
              borderRadius: "14px",
              padding: "24px",
              backdropFilter: "blur(16px)",
            }}
          >
            <h2 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Trophy size={18} color="#ffd700" /> Yutuqlar
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {progress.achievements.map((a) => (
                <span
                  key={a}
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    border: "1px solid rgba(255,215,0,0.3)",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    fontSize: "12px",
                    color: "#ffd700",
                  }}
                >
                  🏆 {a}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
