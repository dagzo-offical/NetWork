"use client";

import Link from "next/link";
import { TOTAL_LESSONS, COURSE_SECTIONS } from "@/lib/course-data";

const SECTIONS = [
  { id: "network-fundamentals", icon: "🌐", title: "Tarmoq Asoslari", color: "#00ff88" },
  { id: "http-tls", icon: "🔒", title: "HTTP / HTTPS / TLS", color: "#0088ff" },
  { id: "web-servers", icon: "🖥️", title: "Web Serverlar", color: "#8800ff" },
  { id: "server-infrastructure", icon: "☁️", title: "Server Infratuzilmasi", color: "#00ff88" },
  { id: "software-architecture", icon: "🏗️", title: "Dasturiy Arxitektura", color: "#0088ff" },
  { id: "network-security", icon: "🛡️", title: "Tarmoq Xavfsizligi", color: "#ff0066" },
  { id: "pentesting", icon: "⚔️", title: "Penetratsion Testlash", color: "#8800ff" },
];

const FEATURES = [
  { icon: "🤖", title: "AI Tekshiruv", desc: "Har bir javob sun'iy intellekt tomonidan semantik tahlil qilinadi." },
  { icon: "📝", title: "Yozma Testlar", desc: "Barcha testlar yozma formatda — to'g'ri tushunishingizni isbotlang." },
  { icon: "⏱️", title: "30 Daqiqa Cooldown", desc: "Yiqilsangiz 30 daqiqa kutiladi — bu bilimni mustahkamlaydi." },
  { icon: "🏆", title: "Final Imtihon", desc: "Har bo'lim oxirida 20 ta savollik final imtihon — 85% o'tish kerak." },
  { icon: "📊", title: "Progress Kuzatuv", desc: "XP, streak, yutuqlar va ko'rgazmali progress xaritasi." },
  { icon: "🎓", title: "Sertifikat", desc: "Barcha bo'limlarni yakunlagach rasmiy sertifikat beriladi." },
];

export default function Home() {
  const totalLessons = TOTAL_LESSONS;
  const totalSections = COURSE_SECTIONS.length;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          padding: "100px 24px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "20%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(0,255,136,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(0,136,255,0.07), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(0,255,136,0.1)",
              border: "1px solid rgba(0,255,136,0.3)",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "12px",
              color: "#00ff88",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            ⚡ Premium Network Security Kursi
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "#e2e8f0",
            }}
          >
            Tarmoq Xavfsizligini{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00ff88, #0088ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Professional
            </span>{" "}
            Darajada O&apos;rganing
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              lineHeight: 1.7,
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Real pentest, network engineering va server administratsiya darajasida professional kontent.
            AI orqali yozma test tekshirish tizimi bilan.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/courses"
              style={{
                textDecoration: "none",
                padding: "14px 32px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00ff88, #00cc66)",
                color: "#000",
                fontWeight: 700,
                fontSize: "15px",
                boxShadow: "0 0 24px rgba(0,255,136,0.3)",
                transition: "all 0.2s ease",
              }}
            >
              🚀 O&apos;qishni Boshlash
            </Link>
            <Link
              href="/dashboard"
              style={{
                textDecoration: "none",
                padding: "14px 32px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              📊 Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 24px 60px" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            { value: `${totalLessons}+`, label: "Ta Dars" },
            { value: `${totalSections}`, label: "Ta Bo'lim" },
            { value: "AI", label: "Tekshiruv Tizimi" },
            { value: "100%", label: "Amaliy Kontent" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(13,13,26,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "24px",
                textAlign: "center",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #00ff88, #0088ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course sections preview */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              color: "#e2e8f0",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Kurs{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00ff88, #0088ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bo&apos;limlari
            </span>
          </h2>
          <p style={{ color: "#64748b", textAlign: "center", marginBottom: "40px" }}>
            7 ta bo&apos;lim ketma-ket o&apos;tiladi
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {SECTIONS.map((s, i) => (
              <Link
                key={s.id}
                href={`/courses/${s.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "rgba(13,13,26,0.8)",
                    border: `1px solid ${s.color}25`,
                    borderRadius: "12px",
                    padding: "20px",
                    backdropFilter: "blur(16px)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${s.color}60`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${s.color}15`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${s.color}25`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: `${s.color}15`,
                        border: `1px solid ${s.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "14px" }}>
                        {s.title}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "60px 24px 80px",
          background: "rgba(13,13,26,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              color: "#e2e8f0",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Platform{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00ff88, #0088ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Xususiyatlari
            </span>
          </h2>
          <p style={{ color: "#64748b", textAlign: "center", marginBottom: "48px" }}>
            Udemy va Coursera darajasidan yuqori o&apos;quv tizimi
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "rgba(13,13,26,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "24px",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>
                  {f.title}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              color: "#e2e8f0",
              marginBottom: "16px",
            }}
          >
            Hoziroq Boshlang
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: "32px", fontSize: "16px" }}>
            Tarmoq xavfsizligi sohasida professional bo&apos;lish yo&apos;lingizni boshlang.
          </p>
          <Link
            href="/courses"
            style={{
              textDecoration: "none",
              padding: "16px 40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #00ff88, #00cc66)",
              color: "#000",
              fontWeight: 800,
              fontSize: "16px",
              boxShadow: "0 0 32px rgba(0,255,136,0.35)",
              display: "inline-block",
            }}
          >
            🎓 Kurslarni Ko&apos;rish
          </Link>
        </div>
      </section>
    </div>
  );
}
