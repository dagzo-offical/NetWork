"use client";

import {
  AlertTriangle,
  BookOpen,
  Bug,
  Layers,
  Network,
  Lightbulb,
  ShieldCheck,
  Activity,
  Wrench,
  Terminal,
  Search,
  XOctagon,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import type { Lesson } from "@/lib/types";
import { severityColor } from "@/components/ui/Badge";
import { CodeBlock } from "./CodeBlock";
import { DiagramViewer } from "./DiagramViewer";
import { PacketFlow } from "./PacketFlow";

const SEVERITY_UZ: Record<string, string> = {
  Low: "Past",
  Medium: "O'rta",
  High: "Yuqori",
  Critical: "Kritik",
};

function Section({
  icon: Icon,
  title,
  accent = "#00ff88",
  children,
}: {
  icon: typeof BookOpen;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ scrollMarginTop: "80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: `${accent}18`,
            border: `1px solid ${accent}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
        <h2 style={{ color: "#e2e8f0", fontSize: "18px", fontWeight: 700, margin: 0 }}>{title}</h2>
      </div>
      <div style={{ color: "#cbd5e1" }}>{children}</div>
    </section>
  );
}

export function LessonContent({ lesson }: { lesson: Lesson }) {
  const c = lesson.content;

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

      {/* 1. Kirish */}
      <Section icon={BookOpen} title="📖 Kirish">
        <p style={{ lineHeight: 1.8, margin: 0 }}>{c.introduction}</p>
      </Section>

      {/* 2. Nazariya */}
      <Section icon={Layers} title="📚 Nazariya va Tushunchalar" accent="#0088ff">
        <p style={{ lineHeight: 1.8, margin: 0 }}>{c.theory}</p>
      </Section>

      {/* 3. Real dunyo arxitekturasi */}
      <Section icon={Network} title="🏗️ Real Dunyo Arxitekturasi">
        <p style={{ lineHeight: 1.8, margin: 0 }}>{c.realWorldArchitecture}</p>
      </Section>

      {/* 4. Paket oqimi */}
      <Section icon={Activity} title="📡 Paket Oqimi" accent="#0088ff">
        <p style={{ lineHeight: 1.8, margin: 0, marginBottom: "16px" }}>{c.packetFlow}</p>
        <PacketFlow caption="Har bir hop da protokol sarlavhalari qo'shiladi yoki olib tashlanadi." />
      </Section>

      {/* 5. Diagrammalar */}
      {c.diagrams.length > 0 && (
        <Section icon={Layers} title="📊 Diagrammalar" accent="#8800ff">
          {c.diagrams.map((d, i) => (
            <DiagramViewer
              key={i}
              id={`${lesson.id}-${i}`}
              code={d.content}
              title={d.title}
            />
          ))}
        </Section>
      )}

      {/* 6. Xavfsizlik ta'sirlari */}
      <Section icon={ShieldCheck} title="🔐 Xavfsizlik Ta'sirlari" accent="#ff0066">
        <p style={{ lineHeight: 1.8, margin: 0 }}>{c.securityImplications}</p>
      </Section>

      {/* 7. Hujum vektorlari */}
      <Section icon={Bug} title="⚔️ Hujum Vektorlari" accent="#ff0066">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "12px",
          }}
        >
          {c.attackVectors.map((a) => {
            const sev = severityColor(a.severity);
            const sevColors: Record<string, string> = {
              green: "#00ff88",
              blue: "#0088ff",
              red: "#ff0066",
              purple: "#8800ff",
              amber: "#f59e0b",
              slate: "#94a3b8",
            };
            const col = sevColors[sev] ?? "#94a3b8";
            return (
              <div
                key={a.name}
                style={{
                  background: "rgba(255,0,102,0.05)",
                  border: "1px solid rgba(255,0,102,0.2)",
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "13px" }}>{a.name}</span>
                  <span
                    style={{
                      background: `${col}20`,
                      border: `1px solid ${col}40`,
                      borderRadius: "10px",
                      padding: "1px 8px",
                      fontSize: "10px",
                      color: col,
                    }}
                  >
                    {SEVERITY_UZ[a.severity] ?? a.severity}
                  </span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>{a.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 8. Himoya usullari */}
      <Section icon={ShieldCheck} title="🛡️ Himoya Usullari">
        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
          {c.defenseMethods.map((d, i) => (
            <li
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#cbd5e1" }}
            >
              <ShieldCheck size={15} color="#00ff88" style={{ marginTop: "2px", flexShrink: 0 }} />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      {/* 9. Konfiguratsiya misollari */}
      {c.configExamples.length > 0 && (
        <Section icon={Wrench} title="⚙️ Konfiguratsiya Misollari" accent="#0088ff">
          {c.configExamples.map((ex, i) => (
            <CodeBlock
              key={i}
              code={ex.code}
              language={ex.language}
              description={ex.description}
            />
          ))}
        </Section>
      )}

      {/* 10. CLI misollari */}
      {c.cliExamples.length > 0 && (
        <Section icon={Terminal} title="💻 CLI Misollari">
          {c.cliExamples.map((ex, i) => (
            <CodeBlock
              key={i}
              code={ex.code}
              language={ex.language}
              description={ex.description}
            />
          ))}
        </Section>
      )}

      {/* 11. Wireshark tahlili */}
      <Section icon={Search} title="🔍 Wireshark Tahlili" accent="#0088ff">
        <p style={{ lineHeight: 1.8, margin: 0 }}>{c.wiresharkAnalysis}</p>
      </Section>

      {/* 12. Keng tarqalgan xatolar */}
      <Section icon={XOctagon} title="⚠️ Keng Tarqalgan Xatolar" accent="#ff0066">
        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
          {c.commonMistakes.map((m, i) => (
            <li
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#cbd5e1" }}
            >
              <AlertTriangle size={15} color="#f59e0b" style={{ marginTop: "2px", flexShrink: 0 }} />
              {m}
            </li>
          ))}
        </ul>
      </Section>

      {/* 13. Ilg'or tushunchalar */}
      <Section icon={Sparkles} title="🚀 Ilg'or Tushunchalar" accent="#8800ff">
        <p style={{ lineHeight: 1.8, margin: 0 }}>{c.advancedConcepts}</p>
      </Section>

      {/* 14. Xulosa */}
      <Section icon={GraduationCap} title="✅ Xulosa">
        <div
          style={{
            background: "rgba(0,255,136,0.05)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "10px",
            padding: "16px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{c.summary}</p>
        </div>
      </Section>

      {/* Footer hint */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#64748b" }}>
        <Lightbulb size={15} color="#f59e0b" />
        Keyingi darsni ochish va XP yig'ish uchun quyidagi testni yakunlang.
      </div>
    </article>
  );
}
