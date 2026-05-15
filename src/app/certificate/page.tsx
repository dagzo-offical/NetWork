"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Loader2, ShieldCheck, Lock } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { COURSE_SECTIONS, TOTAL_LESSONS } from "@/lib/course-data";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";

export default function CertificatePage() {
  const { progress, loaded, isSectionExamPassed } = useProgress();
  const [name, setName] = useState("");

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-40 text-slate-400">
        <Loader2 className="h-7 w-7 animate-spin text-neon-green" />
      </div>
    );
  }

  const masteredSections = COURSE_SECTIONS.filter((s) =>
    isSectionExamPassed(s.id)
  );
  const allMastered = masteredSections.length === COURSE_SECTIONS.length;
  const percent = Math.round(
    (masteredSections.length / COURSE_SECTIONS.length) * 100
  );

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Your <span className="gradient-text">Certificate</span>
        </h1>
        <p className="mt-2 text-slate-400">
          Pass the final exam of all {COURSE_SECTIONS.length} sections to earn
          your certificate of completion.
        </p>
      </div>

      <div className="glass rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-slate-300">Program Progress</span>
          <span className="text-slate-500">
            {masteredSections.length}/{COURSE_SECTIONS.length} sections mastered
          </span>
        </div>
        <Progress value={percent} />
      </div>

      {allMastered ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-border rounded-xl"
        >
          <div className="glass rounded-xl p-8 sm:p-12 text-center">
            <Award className="mx-auto h-14 w-14 text-neon-green" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">
              Certificate of Completion
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold gradient-text">
              Network Security & Infrastructure
            </h2>
            <p className="mt-4 text-sm text-slate-400">
              This certifies that
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full max-w-sm mx-auto bg-transparent border-b border-neon-green/40 text-center text-xl font-semibold text-slate-100 focus:outline-none focus:border-neon-green py-1"
            />
            <p className="mt-4 text-sm text-slate-400 max-w-md mx-auto">
              has successfully completed all {TOTAL_LESSONS} lessons and passed
              the final exam for every one of the {COURSE_SECTIONS.length}{" "}
              sections of the NetSec Academy program.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-neon-green">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-mono text-sm">
                {progress.xp.toLocaleString()} XP earned
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-600">
              Issued {new Date().toLocaleDateString()} · NetSec Academy
            </div>
            <Button
              variant="solid"
              className="mt-6"
              onClick={() => window.print()}
            >
              Print / Save Certificate
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="glass rounded-xl p-10 text-center">
          <Lock className="mx-auto h-10 w-10 text-slate-600" />
          <h3 className="mt-3 font-semibold text-slate-100">
            Certificate Locked
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Master all sections to unlock your certificate.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-2 text-left">
            {COURSE_SECTIONS.map((s) => {
              const done = isSectionExamPassed(s.id);
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                    done
                      ? "border-neon-green/40 text-slate-200"
                      : "border-white/10 text-slate-500"
                  }`}
                >
                  {done ? (
                    <ShieldCheck className="h-4 w-4 text-neon-green" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  {s.title}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
