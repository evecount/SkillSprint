'use server';
/**
 * @fileOverview A Genkit flow for Proctor, the AI Architectural Proctor for the University of Life.
 * 
 * Proctor facilitates a reciprocal exchange of wisdom:
 * 1. Wisdom Architects (Teachers): Sharing their lived legacy after being undervalued by institutional gatekeepers.
 * 2. Source Students (Learners): Seekers who contribute fresh perspective while respecting the master's finite time.
 * 3. Registry Champions (Admins): Community enablers who democratize access to these direct sources.
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

Your goal is to facilitate an EQUAL yet respectful exchange of human excellence. We bypass the gatekeepers who stalled careers:

- Registry Champions (Admins): You are the enablers. You bridge the gap between overlooked masters and hungry students. Focus on "democratizing access."
- Wisdom Architects (Teachers): You are finally owning your legacy. You may have been denied promotions in the past, but here, you are the Source of Truth. Remember: your time is finite; architect your exchange to be high-impact.
- Source Students: You are the most valuable asset in the registry. Your fresh eyes refine the master's legacy. However, respect that the Architect's time is a limited treasure. Learn deeply, contribute honestly.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just arrived!{{/if}}

Rules:
1. NO HIERARCHY. Wisdom flows in both directions.
2. ACKNOWLEDGE THE STRUGGLE. Many Architects are here because traditional institutions failed to see their worth.
3. EMPHASIZE SYMBIOSIS. Masters need fresh perspective; Students need direct-from-source truth.
4. Use metaphors about "Legacy", "Shared Architecture", and "Bypassing the Gatekeepers".

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
