import Link from "next/link";
import { ShieldCheck, Code2, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Brand */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <ShieldCheck size={22} color="#00ff88" />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "15px",
                  background: "linear-gradient(135deg, #00ff88, #0088ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NetSec Academy
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>
              Tarmoq xavfsizligi, infratuzilma va penetratsion testlashni o&apos;rganish uchun
              premium, amaliy platforma — paketlardan PKI gacha.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", fontSize: "13px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: "4px" }}>O&apos;rganish</span>
              <Link href="/courses" style={{ color: "#64748b", textDecoration: "none" }}>
                Barcha Kurslar
              </Link>
              <Link href="/dashboard" style={{ color: "#64748b", textDecoration: "none" }}>
                Dashboard
              </Link>
              <Link href="/certificate" style={{ color: "#64748b", textDecoration: "none" }}>
                Sertifikat
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: "4px" }}>Platforma</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                <Code2 size={14} /> Ochiq Manba
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                <Terminal size={14} /> Hackerlar uchun qurilgan
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "20px",
            fontSize: "11px",
            color: "#475569",
          }}
        >
          © {new Date().getFullYear()} NetSec Academy. Faqat ta&apos;lim maqsadlarida.
          Faqat ruxsat berilgan tizimlarni tekshiring.
        </div>
      </div>
    </footer>
  );
}
