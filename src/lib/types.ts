
export type UserRole = 'admin' | 'teacher' | 'learner';

export interface UserProfile {
  id: string;
  orgId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  livedMasteryYears?: number;
  masteryDomain?: string;
  totalXP?: number;
  streak?: number;
  lastActive?: string;
  bio?: string;
  interests?: string[];
  goals?: string[];
  isPublic?: boolean;
}

export interface Course {
  id: string;
  orgId: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  authorId: string;
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  videoUrl?: string;
  quiz?: Quiz;
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

export interface Organization {
  id: string;
  name: string;
}

export interface Learner extends UserProfile {
  role: 'learner';
  totalXP: number;
  streak: number;
  lastActive: string;
}
