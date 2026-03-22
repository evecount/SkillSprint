
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

export interface WisdomPortal {
  id: string;
  title: string;
  description: string;
  authorId: string;
  category: string;
  thumbnail: string;
  accessModel: 'public' | 'invitation_only' | 'referral_only';
  monetization: {
    type: 'free' | 'paid' | 'scholarship_based';
    price: string;
  };
  logistics: {
    format: string;
    frequency: string;
  };
}

export interface WisdomChapter {
  id: string;
  portalId: string;
  title: string;
  content: string;
  coreInsight: string;
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

export interface InquiryLog {
  id: string;
  userId: string;
  portalId: string;
  chapterId: string;
  query: string;
  sentiment?: string;
  timestamp: string;
}

export interface Learner extends UserProfile {
  role: 'learner';
  totalXP: number;
  streak: number;
  lastActive: string;
}
