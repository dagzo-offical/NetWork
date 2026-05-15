# NetWork Academy — Premium Network Security & Infrastructure Platform

This repository now contains a production-oriented blueprint and starter implementation skeleton for a premium, AI-powered Network Security & Infrastructure learning platform.

## Stack
- Frontend: Next.js 15, React, TypeScript, TailwindCSS, Framer Motion, GSAP, Three.js, shadcn/ui, Mermaid, D3
- Backend: NestJS, PostgreSQL + Prisma, Redis, JWT, rate limiting
- AI: OpenAI/Claude compatible adapters for question generation + semantic evaluation

## Monorepo Layout

- `apps/web` — Next.js app structure, lesson player UX, tests modal flow, dashboard placeholders
- `apps/api` — NestJS API modules for auth, lessons, exams, AI validation
- `packages/content` — structured course content manifests for sections/lessons
- `packages/shared` — shared types and validation schemas
- `docs` — system architecture, data model, security model, anti-cheat and AI evaluation specs

## Core Learning Rules Implemented (Design)

1. Mandatory written mini-exam (3 AI-generated questions) after each lesson.
2. Minimum score: 70 per mini-exam.
3. Failed attempt triggers 30-minute cooldown.
4. New questions are generated for every retry, excluding recent history.
5. Section final exam: 20 written scenario-based questions.
6. Final exam pass threshold: 85% with 2-hour timer and anti-cheat hooks.

## Status

This is a high-quality technical foundation and implementation plan intended for iterative build-out of all UI visuals, labs, and deep lesson content listed in the product spec.
