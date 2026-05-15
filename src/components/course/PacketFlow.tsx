"use client";

import { motion } from "framer-motion";
import { Server, Laptop, Router } from "lucide-react";

/**
 * An animated packet travelling Client -> Router -> Server, looping.
 * Purely decorative visualisation of packet flow.
 */
export function PacketFlow({ caption }: { caption?: string }) {
  const nodes = [
    { icon: Laptop, label: "Client" },
    { icon: Router, label: "Gateway" },
    { icon: Server, label: "Server" },
  ];

  return (
    <div className="glass rounded-xl p-6 my-4">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-10 right-10 top-1/2 h-px bg-gradient-to-r from-neon-green/40 via-neon-blue/40 to-neon-green/40" />

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-neon-green shadow-[0_0_12px_rgba(0,255,136,0.9)]"
          initial={{ left: "8%" }}
          animate={{ left: ["8%", "50%", "92%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {nodes.map((n) => (
          <div
            key={n.label}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neon-green/40 bg-bg-secondary">
              <n.icon className="h-6 w-6 text-neon-green" />
            </div>
            <span className="text-xs text-slate-400">{n.label}</span>
          </div>
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">{caption}</p>
      )}
    </div>
  );
}
