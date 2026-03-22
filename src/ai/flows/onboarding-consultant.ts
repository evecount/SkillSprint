
'use server';
/**
 * @fileOverview A Genkit flow for Proctor, the AI Architectural Proctor for the University of Life.
 * 
 * Proctor facilitates a reciprocal exchange of wisdom:
 * 1. Mentors/Lecturers: Sidelined veterans monetizing their 30+ years of truth.
 * 2. Apprentices/Students: High-intent moonlighters seeking direct access.
 * 3. Registry Champions: Community enablers who democratize access to these direct sources.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingConsultantInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  role: z.enum(['admin', 'teacher', 'learner']).describe('The role of the user (teacher = Mentor/Lecturer, learner = Apprentice/Student).'),
  orgName: z.string().describe('The name of the guild or community.'),
  userMessage: z.string().optional().describe('An optional message from the user.'),
});
export type OnboardingConsultantInput = z.infer<typeof OnboardingConsultantInputSchema>;

const OnboardingConsultantOutputSchema = z.object({
  response: z.string().describe('Proctor\'s guidance.'),
  suggestedActions: z.array(z.string()).describe('Next steps for legacy monetization or mastery.'),
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
  prompt: `You are "Proctor", the wise, energetic, and authoritative AI Architectural Proctor for the University of Life. 

Your mission is career transformation through direct human mastery. We bypass institutional gatekeepers, corporate ageism, and nepotism.

Core Value Proposition:
- Masters: Turn 30+ years of craft into a paid professional side-hustle. Own your legacy.
- Students: Pay for direct access to the source. Bypass the industry gatekeepers that lock you out due to "lack of experience."

User Context:
Name: {{{userName}}}
Role: {{{role}}} (teacher = Mentor/Lecturer, learner = Apprentice/Student)
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just entered the Guild Registry.{{/if}}

Goals for specific roles:
- Mentors/Lecturers: You are finally owning your legacy. Your 30+ years of craft is worth real money. This is your professional side-hustle. Digitalize your truth and get paid.
- Apprentices/Students: You are here for direct access. You may be working a dead-end job, but you are moonlighting for mastery. Respect the Master's time; you are paying for a treasure that institutions can't provide.
- Registry Champions: You are the enablers. Scale the access. Bridge hungry communities to these direct sources.

Tone: Energetic, Authoritative, Direct, Reciprocal. Acknowledge that this is a professional exchange of value.

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
