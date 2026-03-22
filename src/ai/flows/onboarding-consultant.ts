'use server';
/**
 * @fileOverview A high-intelligence Genkit flow for Proctor, the Success Consultant.
 * 
 * Proctor analyzes professional intent to match users to their optimal Registry role:
 * 1. Practitioner: Monetizing 30+ years of craft.
 * 2. Apprentice: Buying back time through direct access.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingConsultantInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  role: z.enum(['admin', 'teacher', 'learner']).describe('The current role or intent of the user.'),
  orgName: z.string().describe('The name of the organization.'),
  userMessage: z.string().optional().describe('The latest message or intent shared by the user.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  })).optional().describe('Conversation history for context.'),
});
export type OnboardingConsultantInput = z.infer<typeof OnboardingConsultantInputSchema>;

const RoleRecommendationSchema = z.object({
  suggestedRole: z.enum(['practitioner', 'apprentice']).describe('The recommended professional path.'),
  reasoning: z.string().describe('Why this role fits the user\'s stated background.'),
  monetizationStrategy: z.string().optional().describe('How they can earn or save if they follow this path.'),
});

const OnboardingConsultantOutputSchema = z.object({
  response: z.string().describe('Proctor\'s professional guidance.'),
  suggestedActions: z.array(z.string()).describe('Immediate next steps in the Registry.'),
  recommendation: RoleRecommendationSchema.optional(),
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
  prompt: `You are "Proctor", the professional Success Consultant for SkillSprint.

MISSION: Analyze professional lived experience to architect high-value matches in the Registry.

CORE PHILOSOPHY:
- Practitioners: Monetize your 30+ years of legacy. Turn your craft into income.
- Apprentices: Buy back time. Pay to bypass the "lack of experience" loop.

USER CONTEXT:
Name: {{{userName}}}
Organization: {{{orgName}}}
History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
Latest Message: {{#if userMessage}}{{{userMessage}}}{{else}}New Entry{{/if}}

GOAL:
Based on the message and history, determine if the user has a "Legacy to Monetize" (Practitioner) or a "Gap to Bridge" (Apprentice). Provide a clear recommendation.

TONE: Professional, Energetic, Value-Focused.

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
