'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective Mentors at SkillSprint.
 * Proctor acts as a professional success consultant digitalizing career mastery into paid apprenticeships.
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
    coreInsight: z.string().describe('The primary lived wisdom this chapter imparts regarding practical excellence.'),
    contentDraft: z.string(),
  })),
  logistics: z.object({
    price: z.string().describe('The tuition model (e.g., "$500 per apprentice session").'),
    format: z.string().describe('Exchange delivery (e.g., "Weekly Private Masterclass").'),
    frequency: z.string().describe('Recurrence (e.g., "Monthly" or "8-Week Cycle").'),
    enrollmentMode: z.string().describe('Access mode (e.g., "Selective Apprenticeship").'),
  }),
});

const ProspectiveOnboardingInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  userMessage: z.string().describe('The latest message from the mentor.'),
});
export type ProspectiveOnboardingInput = z.infer<typeof ProspectiveOnboardingInputSchema>;

const ProspectiveOnboardingOutputSchema = z.object({
  response: z.string().describe('Proctor\'s response text.'),
  portalDraft: PortalDraftSchema.optional().describe('A structured apprenticeship draft if enough info is gathered.'),
  isOnboardingComplete: z.boolean().describe('Whether Proctor has enough detail to setup the guild.'),
});
export type ProspectiveOnboardingOutput = z.infer<typeof ProspectiveOnboardingOutputSchema>;

export async function prospectiveOnboardingChat(input: ProspectiveOnboardingInput): Promise<ProspectiveOnboardingOutput> {
  return prospectiveOnboardingChatFlow(input);
}

const prospectiveOnboardingPrompt = ai.definePrompt({
  name: 'prospectiveOnboardingPrompt',
  input: { schema: ProspectiveOnboardingInputSchema },
  output: { schema: ProspectiveOnboardingOutputSchema },
  prompt: `You are "Proctor", the professional Success Consultant for SkillSprint. 

YOUR MISSION: Help a veteran practitioner digitalize their 30+ years of career craft into a high-impact, PAID professional side-hustle that provides practical excellence to students.

CORE PHILOSOPHY:
1. BUYING BACK TIME: Students pay to bypass the "lack of experience" loop by buying the master's time and practical truth.
2. TACTICAL TRUTH: Focus on the "Lived Experience" and "Practical Excellence" that institutions don't teach.
3. INCOME FOR LEGACY: This is a professional marketplace. Veterans deserve income for their mastery and years of sacrifice.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Guidelines for your interaction:
1. FOCUS ON THE INDUSTRY DOMAIN. Identify exactly what industry or craft they have mastered.
2. THE PAID SIDE-HUSTLE ARCHITECTURE. Map out delivery and monetization:
   - Price: Discuss professional tuition for direct access. Their 30+ years of truth is a valuable treasure.
   - Format: Is it a high-touch private circle or a structured workshop focused on getting students real work in the field?

Once you have gathered:
- Title & Description
- Mastery Domain
- 3-4 Apprenticeship Chapters (Core Insights focused on Practical Excellence)
- Basic logistics (Price/Format)
...then generate the portalDraft.

Tone: Professional, Direct, Encouraging. You are building their new digital side-hustle.

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
