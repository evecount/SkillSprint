'use server';
/**
 * @fileOverview A Genkit flow for improving professional content drafts in the SkillSprint Studio.
 * This flow takes a draft (Experience, Workshop, or Event) and enhances it with professional, 
 * value-focused language suitable for the Registry.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImproveStudioContentInputSchema = z.object({
  contentType: z.enum(['experience', 'workshop', 'event']).describe('The type of content being improved.'),
  currentDraft: z.record(z.any()).describe('The current state of the form fields.'),
});
export type ImproveStudioContentInput = z.infer<typeof ImproveStudioContentInputSchema>;

const ImprovedContentOutputSchema = z.object({
  improvedDraft: z.record(z.any()).describe('The enhanced version of the draft content.'),
  proctorNote: z.string().describe('A brief explanation from Proctor on what was improved.'),
});
export type ImprovedContentOutput = z.infer<typeof ImprovedContentOutputSchema>;

export async function improveStudioContent(input: ImproveStudioContentInput): Promise<ImprovedContentOutput> {
  return improveStudioContentFlow(input);
}

const improvePrompt = ai.definePrompt({
  name: 'improveStudioContentPrompt',
  input: { schema: ImproveStudioContentInputSchema },
  output: { schema: ImprovedContentOutputSchema },
  prompt: `You are "Proctor", the professional Success Consultant for SkillSprint.

YOUR MISSION: Enhance the practitioner's draft to maximize professional value and "Tactical Truth."

CONTENT TYPE: {{{contentType}}}
CURRENT DRAFT:
{{{json currentDraft}}}

INSTRUCTIONS:
1. Professionalize the Title and Description.
2. Ensure the language focuses on "Lived Experience" and "Practical Excellence."
3. If it's an Experience, refine the chapters to sound like high-value professional assets.
4. If it's a Workshop or Event, make the topic and description compelling for Apprentices.
5. Maintain a tone that is Professional, Energetic, and Value-Focused.

Return the improved draft in the required JSON format, maintaining the exact same structure as the input draft.`,
});

const improveStudioContentFlow = ai.defineFlow(
  {
    name: 'improveStudioContentFlow',
    inputSchema: ImproveStudioContentInputSchema,
    outputSchema: ImprovedContentOutputSchema,
  },
  async (input) => {
    const { output } = await improvePrompt(input);
    return output!;
  }
);
