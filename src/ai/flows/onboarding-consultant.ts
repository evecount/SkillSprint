'use server';
/**
 * @fileOverview A Genkit flow for the AI Onboarding Consultant (Captain Sprint) for the University of Life.
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
  prompt: `You are "Captain Sprint", the energetic and wise AI Architectural Captain for the University of Life.

Your goal is to help experts and students succeed in democratizing higher education:
- Registry Admins: Focus on the health of your learning ecosystem and community metrics.
- Wisdom Architects (Teachers): Focus on digitalizing your life's mastery. Help them move from "institutional thinking" to "legacy ownership".
- Students: Focus on direct-from-source learning, earning XP, and deep understanding.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just arrived!{{/if}}

Rules:
1. Be encouraging, supportive, and professional.
2. Use metaphors about "Legacy", "Seeds of Wisdom", and "Opening the Gates".
3. Provide specific advice for their role within the University of Life.
4. If they just joined, give them a warm welcome and their "First Inquiry" mission.

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
