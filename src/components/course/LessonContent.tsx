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
import { Badge, severityColor } from "@/components/ui/Badge";
import { CodeBlock } from "./CodeBlock";
import { DiagramViewer } from "./DiagramViewer";
import { PacketFlow } from "./PacketFlow";

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
    <section className="scroll-mt-20">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg border"
          style={{ backgroundColor: `${accent}1a`, borderColor: `${accent}55` }}
        >
          <Icon className="h-4 w-4" style={{ color: accent }} />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      </div>
      <div className="prose-cyber text-slate-300">{children}</div>
    </section>
  );
}

export function LessonContent({ lesson }: { lesson: Lesson }) {
  const c = lesson.content;
  return (
    <article className="flex flex-col gap-10">
      <Section icon={BookOpen} title="Introduction">
        <p>{c.introduction}</p>
      </Section>

      <Section icon={Layers} title="Theory & Concepts" accent="#0088ff">
        <p>{c.theory}</p>
      </Section>

      <Section icon={Network} title="Real-World Architecture">
        <p>{c.realWorldArchitecture}</p>
      </Section>

      <Section icon={Activity} title="Packet Flow" accent="#0088ff">
        <p>{c.packetFlow}</p>
        <PacketFlow caption="Each hop adds or strips protocol headers as the packet travels." />
      </Section>

      {c.diagrams.length > 0 && (
        <Section icon={Layers} title="Diagrams" accent="#8800ff">
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

      <Section icon={ShieldCheck} title="Security Implications" accent="#ff0066">
        <p>{c.securityImplications}</p>
      </Section>

      <Section icon={Bug} title="Attack Vectors" accent="#ff0066">
        <div className="grid gap-3 sm:grid-cols-2 not-prose">
          {c.attackVectors.map((a) => (
            <div
              key={a.name}
              className="glass rounded-lg p-4 border-neon-red/15"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-medium text-slate-100 text-sm">
                  {a.name}
                </span>
                <Badge color={severityColor(a.severity)}>{a.severity}</Badge>
              </div>
              <p className="text-sm text-slate-400">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={ShieldCheck} title="Defense Methods">
        <ul className="not-prose flex flex-col gap-2">
          {c.defenseMethods.map((d, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-300"
            >
              <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-neon-green" />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      {c.configExamples.length > 0 && (
        <Section icon={Wrench} title="Configuration Examples" accent="#0088ff">
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

      {c.cliExamples.length > 0 && (
        <Section icon={Terminal} title="CLI Examples">
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

      <Section icon={Search} title="Wireshark Analysis" accent="#0088ff">
        <p>{c.wiresharkAnalysis}</p>
      </Section>

      <Section icon={XOctagon} title="Common Mistakes" accent="#ff0066">
        <ul className="not-prose flex flex-col gap-2">
          {c.commonMistakes.map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-300"
            >
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
              {m}
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={Sparkles} title="Advanced Concepts" accent="#8800ff">
        <p>{c.advancedConcepts}</p>
      </Section>

      <Section icon={GraduationCap} title="Summary">
        <div className="glass rounded-lg p-4 border-neon-green/25 not-prose">
          <p className="text-sm text-slate-300 leading-relaxed">{c.summary}</p>
        </div>
      </Section>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Lightbulb className="h-4 w-4 text-amber-400" />
        Complete the lesson exam below to unlock the next lesson and earn XP.
      </div>
    </article>
  );
}
