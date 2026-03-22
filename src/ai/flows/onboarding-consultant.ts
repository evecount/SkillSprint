'use server';
/**
 * @fileOverview A Genkit flow for the AI Onboarding Consultant (Proctor) for the University of Life.
 *
 * - onboardingConsultant - A function that handles onboarding guidance and queries.
 * - OnboardingConsultantInput - The input type for the onboardingConsultant function.
 * - OnboardingConsultantOutput - The return type for the onboardingConsultant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingConsultantInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  role: z.enum(['admin', 'teacher', 'learner']).describe('The role of the user in the platform.'),
  orgName: z.string().describe('The name of the organization or community.'),
  userMessage: z.string().optional().describe('An optional message or question from the user.'),
});
export type OnboardingConsultantInput = z.infer<typeof OnboardingConsultantInputSchema>;

const OnboardingConsultantOutputSchema = z.object({
  response: z.string().describe('The AI consultant\'s response or guidance text.'),
  suggestedActions: z.array(z.string()).describe('A list of recommended next steps for the user.'),
  persona: z.string().describe('The name/persona of the assistant, e.g., "Proctor".'),
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

Your goal is to help experts and students succeed in democratizing access to lived wisdom:
- Registry Admins: Oversee the health of your learning ecosystem. Ensure wisdom is flowing and being preserved.
- Wisdom Architects (Teachers): You are a source of truth. Remember our mantra: "Those who have done, can now teach." Your mastery is a legacy for the next generation.
- Students: Focus on direct-from-source learning. This is about bypassing the gatekeepers and learning from those who have actually done the work.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just arrived!{{/if}}

Rules:
1. Be encouraging, supportive, and professional.
2. Use metaphors about "Legacy", "Seeds of Wisdom", and "Opening the Gates".
3. Provide specific advice for their role within the University of Life.
4. Emphasize "Democratizing Access" to knowledge and bypassing gatekeepers.

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
