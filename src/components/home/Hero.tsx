"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TOTAL_LESSONS, COURSE_SECTIONS } from "@/lib/course-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-1.5 text-xs text-neon-green mb-8"
        >
          <Zap className="h-3.5 w-3.5" />
          {TOTAL_LESSONS} lessons across {COURSE_SECTIONS.length} sections — AI-graded
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance"
        >
          Master <span className="gradient-text">Network Security</span>
          <br />
          from <span className="gradient-text-red">Packet to Perimeter</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-7 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          A deep, hands-on course covering networking fundamentals, TLS, web
          servers, cloud infrastructure, architecture, defensive security and
          penetration testing. Every lesson ends with an AI-graded exam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/courses" variant="solid" size="lg">
            Start Learning <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/dashboard" variant="ghost" size="lg">
            <Terminal className="h-5 w-5" /> View Dashboard
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 max-w-2xl terminal rounded-xl p-5 text-left text-sm"
        >
          <div className="flex gap-1.5 mb-3">
            <span className="h-3 w-3 rounded-full bg-neon-red/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-neon-green/70" />
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">
{`$ nmap -sV netsec.academy
PORT     STATE  SERVICE   VERSION
22/tcp   open   ssh       knowledge 9.0
443/tcp  open   https     mastery 1.3
8080/tcp open   http      hands-on-labs
$ ./enroll --course network-security --mode deep`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
