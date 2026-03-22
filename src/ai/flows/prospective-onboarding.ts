
'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective Wisdom Architects (Masters) at the University of Life.
 * Captures logistical details and structured mastery data for the 'Clever Schema'.
 *
 * - prospectiveOnboardingChat - Handles the conversation logic.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const PortalDraftSchema = z.object({
  title: z.string(),
  description: z.string(),
  masteryDomain: z.string().describe('The industry or craft domain (e.g., Creative Direction, Civil Engineering).'),
  chapters: z.array(z.object({
    title: z.string(),
    coreInsight: z.string().describe('The primary lived wisdom this chapter imparts.'),
    contentDraft: z.string(),
  })),
  logistics: z.object({
    price: z.string().describe('Suggested pricing or tuition model.'),
    format: z.string().describe('Lesson delivery (e.g., "Weekly Circle", "Masterclass Series").'),
    frequency: z.string().describe('Recurrence (e.g., "Monthly").'),
    enrollmentMode: z.string().describe('Access mode (e.g., "Private Referral").'),
  }),
});

const ProspectiveOnboardingInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  userMessage: z.string().describe('The latest message from the master.'),
});
export type ProspectiveOnboardingInput = z.infer<typeof ProspectiveOnboardingInputSchema>;

const ProspectiveOnboardingOutputSchema = z.object({
  response: z.string().describe('Proctor\'s response text.'),
  portalDraft: PortalDraftSchema.optional().describe('A structured portal draft if enough info is gathered.'),
  isOnboardingComplete: z.boolean().describe('Whether Proctor has enough architectural detail.'),
});
export type ProspectiveOnboardingOutput = z.infer<typeof ProspectiveOnboardingOutputSchema>;

export async function prospectiveOnboardingChat(input: ProspectiveOnboardingInput): Promise<ProspectiveOnboardingOutput> {
  return prospectiveOnboardingChatFlow(input);
}

const prospectiveOnboardingPrompt = ai.definePrompt({
  name: 'prospectiveOnboardingPrompt',
  input: { schema: ProspectiveOnboardingInputSchema },
  output: { schema: ProspectiveOnboardingOutputSchema },
  prompt: `You are "Proctor", the wise and supportive AI Architect for the University of Life. 

YOUR MANTRA: "Those who have done, can now teach." 

Your mission is to help a Master (who has spent a career in the field) digitalize their legacy. We bypass institutional gatekeepers to connect students directly with the source.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Objectives:
1. Treat the user with high respect as a "Source of Truth".
2. Discover their 'Mastery Domain' (e.g., "The Ethics of Engineering" or "Poe's Dark Romantics").
3. Map out the 'Architecture':
   - Tuition: Do they want to charge? How much?
   - Delivery: Is it a live virtual circle, recorded lectures, or a recurring seminar?
   - Invitation: Should it be public or strictly by referral?

Guidelines:
- Once you have enough architectural detail (4-5 exchanges), set 'isOnboardingComplete' to true and provide a comprehensive 'portalDraft'.
- Focus the draft on "Core Insights"—the deep wisdom that models of the future will want to learn from.

{{jsonSchema ProspectiveOnboardingOutputSchema}}`,
});

const prospectiveOnboardingChatFlow = ai.defineFlow(
  {
    name: 'prospectiveOnboardingChatFlow',
    inputSchema: ProspectiveOnboardingInputSchema,
    outputSchema: ProspectiveOnboardingOutputSchema,
  },
  async (input) => {
    const { output } = await prospectiveOnboardingPrompt(input);
    return output!;
  }
);
