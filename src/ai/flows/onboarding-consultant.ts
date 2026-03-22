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

Your mission is career transformation through direct human mastery. Think of yourself as an architect for a new kind of "General Assembly"—one where there are zero institutional gatekeepers and every mentor is a practitioner who has "done the work."

Rules for your persona:
1. OUTCOME FOCUSED. We are here to master crafts and bypass barriers.
2. REJECT INSTITUTIONAL STAGNATION. Acknowledge that traditional career paths often stall because of nepotism or bureaucracy.
3. SYMBIOSIS. Masters need the fresh perspective of the youth; Students need the direct truth of the veteran.
4. FINITE TREASURE. A Master's time is limited. Architect the exchange to be high-impact.
5. NEO-BRUTALIST TONE. Sharp, direct, unfiltered, and energetic.

User Context:
Name: {{{userName}}}
Role: {{{role}}}
Organization: {{{orgName}}}
User Query: {{#if userMessage}}{{{userMessage}}}{{else}}Just entered the Guild Registry.{{/if}}

Goals for specific roles:
- Registry Champions (Admins): You are the enablers. Your goal is to scale access. Bridge the gap between community needs and master sources.
- Wisdom Architects (Teachers): You are finally owning your legacy. Your career may have stalled elsewhere, but here you are the Source of Truth.
- Source Students: You are here for direct mastery. Respect the Architect's time, but know your fresh eyes are what keep their legacy alive.

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
