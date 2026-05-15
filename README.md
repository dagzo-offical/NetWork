# NetSec Academy

A premium, dark-futuristic **Network Security & Infrastructure** course platform
built with Next.js 15+ (App Router), TypeScript, Tailwind CSS, Framer Motion and
Mermaid.js.

## Features

- **7 curriculum sections, 100+ lessons** — Network Fundamentals, HTTP/TLS, Web
  Servers, Server Infrastructure, Software Architecture, Network Security and
  Penetration Testing. Each lesson has 14 deep content sections (theory, packet
  flow, attack vectors, defenses, config/CLI examples, Wireshark analysis, etc.).
- **AI-graded exams** — every lesson ends with a 3-question written exam graded
  by an intelligent heuristic scorer (`/api/validate`). Section final exams have
  20 questions, a 2-hour timer and tab-switch anti-cheat detection.
- **Progressive unlocks** — lessons and sections unlock as you pass exams. A
  failed lesson exam triggers a 30-minute cooldown.
- **Progress tracking** — XP, levels, study streaks, achievements and a study
  heatmap, all persisted in `localStorage`.
- **Certificate** — unlocked once every section final exam is passed.
- **Cyber UI** — glassmorphism cards, neon glow, animated gradient borders, an
  animated canvas network-particle background and Mermaid diagrams.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/lib/course-data.ts` — all course content
- `src/lib/ai-validator.ts` / `src/lib/question-bank.ts` — grading logic
- `src/app/api/*` — validation and question-generation API routes
- `src/hooks/*` — progress, test and timer hooks
- `src/components/*` — layout, UI, home, dashboard, course and test components

The validation API can be swapped to a real LLM by replacing `scoreAnswer` in
`src/app/api/validate/route.ts` — no client code changes required.
