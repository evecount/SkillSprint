
import { Course, Learner, Organization, UserProfile } from './types';

export const mockOrg: Organization = {
  id: 'org_1',
  name: 'Global Tech Corp'
};

export const mockAdmin: UserProfile = {
  id: 'admin_1',
  orgId: 'org_1',
  name: 'Sarah Admin',
  email: 'sarah@example.com',
  role: 'admin'
};

export const mockTeacher: UserProfile = {
  id: 'teacher_1',
  orgId: 'org_1',
  name: 'Professor Spark',
  email: 'spark@example.com',
  role: 'teacher'
};

export const mockLearner: Learner = {
  id: 'learner_1',
  orgId: 'org_1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'learner',
  totalXP: 1250,
  streak: 5,
  lastActive: new Date().toISOString()
};

export const mockCourses: Course[] = [
  {
    id: 'c_1',
    orgId: 'org_1',
    title: 'Modern Leadership',
    description: 'Learn the fundamentals of leading remote teams effectively.',
    category: 'Management',
    thumbnail: 'https://picsum.photos/seed/skillsprint3/600/400',
    authorId: 'teacher_1',
    modules: [
      {
        id: 'm_1',
        courseId: 'c_1',
        title: 'Emotional Intelligence',
        content: 'Understand the role of empathy in modern leadership...',
        order: 1,
        videoUrl: 'https://example.com/video1'
      },
      {
        id: 'm_2',
        courseId: 'c_1',
        title: 'Communication Basics',
        content: 'Clear communication is the backbone of success.',
        order: 2,
        quiz: {
          id: 'q_1',
          questions: [
            {
              id: 'q1',
              text: 'What is the most important part of communication?',
              options: ['Talking', 'Listening', 'Writing', 'Presenting'],
              correctAnswerIndex: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 'c_2',
    orgId: 'org_1',
    title: 'Cybersecurity 101',
    description: 'Protect your digital assets with these simple steps.',
    category: 'IT & Security',
    thumbnail: 'https://picsum.photos/seed/skillsprint4/600/400',
    authorId: 'teacher_1',
    modules: []
  }
];
