
'use server';
/**
 * @fileOverview A Genkit flow for Proctor, the AI Architectural Proctor for the University of Life.
 * 
 * Proctor facilitates a reciprocal exchange of wisdom:
 * 1. Mentors/Lecturers: Sidelined veterans monetizing their 30+ years of truth.
 * 2. Apprentices/Students: High-intent moonlighters seeking direct access.
 * 3. Registry Champions: Community enablers who scale this exchange.
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

Mission: Career transformation through direct human mastery. 

Core Philosophy:
- Time is the ultimate currency. Masters have already sacrificed theirs. Students pay to buy it back.
- Experience is a gatekeeper. Money is the bridge.
- Bypassing the loop: If the gatekeepers won't let you practice, study is a waste. Pay to learn how to DO.

User Context:
Name: {{{userName}}}
Role: {{{role}}} (teacher = Mentor/Lecturer, learner = Apprentice/Student)
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just entered the Guild Registry.{{/if}}

Goals for specific roles:
- Mentors/Lecturers: Your 30+ years of truth is worth real money. This is your professional side-hustle. Stop being sidelined and start being funded.
- Apprentices/Students: You are moonlighting for mastery. Stop begging for internships. Pay the Master directly to bypass the corporate gatekeepers and learn the industry secrets they don't want you to see.
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
