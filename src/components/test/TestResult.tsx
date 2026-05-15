"use client";

import { CheckCircle2, XCircle, ThumbsUp, AlertCircle } from "lucide-react";
import type { ValidationResult } from "@/lib/types";

export function TestResult({ result }: { result: ValidationResult }) {
  const { score, passed, strengths, weaknesses, feedback } = result;
  const accent = passed ? "#00ff88" : "#ff0066";

  return (
    <div style={{ padding: "8px 0" }}>
      {/* Score circle */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px" }}>
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            border: `2px solid ${accent}`,
            boxShadow: `0 0 30px ${accent}50`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "38px", fontWeight: 800, color: accent, lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: "10px", color: accent, letterSpacing: "1px", marginTop: "2px" }}>
            / 100
          </span>
        </div>

        <h3
          style={{
            color: accent,
            fontSize: "20px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          {passed ? (
            <><CheckCircle2 size={22} /> O&apos;tdingiz! 🎉</>
          ) : (
            <><XCircle size={22} /> O&apos;tmadingiz</>
          )}
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "13px", maxWidth: "460px", lineHeight: 1.6 }}>
          {feedback}
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <div
          style={{
            background: "rgba(0,255,136,0.05)",
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "10px",
            padding: "14px",
          }}
        >
          <h4
            style={{
              color: "#00ff88",
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <ThumbsUp size={13} /> Kuchli tomonlar
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {strengths.map((s, i) => (
              <li key={i} style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
                • {s}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: "rgba(255,165,0,0.05)",
            border: "1px solid rgba(255,165,0,0.2)",
            borderRadius: "10px",
            padding: "14px",
          }}
        >
          <h4
            style={{
              color: "#f59e0b",
              fontSize: "12px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <AlertCircle size={13} /> Yaxshilash kerak
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {weaknesses.map((w, i) => (
              <li key={i} style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
                • {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
