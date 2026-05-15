"use client";

import { useState } from "react";
import { Award, ShieldCheck, Lock } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { COURSE_SECTIONS, TOTAL_LESSONS } from "@/lib/course-data";

const UZ_TITLES: Record<string, string> = {
  "network-fundamentals": "Tarmoq Asoslari",
  "http-tls": "HTTP, HTTPS, TLS va SSL",
  "web-servers": "Web Serverlar",
  "server-infrastructure": "Server Infratuzilmasi",
  "software-architecture": "Dasturiy Arxitektura",
  "network-security": "Tarmoq Xavfsizligi",
  "pentesting": "Penetratsion Testlash",
};

export default function CertificatePage() {
  const { progress, loaded, isSectionExamPassed } = useProgress();
  const [name, setName] = useState("");

  if (!loaded) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          color: "#64748b",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "2px solid #00ff88",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        Yuklanmoqda...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const masteredSections = COURSE_SECTIONS.filter((s) => isSectionExamPassed(s.id));
  const allMastered = masteredSections.length === COURSE_SECTIONS.length;
  const percent = Math.round((masteredSections.length / COURSE_SECTIONS.length) * 100);

  return (
    <div style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              color: "#e2e8f0",
              marginBottom: "8px",
            }}
          >
            Sizning{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00ff88, #0088ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sertifikatiz
            </span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px" }}>
            Barcha {COURSE_SECTIONS.length} ta bo&apos;limning final imtihonidan o&apos;ting — sertifikat olish uchun.
          </p>
        </div>

        {/* Progress */}
        <div
          style={{
            background: "rgba(13,13,26,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "20px 24px",
            marginBottom: "24px",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
            <span style={{ color: "#e2e8f0" }}>Dastur Progressi</span>
            <span style={{ color: "#64748b" }}>
              {masteredSections.length}/{COURSE_SECTIONS.length} bo&apos;lim yakunlandi
            </span>
          </div>
          <div style={{ height: "8px", background: "rgba(255,255,255,0.07)", borderRadius: "4px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${percent}%`,
                background: "linear-gradient(90deg, #00ff88, #0088ff)",
                boxShadow: "0 0 10px rgba(0,255,136,0.4)",
                borderRadius: "4px",
                transition: "width 0.8s ease",
              }}
            />
          </div>
        </div>

        {/* Certificate or Locked */}
        {allMastered ? (
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Gradient border */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #00ff88, #0088ff, #8800ff, #00ff88)",
                backgroundSize: "300% 300%",
                animation: "gradientShift 4s linear infinite",
                zIndex: 0,
              }}
            />
            <style>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }
            `}</style>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                margin: "2px",
                borderRadius: "14px",
                background: "rgba(10,10,20,0.97)",
                padding: "clamp(28px, 5vw, 60px)",
                textAlign: "center",
              }}
            >
              <Award size={56} color="#00ff88" style={{ margin: "0 auto 16px", filter: "drop-shadow(0 0 12px rgba(0,255,136,0.5))" }} />

              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "12px",
                }}
              >
                Yakunlash Sertifikati
              </p>

              <h2
                style={{
                  fontSize: "clamp(20px, 4vw, 32px)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #00ff88, #0088ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "20px",
                }}
              >
                Tarmoq Xavfsizligi va Infratuzilmasi
              </h2>

              <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
                Bu sertifikat
              </p>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid rgba(0,255,136,0.4)",
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#e2e8f0",
                  outline: "none",
                  padding: "4px 16px",
                  width: "100%",
                  maxWidth: "400px",
                  marginBottom: "20px",
                  display: "block",
                  margin: "0 auto 20px",
                }}
              />

              <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "500px", margin: "0 auto 24px", lineHeight: 1.7 }}>
                NetSec Academy dasturining barcha {TOTAL_LESSONS} ta darsi va{" "}
                {COURSE_SECTIONS.length} ta bo&apos;limining final imtihonini muvaffaqiyatli yakunlaganligini tasdiqlaydi.
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#00ff88", marginBottom: "8px" }}>
                <ShieldCheck size={18} />
                <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
                  {progress.xp.toLocaleString()} XP to&apos;plandi
                </span>
              </div>

              <p style={{ fontSize: "12px", color: "#475569", marginBottom: "24px" }}>
                Berildi: {new Date().toLocaleDateString("uz-UZ")} · NetSec Academy
              </p>

              <button
                onClick={() => window.print()}
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
                🖨️ Chop Etish / Saqlash
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "rgba(13,13,26,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "40px 24px",
              textAlign: "center",
              backdropFilter: "blur(16px)",
            }}
          >
            <Lock size={40} color="#475569" style={{ margin: "0 auto 14px" }} />
            <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "20px", marginBottom: "8px" }}>
              Sertifikat Qulflangan
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "28px" }}>
              Sertifikat olish uchun barcha bo&apos;limlarni yakunlang.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "10px",
                textAlign: "left",
              }}
            >
              {COURSE_SECTIONS.map((s) => {
                const done = isSectionExamPassed(s.id);
                return (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "10px",
                      border: done ? "1px solid rgba(0,255,136,0.35)" : "1px solid rgba(255,255,255,0.08)",
                      padding: "12px 14px",
                      fontSize: "13px",
                      color: done ? "#e2e8f0" : "#64748b",
                    }}
                  >
                    {done ? (
                      <ShieldCheck size={16} color="#00ff88" />
                    ) : (
                      <Lock size={16} color="#475569" />
                    )}
                    {UZ_TITLES[s.id] ?? s.title}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
