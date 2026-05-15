"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Network,
  TerminalSquare,
  Trophy,
  GitBranch,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Graded Exams",
    desc: "Every lesson ends with written questions graded by an intelligent scoring engine that checks depth, accuracy and terminology.",
  },
  {
    icon: Network,
    title: "Packet-Level Depth",
    desc: "Go beyond surface knowledge — trace traffic hop by hop, dissect protocols and understand exactly what crosses the wire.",
  },
  {
    icon: ShieldCheck,
    title: "Attack & Defense",
    desc: "Each topic covers real attack vectors with severity ratings alongside the defenses that stop them.",
  },
  {
    icon: TerminalSquare,
    title: "Real CLI & Config",
    desc: "Production-grade configuration and command-line examples for NGINX, iptables, SSH, Nmap, Wireshark and more.",
  },
  {
    icon: GitBranch,
    title: "Progressive Unlocks",
    desc: "Lessons and sections unlock as you pass exams — a structured path from fundamentals to advanced pentesting.",
  },
  {
    icon: Trophy,
    title: "XP, Streaks & Certs",
    desc: "Earn XP, build study streaks, unlock achievements and claim a certificate when you complete the program.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Built for <span className="gradient-text">serious learners</span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto">
          Not a video dump — a structured, assessed, depth-first curriculum.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <Card className="h-full">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-neon-green/10 border border-neon-green/30">
                <f.icon className="h-5 w-5 text-neon-green" />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription className="mt-2">{f.desc}</CardDescription>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
