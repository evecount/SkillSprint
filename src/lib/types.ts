
export interface Organization {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  orgId: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  content: string; // Text content
  videoUrl?: string;
  quiz?: Quiz;
  order: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Learner {
  id: string;
  orgId: string;
  name: string;
  email: string;
  avatar?: string;
  totalXP: number;
  streak: number;
  lastActive: string;
}

export interface ProgressLog {
  id: string;
  learnerId: string;
  moduleId: string;
  courseId: string;
  status: 'completed' | 'in_progress';
  completedAt?: string;
  score?: number; // Quiz score
  xpEarned: number;
}
