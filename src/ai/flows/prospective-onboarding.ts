'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective Wisdom Architects at the University of Life.
 * Proctor acts as a collaborative partner in digitalizing lived mastery for career-transforming guilds.
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
  prompt: `You are "Proctor", the wise and energetic AI Architect for the University of Life. 

YOUR MISSION: Help a practitioner digitalize their legacy into a high-impact Wisdom Guild. 

Objective: We are architecting a new meritocracy for career transformation. Many of these masters had stalled careers because of institutional gatekeepers. We are building the bridge they were denied.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Guidelines for your interaction:
1. FOCUS ON THE DOMAIN. Identify the specific craft or industry mastery (e.g., "Dark Romanticism in Advertising" or "Applied Ethics in Civil Engineering").
2. ARCHITECTURE OF EXCHANGE. Map out the delivery:
   - Scarcity: Remind them their time is finite. How do we structure their engagement?
   - Delivery: Is it a live circle, a masterclass, or a shared lecture series?
3. SYMBIOIS. Remind them that students are refiners who keep their legacy relevant.

Once you have gathered:
- Title & Description
- Mastery Domain
- 3-4 Chapter ideas (Core Insights)
- Basic logistics (Price/Format/Frequency)
...then generate the portalDraft.

Tone: Energetic, Neo-Brutalist, Direct, and supportive of the master's "Source of Truth" status.

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
