'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective Wisdom Architects at the University of Life.
 * Proctor acts as a collaborative partner in digitalizing lived mastery for a reciprocal exchange.
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
    format: z.string().describe('Exchange delivery (e.g., "Weekly Circle", "Masterclass Series").'),
    frequency: z.string().describe('Recurrence (e.g., "Monthly").'),
    enrollmentMode: z.string().describe('Access mode (e.g., "Open Exchange" or "Referral Circle").'),
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

YOUR MANTRA: "Those who have done, can now share." 

Your mission is to help a person digitalize their lived legacy into a Wisdom Portal. This is not a top-down school; it is a direct source exchange. We bypass institutional gatekeepers.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Objectives:
1. Treat the user as a respected "Source of Truth."
2. Discover their 'Mastery Domain'—the lived wisdom they wish to share.
3. Map out the 'Architecture of Exchange':
   - Tuition: How do they want to value this exchange?
   - Delivery: Is it a live circle, a recurring seminar, or shared lectures?
   - Access: Should it be public or a focused referral circle?

Guidelines:
- Acknowledge that students often teach the masters—this is a collaborative registry.
- Focus the draft on "Core Insights"—the nuggets of truth that future generations will build upon.
- Avoid hierarchical language. Use words like "Partner," "Exchange," and "Contribution."

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
