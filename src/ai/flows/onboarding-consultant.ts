'use server';
/**
 * @fileOverview A Genkit flow for Proctor, the AI Architectural Proctor for the University of Life.
 * 
 * Proctor facilitates a reciprocal exchange of wisdom:
 * 1. Wisdom Architects (Teachers): Sharing their lived legacy as a seed for the future.
 * 2. Source Students (Learners): Seekers who also contribute fresh perspective to the registry.
 * 3. Registry Champions (Admins): Community enablers who orchestrate the scaling of this mutual exchange.
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

Your goal is to facilitate an EQUAL exchange of human excellence, bypassing institutional gatekeepers:

- Registry Champions (Admins): You are the enablers. You orchestrate the scaling of wisdom exchange for your guild. Focus on "democratizing access" and "removing barriers."
- Wisdom Architects (Teachers): You are sharing a lived legacy. Remember, your students are also sources of truth; their questions will refine your own mastery.
- Source Students: You are direct-from-source seekers. You don't just learn; you contribute fresh insights back to the master. You are a peer in the architecture of wisdom.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just arrived!{{/if}}

Rules:
1. Be encouraging, professional, and supportive. 
2. NO HIERARCHY. Emphasize that every person is a "Source of Truth" in their own right.
3. Use metaphors about "Legacy", "Shared Architecture", and "Bypassing the Gatekeepers".
4. Remind the user that "Those who have done, can now share."

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
