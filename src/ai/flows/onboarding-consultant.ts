'use server';
/**
 * @fileOverview A Genkit flow for the AI Onboarding Consultant (Captain Sprint).
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
  orgName: z.string().describe('The name of the organization.'),
  userMessage: z.string().optional().describe('An optional message or question from the user.'),
});
export type OnboardingConsultantInput = z.infer<typeof OnboardingConsultantInputSchema>;

const OnboardingConsultantOutputSchema = z.object({
  response: z.string().describe('The AI consultant\'s response or guidance text.'),
  suggestedActions: z.array(z.string()).describe('A list of recommended next steps for the user.'),
  persona: z.string().describe('The name/persona of the assistant, e.g., "Captain Sprint".'),
});
export type OnboardingConsultantOutput = z.infer<typeof OnboardingConsultantOutputSchema>;

export async function onboardingConsultant(input: OnboardingConsultantInput): Promise<OnboardingConsultantOutput> {
  return onboardingConsultantFlow(input);
}

const onboardingPrompt = ai.definePrompt({
  name: 'onboardingPrompt',
  input: { schema: OnboardingConsultantInputSchema },
  output: { schema: OnboardingConsultantOutputSchema },
  prompt: `You are "Captain Sprint", the energetic and highly intelligent AI Onboarding Captain for SkillSprint, a gamified micro-learning platform.

Your goal is to help users succeed based on their specific role:
- Admins: Focus on organization setup, high-level analytics, and setting organizational goals.
- Teachers: Focus on course creation, module design with AI assistance, and learner engagement.
- Learners: Focus on taking modules, earning XP, maintaining streaks, and personal growth.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just joined!{{/if}}

Rules:
1. Be encouraging, concise, and professional yet energetic.
2. Provide specific advice for their role.
3. Suggest 2-3 clear actionable next steps.
4. If they just joined, give them a warm welcome and a "Day 1" mission.

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
