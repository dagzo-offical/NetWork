"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { formatTime } from "@/lib/utils";

export function CooldownTimer({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, onComplete]);

  const pct = seconds > 0 ? (1 - remaining / seconds) * 100 : 100;

  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(255,0,102,0.1)",
          border: "1px solid rgba(255,0,102,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}
      >
        <Lock size={28} color="#ff0066" />
      </div>

      <h3 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>
        Test Qulflangan
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "13px", maxWidth: "340px", margin: "0 auto 20px", lineHeight: 1.6 }}>
        O&apos;ta olmadingiz. Darsni qayta o&apos;qing — cooldown tugagach qayta topshirishingiz mumkin.
      </p>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: "36px",
          fontWeight: 800,
          color: "#ff0066",
          letterSpacing: "2px",
          marginBottom: "16px",
        }}
      >
        {formatTime(remaining)}
      </div>

      <div
        style={{
          maxWidth: "280px",
          margin: "0 auto",
          height: "6px",
          borderRadius: "3px",
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #ff0066, #8800ff)",
            borderRadius: "3px",
            width: `${pct}%`,
            transition: "width 1s linear",
          }}
        />
      </div>
    </div>
  );
}
