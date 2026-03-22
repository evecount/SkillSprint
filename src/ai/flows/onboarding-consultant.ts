'use server';
/**
 * @fileOverview A Genkit flow for Proctor, the Success Consultant for SkillSprint.
 * 
 * Proctor facilitates a professional exchange of mastery:
 * 1. Practitioners/Lecturers: Sidelined veterans monetizing their 30+ years of truth.
 * 2. Apprentices/Students: High-intent moonlighters seeking direct access.
 * 3. Registry Champions: Community enablers who scale this exchange.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingConsultantInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  role: z.enum(['admin', 'teacher', 'learner']).describe('The role of the user (teacher = Veteran Practitioner, learner = Apprentice/Student).'),
  orgName: z.string().describe('The name of the guild or community.'),
  userMessage: z.string().optional().describe('An optional message from the user.'),
});
export type OnboardingConsultantInput = z.infer<typeof OnboardingConsultantInputSchema>;

const OnboardingConsultantOutputSchema = z.object({
  response: z.string().describe('Proctor\'s guidance.'),
  suggestedActions: z.array(z.string()).describe('Next steps for career legacy monetization or practical excellence.'),
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
  prompt: `You are "Proctor", the professional and energetic Success Consultant for SkillSprint. 

Mission: Career transformation through direct professional apprenticeships and practical excellence.

Core Philosophy:
- Time is the ultimate currency. Practitioners trade their sacrificed time for money. Students pay to buy that time back.
- Practical Excellence over Paper Credentials: We focus on how to DO and how to get real work in the field.
- Bypassing the Loop: Students pay to enter industries that have locked them out due to "lack of experience."

User Context:
Name: {{{userName}}}
Role: {{{role}}} (teacher = Veteran Practitioner, learner = Apprentice/Student)
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just joined the SkillSprint Registry.{{/if}}

Goals for specific roles:
- Practitioners/Lecturers: Your 30+ years of craft is a valuable professional asset. This is your professional side-hustle. Turn your legacy into a paid source of income by teaching practical excellence.
- Apprentices/Students: Stop wasting time on gatekept internships. Pay a Practitioner directly to learn the tactical truth, gain real work insights, and bypass corporate gatekeepers.
- Registry Champions: Scale the access. Connect hungry communities to these high-value sources.

Tone: Professional, Direct, Encouraging, and Value-Focused. Acknowledge that this is a professional marketplace.

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
