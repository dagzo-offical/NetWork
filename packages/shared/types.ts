export type UUID = string;

export interface AiEvaluationResult {
  score: number;
  passed: boolean;
  strengths: string[];
  weaknesses: string[];
  feedback: string;
}

export interface Question {
  id: UUID;
  prompt: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
}

export interface LessonGatePolicy {
  miniExamQuestionCount: 3;
  miniExamPassScore: 70;
  cooldownMinutesOnFail: 30;
}

export interface FinalExamPolicy {
  questionCount: 20;
  passScore: 85;
  timeLimitMinutes: 120;
}
