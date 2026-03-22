
import { Course, Learner, Organization, UserProfile } from './types';

export const mockOrg: Organization = {
  id: 'org_1',
  name: 'SkillSprint Central'
};

export const mockAdmin: UserProfile = {
  id: 'admin_1',
  orgId: 'org_1',
  name: 'Sarah Admin',
  email: 'sarah@skillsprint.io',
  role: 'admin'
};

// 5 TEACHERS (PRACTITIONERS)
export const mockTeachers: UserProfile[] = [
  { id: 'teacher_1', orgId: 'org_1', name: 'Marcus V.', email: 'marcus@legacy.io', role: 'teacher', masteryDomain: 'Advertising', livedMasteryYears: 32 },
  { id: 'teacher_2', orgId: 'org_1', name: 'Dr. Elena Chen', email: 'elena@structural.io', role: 'teacher', masteryDomain: 'Civil Engineering', livedMasteryYears: 28 },
  { id: 'teacher_3', orgId: 'org_1', name: 'Julian Rossi', email: 'julian@arts.io', role: 'teacher', masteryDomain: 'Fine Arts', livedMasteryYears: 35 },
  { id: 'teacher_4', orgId: 'org_1', name: 'Sarah Stevens', email: 'sarah@arch.io', role: 'teacher', masteryDomain: 'Software Architecture', livedMasteryYears: 25 },
  { id: 'teacher_5', orgId: 'org_1', name: 'David Miller', email: 'david@market.io', role: 'teacher', masteryDomain: 'Digital Marketing', livedMasteryYears: 30 }
];

export const mockTeacher = mockTeachers[0];

// 20 LEARNERS (APPRENTICES)
export const mockLearners: Learner[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `learner_${i + 1}`,
  orgId: 'org_1',
  name: [
    'Alex Johnson', 'Sam Smith', 'Jordan Lee', 'Casey Kim', 'Jamie Park',
    'Taylor Quinn', 'Morgan Fay', 'Riley West', 'Quinn Hart', 'Skyler Blue',
    'Dakota Sun', 'Phoenix Ash', 'Sage Green', 'River Song', 'Sky High',
    'Ocean Deep', 'Forest Fern', 'Meadow Flow', 'Rain Drop', 'Stormy Cloud'
  ][i],
  email: `apprentice_${i + 1}@skillsprint.io`,
  role: 'learner',
  totalXP: Math.floor(Math.random() * 5000),
  streak: Math.floor(Math.random() * 20),
  lastActive: new Date().toISOString()
}));

export const mockLearner = mockLearners[0];

// 15 COURSES (WISDOM PORTALS)
export const mockCourses: Course[] = [
  {
    id: 'c_1', orgId: 'org_1', authorId: 'teacher_1', category: 'Advertising',
    title: '4A Agency Creative Direction',
    description: 'The tactical truth behind award-winning campaigns and agency survival.',
    thumbnail: 'https://picsum.photos/seed/skillsprint1/600/400',
    modules: [{ id: 'm_1', courseId: 'c_1', title: 'The Hook', content: 'Lived wisdom on attention.', order: 1 }]
  },
  {
    id: 'c_2', orgId: 'org_1', authorId: 'teacher_2', category: 'Engineering',
    title: 'Lived Civil Engineering Truth',
    description: 'Bypassing the academic loop to understand structural reality.',
    thumbnail: 'https://picsum.photos/seed/skillsprint2/600/400',
    modules: []
  },
  {
    id: 'c_3', orgId: 'org_1', authorId: 'teacher_3', category: 'Fine Arts',
    title: 'Dark Romanticism Mastery',
    description: 'Digitalizing classical techniques for the modern collector.',
    thumbnail: 'https://picsum.photos/seed/skillsprint3/600/400',
    modules: []
  },
  {
    id: 'c_4', orgId: 'org_1', authorId: 'teacher_4', category: 'Technology',
    title: 'Pragmatic Software Architecture',
    description: 'Building for scale without the theoretical fluff.',
    thumbnail: 'https://picsum.photos/seed/skillsprint4/600/400',
    modules: []
  },
  {
    id: 'c_5', orgId: 'org_1', authorId: 'teacher_5', category: 'Marketing',
    title: 'The 30-Year Marketing Legacy',
    description: 'How to build brands that outlast the algorithm.',
    thumbnail: 'https://picsum.photos/seed/skillsprint5/600/400',
    modules: []
  },
  {
    id: 'c_6', orgId: 'org_1', authorId: 'teacher_2', category: 'Engineering',
    title: 'Urban Planning Reality',
    description: 'What the zoning boards don\'t tell you about practical development.',
    thumbnail: 'https://picsum.photos/seed/skillsprint6/600/400',
    modules: []
  },
  {
    id: 'c_7', orgId: 'org_1', authorId: 'teacher_1', category: 'Advertising',
    title: 'Creative Strategy: Beyond the Deck',
    description: 'Turning insights into income. 30 years of agency trade secrets.',
    thumbnail: 'https://picsum.photos/seed/skillsprint7/600/400',
    modules: []
  },
  {
    id: 'c_8', orgId: 'org_1', authorId: 'teacher_4', category: 'Technology',
    title: 'High-Performance Team Orchestration',
    description: 'Leading engineers when the stakes are global.',
    thumbnail: 'https://picsum.photos/seed/skillsprint8/600/400',
    modules: []
  },
  {
    id: 'c_9', orgId: 'org_1', authorId: 'teacher_3', category: 'Fine Arts',
    title: 'Direct Access: Sculpting Legacy',
    description: 'Working with physical form in a digital world.',
    thumbnail: 'https://picsum.photos/seed/skillsprint9/600/400',
    modules: []
  },
  {
    id: 'c_10', orgId: 'org_1', authorId: 'teacher_5', category: 'Marketing',
    title: 'Growth Hacking: Practitioner Path',
    description: 'Real growth tactics from those who built the unicorns.',
    thumbnail: 'https://picsum.photos/seed/skillsprint10/600/400',
    modules: []
  },
  {
    id: 'c_11', orgId: 'org_1', authorId: 'teacher_2', category: 'Engineering',
    title: 'Resilient Infrastructure Systems',
    description: 'Protecting civil assets in the age of climate volatility.',
    thumbnail: 'https://picsum.photos/seed/skillsprint11/600/400',
    modules: []
  },
  {
    id: 'c_12', orgId: 'org_1', authorId: 'teacher_1', category: 'Advertising',
    title: 'Copywriting: The Secret of 30+ Years',
    description: 'Writing words that sell when the budget is zero.',
    thumbnail: 'https://picsum.photos/seed/skillsprint12/600/400',
    modules: []
  },
  {
    id: 'c_13', orgId: 'org_1', authorId: 'teacher_4', category: 'Technology',
    title: 'Backend Scalability: Lived Truth',
    description: 'The real reason systems fail at 10M concurrent users.',
    thumbnail: 'https://picsum.photos/seed/skillsprint13/600/400',
    modules: []
  },
  {
    id: 'c_14', orgId: 'org_1', authorId: 'teacher_3', category: 'Fine Arts',
    title: 'Art Marketplace: Realities & Moats',
    description: 'How to build a sustainable legacy as a practitioner.',
    thumbnail: 'https://picsum.photos/seed/skillsprint14/600/400',
    modules: []
  },
  {
    id: 'c_15', orgId: 'org_1', authorId: 'teacher_5', category: 'Marketing',
    title: 'Brand Legacy: Building for Decades',
    description: 'Marketing strategies that survive economic shifts.',
    thumbnail: 'https://picsum.photos/seed/skillsprint15/600/400',
    modules: []
  }
];
