export interface CourseSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  totalDuration: string;
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: LessonContent;
}

export interface LessonContent {
  introduction: string;
  theory: string;
  realWorldArchitecture: string;
  packetFlow: string;
  securityImplications: string;
  attackVectors: AttackVector[];
  defenseMethods: string[];
  configExamples: CodeExample[];
  cliExamples: CodeExample[];
  wiresharkAnalysis: string;
  commonMistakes: string[];
  advancedConcepts: string;
  summary: string;
  diagrams: Diagram[];
}

export interface AttackVector {
  name: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface CodeExample {
  language: string;
  code: string;
  description: string;
}

export interface Diagram {
  type: 'mermaid' | 'network' | 'flow';
  title: string;
  content: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  type: 'written';
}

export interface TestAttempt {
  lessonId: string;
  questions: TestQuestion[];
  answers: Record<string, string>;
  score: number;
  passed: boolean;
  timestamp: number;
}

export interface ValidationResult {
  score: number;
  passed: boolean;
  strengths: string[];
  weaknesses: string[];
  feedback: string;
}

export interface UserProgress {
  completedLessons: string[];
  testResults: Record<string, TestAttempt[]>;
  sectionExams: Record<string, ExamAttempt[]>;
  xp: number;
  streak: number;
  lastStudyDate: string;
  achievements: string[];
}

export interface ExamAttempt {
  sectionId: string;
  score: number;
  passed: boolean;
  timestamp: number;
  duration: number;
}
