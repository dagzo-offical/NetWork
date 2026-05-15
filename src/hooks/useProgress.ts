"use client";

import { useCallback, useEffect, useState } from "react";
import type { ExamAttempt, TestAttempt, UserProgress } from "@/lib/types";
import { ACHIEVEMENTS, PROGRESS_STORAGE_KEY, XP_PER_EXAM, XP_PER_LESSON } from "@/lib/constants";
import { getTodayString, daysBetween } from "@/lib/utils";
import { COURSE_SECTIONS, getSection } from "@/lib/course-data";

const EMPTY_PROGRESS: UserProgress = {
  completedLessons: [],
  testResults: {},
  sectionExams: {},
  xp: 0,
  streak: 0,
  lastStudyDate: "",
  achievements: [],
};

function load(): UserProgress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    return { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as UserProgress) };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function save(p: UserProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(p));
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(EMPTY_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(load());
    setLoaded(true);
  }, []);

  const update = useCallback((updater: (p: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      save(next);
      return next;
    });
  }, []);

  const recomputeAchievements = useCallback((p: UserProgress): string[] => {
    const earned = new Set(p.achievements);
    if (p.completedLessons.length >= 1) earned.add("first-lesson");
    if (p.xp >= 1000) earned.add("xp-1000");
    if (p.streak >= 7) earned.add("streak-7");
    const s1 = getSection("network-fundamentals");
    if (s1 && s1.lessons.every((l) => p.completedLessons.includes(l.id)))
      earned.add("section-1-done");
    const allDone = COURSE_SECTIONS.every((sec) =>
      sec.lessons.every((l) => p.completedLessons.includes(l.id))
    );
    if (allDone) earned.add("all-sections");
    for (const exams of Object.values(p.sectionExams)) {
      if (exams.some((e) => e.score >= 95)) earned.add("exam-ace");
    }
    return Array.from(earned);
  }, []);

  const touchStreak = useCallback((p: UserProgress): UserProgress => {
    const today = getTodayString();
    if (p.lastStudyDate === today) return p;
    let streak = p.streak;
    if (!p.lastStudyDate) streak = 1;
    else {
      const gap = daysBetween(p.lastStudyDate, today);
      streak = gap === 1 ? p.streak + 1 : 1;
    }
    return { ...p, streak, lastStudyDate: today };
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, attempt: TestAttempt) => {
      update((prev) => {
        let next: UserProgress = { ...prev };
        next = touchStreak(next);
        const attempts = [...(next.testResults[lessonId] ?? []), attempt];
        next.testResults = { ...next.testResults, [lessonId]: attempts };
        if (attempt.passed && !next.completedLessons.includes(lessonId)) {
          next.completedLessons = [...next.completedLessons, lessonId];
          next.xp = next.xp + XP_PER_LESSON;
        }
        next.achievements = recomputeAchievements(next);
        return next;
      });
    },
    [update, touchStreak, recomputeAchievements]
  );

  const recordExam = useCallback(
    (attempt: ExamAttempt) => {
      update((prev) => {
        let next: UserProgress = { ...prev };
        next = touchStreak(next);
        const attempts = [...(next.sectionExams[attempt.sectionId] ?? []), attempt];
        next.sectionExams = { ...next.sectionExams, [attempt.sectionId]: attempts };
        if (attempt.passed) {
          const alreadyPassed = (prev.sectionExams[attempt.sectionId] ?? []).some(
            (e) => e.passed
          );
          if (!alreadyPassed) next.xp = next.xp + XP_PER_EXAM;
        }
        next.achievements = recomputeAchievements(next);
        return next;
      });
    },
    [update, touchStreak, recomputeAchievements]
  );

  const resetProgress = useCallback(() => {
    update(() => ({ ...EMPTY_PROGRESS }));
  }, [update]);

  const isLessonComplete = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  const isSectionExamPassed = useCallback(
    (sectionId: string) =>
      (progress.sectionExams[sectionId] ?? []).some((e) => e.passed),
    [progress.sectionExams]
  );

  /** A lesson is unlocked if it is the first overall, or its predecessor is done. */
  const isLessonUnlocked = useCallback(
    (sectionId: string, lessonId: string) => {
      const all = COURSE_SECTIONS.flatMap((s) => s.lessons);
      const idx = all.findIndex(
        (l) => l.sectionId === sectionId && l.id === lessonId
      );
      if (idx <= 0) return true;
      return progress.completedLessons.includes(all[idx - 1].id);
    },
    [progress.completedLessons]
  );

  /** A section is unlocked if it is the first, or the previous section is fully complete. */
  const isSectionUnlocked = useCallback(
    (sectionId: string) => {
      const idx = COURSE_SECTIONS.findIndex((s) => s.id === sectionId);
      if (idx <= 0) return true;
      const prev = COURSE_SECTIONS[idx - 1];
      return prev.lessons.every((l) => progress.completedLessons.includes(l.id));
    },
    [progress.completedLessons]
  );

  const sectionProgress = useCallback(
    (sectionId: string) => {
      const sec = getSection(sectionId);
      if (!sec) return { done: 0, total: 0, percent: 0 };
      const done = sec.lessons.filter((l) =>
        progress.completedLessons.includes(l.id)
      ).length;
      return {
        done,
        total: sec.lessons.length,
        percent: Math.round((done / sec.lessons.length) * 100),
      };
    },
    [progress.completedLessons]
  );

  return {
    progress,
    loaded,
    completeLesson,
    recordExam,
    resetProgress,
    isLessonComplete,
    isLessonUnlocked,
    isSectionUnlocked,
    isSectionExamPassed,
    sectionProgress,
    achievementDefs: ACHIEVEMENTS,
  };
}
