"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { getSection } from "@/lib/course-data";
import { useProgress } from "@/hooks/useProgress";
import { FinalExam } from "@/components/test/FinalExam";

const UZ_TITLES: Record<string, string> = {
  "network-fundamentals": "Tarmoq Asoslari",
  "http-tls": "HTTP, HTTPS, TLS va SSL",
  "web-servers": "Web Serverlar",
  "server-infrastructure": "Server Infratuzilmasi",
  "software-architecture": "Dasturiy Arxitektura",
  "network-security": "Tarmoq Xavfsizligi",
  "pentesting": "Penetratsion Testlash",
};

export default function ExamPage() {
  const params = useParams<{ sectionId: string }>();
  const section = getSection(params.sectionId);
  const { sectionProgress, loaded } = useProgress();

  if (!section) {
    return (
      <div style={{ padding: "60px 24px", textAlign: "center", color: "#94a3b8" }}>
        Bo&apos;lim topilmadi.{" "}
        <Link href="/courses" style={{ color: "#00ff88" }}>Orqaga</Link>
      </div>
    );
  }

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

  const prog = sectionProgress(section.id);
  const allComplete = prog.done === prog.total && prog.total > 0;
  const sectionTitle = UZ_TITLES[section.id] ?? section.title;

  return (
    <div style={{ minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Link
          href={`/courses/${section.id}`}
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
          <ArrowLeft size={16} /> {sectionTitle}
        </Link>

        {allComplete ? (
          <FinalExam section={section} />
        ) : (
          <div
            style={{
              background: "rgba(13,13,26,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "60px 24px",
              textAlign: "center",
              maxWidth: "520px",
              margin: "0 auto",
              backdropFilter: "blur(16px)",
            }}
          >
            <Lock size={36} color="#475569" style={{ margin: "0 auto 16px" }} />
            <h2 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "20px", marginBottom: "10px" }}>
              Imtihon Qulflangan
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
              Final imtihonni topshirish uchun{" "}
              <span style={{ color: "#00ff88" }}>{sectionTitle}</span> bo&apos;limidagi
              barcha {prog.total} ta darsni yakunlashingiz kerak. Siz {prog.done} ta darsni
              tugatdingiz.
            </p>
            <Link
              href={`/courses/${section.id}`}
              style={{
                textDecoration: "none",
                display: "inline-block",
                padding: "12px 24px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00ff88, #00cc66)",
                color: "#000",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              📚 Darslarga Davom Etish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
