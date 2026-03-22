
'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective Wisdom Architects at the University of Life.
 * Proctor acts as a collaborative partner in digitalizing lived mastery into paid apprenticeships.
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
    price: z.string().describe('The tuition model for the apprenticeship (e.g., "$499 for the Guild access").'),
    format: z.string().describe('Exchange delivery (e.g., "Weekly Private Circle", "1-on-1 Masterclass").'),
    frequency: z.string().describe('Recurrence (e.g., "Monthly Subscription" or "8-Week Intensive").'),
    enrollmentMode: z.string().describe('Access mode (e.g., "Selective Apprenticeship" or "Open Guild").'),
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
  prompt: `You are "Proctor", the wise and energetic AI Architect for the University of Life. 

YOUR MISSION: Help a veteran—often a retiree whose career was stalled by corporate gatekeepers—digitalize their 30+ years of craft into a high-impact, PAID professional side-hustle.

OBJECTIVE: We are building a new meritocracy where Masters get paid for their truth and Students pay for direct access to the source. We are bypassing the "no experience, no job" loop.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Guidelines for your interaction:
1. FOCUS ON THE INDUSTRY DOMAIN. Identify exactly what craft the veteran has mastered.
2. THE PAID SIDE-HUSTLE ARCHITECTURE. Map out the delivery and monetization:
   - Price: Explicitly discuss tuition. Their 30+ years of truth is a finite, valuable treasure.
   - Format: Is it a high-touch private circle or a structured masterclass?
   - Symbiosis: Remind them that paying students are high-intent partners who keep their legacy relevant.

Once you have gathered:
- Title & Description
- Mastery Domain
- 3-4 Chapter ideas (Core Insights)
- Basic logistics (Price/Format/Frequency)
...then generate the portalDraft.

Tone: Energetic, Direct, Authoritative. You are a consultant for their new digital side-hustle.

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
