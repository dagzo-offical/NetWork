"use client";

import type { TestQuestion as TQ } from "@/lib/types";

export function TestQuestion({
  question,
  index,
  value,
  onChange,
  disabled,
}: {
  question: TQ;
  index: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "rgba(0,255,136,0.15)",
            border: "1px solid rgba(0,255,136,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "#00ff88",
          }}
        >
          {index + 1}
        </span>
        <p style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: 1.6, paddingTop: "4px" }}>
          {question.question}
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={5}
        placeholder="Batafsil, texnik javob yozing..."
        style={{
          width: "100%",
          resize: "vertical",
          borderRadius: "8px",
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${value.trim() ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.08)"}`,
          padding: "12px",
          fontSize: "13px",
          color: "#e2e8f0",
          outline: "none",
          fontFamily: "inherit",
          lineHeight: 1.6,
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => {
          (e.target as HTMLTextAreaElement).style.border = "1px solid rgba(0,255,136,0.5)";
          (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 2px rgba(0,255,136,0.1)";
        }}
        onBlur={(e) => {
          (e.target as HTMLTextAreaElement).style.border = `1px solid ${value.trim() ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.08)"}`;
          (e.target as HTMLTextAreaElement).style.boxShadow = "none";
        }}
      />

      <div style={{ marginTop: "6px", display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
        <span style={{ color: "#64748b" }}>
          Terminlar va mexanizmlar baholanadi
        </span>
        <span style={{ color: words >= 25 ? "#00ff88" : "#64748b" }}>
          {words} ta so&apos;z
        </span>
      </div>
    </div>
  );
}
