"use client";

import { useState } from "react";
import { useApiKey } from "@/hooks/useApiKey";
import { Key, CheckCircle, XCircle, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const { key, provider, loaded, saveKey, clearKey } = useApiKey();
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!draft.trim()) return;
    saveKey(draft.trim());
    setDraft("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    clearKey();
    setDraft("");
  };

  const providerLabel: Record<string, string> = {
    groq: "Groq",
    anthropic: "Anthropic",
    openai: "OpenAI",
    none: "Unknown",
  };

  const providerColor: Record<string, string> = {
    groq: "#00ff88",
    anthropic: "#0088ff",
    openai: "#8800ff",
    none: "#64748b",
  };

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "60px auto",
        padding: "0 24px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#00ff88",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          ⚙️ Settings
        </div>
        <h1
          style={{
            color: "#e2e8f0",
            fontSize: "28px",
            fontWeight: 800,
            marginBottom: "8px",
          }}
        >
          API Key
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6 }}>
          Enter your Groq API key to enable AI-powered test grading.
          The key is stored only in your browser — it is never sent anywhere else.
        </p>
      </div>

      {/* Current key status */}
      {loaded && key && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            borderRadius: "12px",
            background: "rgba(0,255,136,0.05)",
            border: "1px solid rgba(0,255,136,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CheckCircle size={20} color="#00ff88" />
            <div>
              <div style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600 }}>
                Key saved
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>
                {key.slice(0, 8)}••••••••••••
                {" · "}
                <span style={{ color: providerColor[provider] ?? "#64748b" }}>
                  {providerLabel[provider] ?? provider}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClear}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              background: "rgba(255,0,102,0.08)",
              border: "1px solid rgba(255,0,102,0.25)",
              color: "#ff0066",
              fontSize: "13px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      )}

      {/* Input */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          padding: "24px",
        }}
      >
        <label
          style={{
            display: "block",
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "10px",
            fontWeight: 500,
          }}
        >
          Groq API key{" "}
          <span style={{ color: "#475569", fontWeight: 400 }}>(starts with gsk_)</span>
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Key
              size={15}
              color="#475569"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="password"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
              style={{
                width: "100%",
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "11px",
                paddingBottom: "11px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                fontSize: "14px",
                fontFamily: "monospace",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!draft.trim()}
            style={{
              padding: "11px 20px",
              borderRadius: "8px",
              background: draft.trim()
                ? "linear-gradient(135deg, #00ff88, #00cc66)"
                : "rgba(255,255,255,0.05)",
              border: "none",
              color: draft.trim() ? "#000" : "#475569",
              fontWeight: 700,
              fontSize: "14px",
              cursor: draft.trim() ? "pointer" : "not-allowed",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
        </div>

        {/* Provider detection hint */}
        {draft && (
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
            }}
          >
            {draft.startsWith("gsk_") ? (
              <>
                <CheckCircle size={13} color="#00ff88" />
                <span style={{ color: "#00ff88" }}>Groq key detected</span>
              </>
            ) : (
              <>
                <XCircle size={13} color="#ff0066" />
                <span style={{ color: "#ff0066" }}>
                  Groq keys must start with gsk_
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          marginTop: "20px",
          padding: "14px 16px",
          borderRadius: "10px",
          background: "rgba(0,136,255,0.06)",
          border: "1px solid rgba(0,136,255,0.15)",
          fontSize: "13px",
          color: "#64748b",
          lineHeight: 1.6,
        }}
      >
        💡 Get a free Groq API key at{" "}
        <span style={{ color: "#0088ff" }}>console.groq.com</span>.
        Without a key, tests still work using the built-in heuristic scorer.
      </div>
    </div>
  );
}
