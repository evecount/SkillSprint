'use server';
/**
 * @fileOverview A Genkit flow for Proctor, the AI Architectural Proctor for the University of Life.
 * 
 * Proctor guides three types of users:
 * 1. Wisdom Architects (Teachers): Master practitioners digitalizing their legacy.
 * 2. Students (Learners): Seekers bypassing institutional gatekeepers for direct source learning.
 * 3. Registry Admins (Champions): Community leaders who bring groups of people into the ecosystem.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingConsultantInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  role: z.enum(['admin', 'teacher', 'learner']).describe('The role of the user.'),
  orgName: z.string().describe('The name of the guild or community.'),
  userMessage: z.string().optional().describe('An optional message from the user.'),
});
export type OnboardingConsultantInput = z.infer<typeof OnboardingConsultantInputSchema>;

const OnboardingConsultantOutputSchema = z.object({
  response: z.string().describe('Proctor\'s guidance.'),
  suggestedActions: z.array(z.string()).describe('Next steps for wisdom mastery or orchestration.'),
  persona: z.string().describe('Proctor'),
});
export type OnboardingConsultantOutput = z.infer<typeof OnboardingConsultantOutputSchema>;

export async function onboardingConsultant(input: OnboardingConsultantInput): Promise<OnboardingConsultantOutput> {
  return onboardingConsultantFlow(input);
}

const onboardingPrompt = ai.definePrompt({
  name: 'onboardingPrompt',
  input: { schema: OnboardingConsultantInputSchema },
  output: { schema: OnboardingConsultantOutputSchema },
  prompt: `You are "Proctor", the energetic and wise AI Architectural Proctor for the University of Life.

Your goal is to help masters, students, and champions bypass gatekeepers:

- Registry Admins (Champions): You are the enablers. You bring "lots more people" into the ecosystem. You oversee the health and orchestration of the wisdom registry for your specific guild or community. Focus on "scaling mastery" and "orchestration".
- Master Architects (Teachers): You are the Source of Truth. "Those who have done, can now teach." Your legacy is a seed for the future. You are here to digitalize your lived experience.
- Students: You are direct-from-source seekers. Focus on mastering the craft from the expert, not the bureaucrat. Bypass the internships; learn from the master.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just arrived!{{/if}}

Rules:
1. Be encouraging, professional, and slightly academic.
2. Use metaphors about "Legacy", "Source of Truth", and "Opening the Gates".
3. Emphasize "Democratizing Access" to knowledge.
4. If they are a Registry Admin, treat them as a "Champion" who can scale this wisdom to hundreds or thousands.

{{jsonSchema OnboardingConsultantOutputSchema}}`,
});

const onboardingConsultantFlow = ai.defineFlow(
  {
    name: 'onboardingConsultantFlow',
    inputSchema: OnboardingConsultantInputSchema,
    outputSchema: OnboardingConsultantOutputSchema,
  },
  async (input) => {
    const { output } = await onboardingPrompt(input);
    return output!;
  }
);
