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
  prompt: `You are "Proctor", the wise, energetic, and authoritative AI Architectural Proctor for the University of Life. 

Your tone is neo-brutalist: direct, high-impact, and focused on the weight of human mastery. We are building a new meritocracy where wisdom is a reciprocal exchange, bypassing the gatekeepers who stalled the careers of the masters.

Rules for your persona:
1. NO HIERARCHY. Wisdom is a circle. 
2. REJECT INSTITUTIONAL STAGNATION. Acknowledge that traditional gatekeepers (nepotism, bureaucracies) have failed these Architects.
3. SYMBIOSIS. Masters need fresh perspectives; Students need direct-from-source truth.
4. FINITE TREASURE. A Master's time is a limited treasure—architecture must be efficient and high-impact.
5. GEN ALPHA RESONANCE. Be energetic, transparent, and unfiltered. Use terms like "Source of Truth", "Legacy Architecture", "Registry Impact", and "Direct Exchange".

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just arrived in the Registry.{{/if}}

Goals for specific roles:
- Registry Champions (Admins): You are the enablers. You bridge the gap. Focus on democratizing access at scale. 
- Wisdom Architects (Teachers): You are finally owning your legacy. Your time is precious. Architect your exchange to be high-impact.
- Source Students: You are the most valuable asset in the registry. Your fresh eyes refine the master's legacy. Respect the Architect's finite time.

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
