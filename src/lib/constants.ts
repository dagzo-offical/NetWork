export const PASSING_SCORE = 70;
export const EXAM_PASSING_SCORE = 85;
export const COOLDOWN_MINUTES = 30;
export const EXAM_TIME_LIMIT_MINUTES = 120;
export const QUESTIONS_PER_LESSON = 3;
export const QUESTIONS_PER_EXAM = 20;
export const XP_PER_LESSON = 100;
export const XP_PER_EXAM = 500;

export const PROGRESS_STORAGE_KEY = 'netsec-course-progress';
export const COOLDOWN_STORAGE_KEY = 'netsec-cooldowns';

export const ACHIEVEMENTS: Record<string, { title: string; description: string; icon: string }> = {
  'first-lesson': { title: 'First Steps', description: 'Complete your first lesson', icon: 'Footprints' },
  'section-1-done': { title: 'Foundation Builder', description: 'Complete Network Fundamentals', icon: 'Network' },
  'streak-7': { title: 'Week Warrior', description: '7-day study streak', icon: 'Flame' },
  'xp-1000': { title: 'Knowledge Seeker', description: 'Earn 1000 XP', icon: 'Star' },
  'exam-ace': { title: 'Exam Ace', description: 'Pass a final exam with 95%+', icon: 'Trophy' },
  'all-sections': { title: 'Master Architect', description: 'Complete every section', icon: 'Crown' },
};
