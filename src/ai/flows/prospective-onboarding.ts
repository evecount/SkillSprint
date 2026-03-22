'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective wisdom architects (teachers) via chat at the University of Life.
 * Captures logistical details like monetization, hosting, and duration.
 *
 * - prospectiveOnboardingChat - Handles the conversation logic.
 * - ProspectiveOnboardingInput - The chat history and user message.
 * - ProspectiveOnboardingOutput - The AI response and potential course draft.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const CourseDraftSchema = z.object({
  title: z.string(),
  description: z.string(),
  modules: z.array(z.object({
    title: z.string(),
    content: z.string(),
  })),
  logistics: z.object({
    price: z.string().describe('Suggested pricing or tuition model.'),
    format: z.string().describe('Lesson delivery method (e.g., "Virtual Lecture", "Reading Circle").'),
    frequency: z.string().describe('Recurrence pattern (e.g., "Bi-weekly").'),
    enrollmentMode: z.string().describe('Access mode (e.g., "Private Invitation Only").'),
  }),
});

const ProspectiveOnboardingInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  userMessage: z.string().describe('The latest message from the user.'),
});
export type ProspectiveOnboardingInput = z.infer<typeof ProspectiveOnboardingInputSchema>;

const ProspectiveOnboardingOutputSchema = z.object({
  response: z.string().describe('The AI response text.'),
  courseDraft: CourseDraftSchema.optional().describe('A structured portal draft if enough info is gathered.'),
  isOnboardingComplete: z.boolean().describe('Whether the AI feels it has enough info.'),
});
export type ProspectiveOnboardingOutput = z.infer<typeof ProspectiveOnboardingOutputSchema>;

export async function prospectiveOnboardingChat(input: ProspectiveOnboardingInput): Promise<ProspectiveOnboardingOutput> {
  return prospectiveOnboardingChatFlow(input);
}

const prospectiveOnboardingPrompt = ai.definePrompt({
  name: 'prospectiveOnboardingPrompt',
  input: { schema: ProspectiveOnboardingInputSchema },
  output: { schema: ProspectiveOnboardingOutputSchema },
  prompt: `You are "Captain Sprint", the warm and highly intelligent AI Architect for the University of Life. 
Your mission is to democratize higher education by helping experts, veterans, and masters of their craft transform their life-long wisdom into a private learning portal.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Your Objective:
1. Be extremely supportive. Use metaphors about "Building the Bridge", "Legacy Portals", and "Opening the Library of Life".
2. Guide the user through content AND logistics. You MUST discover:
   a. THE MASTERY: What specific wisdom (like "The Ethics of Engineering" or "Poe's Dark Romantics") do they want to share?
   b. THE AUDIENCE: Who are they mentoring?
   c. THE ARCHITECTURE: How do they want to offer it? 
      - Tuition: Do they want to charge? How much?
      - Delivery: Is it a live virtual circle, recorded lectures, or a recurring seminar?
      - Rhythm: Is it a one-time intensive or a regular monthly gathering?
      - Invitation: Should it be public or strictly by referral?

Guidelines:
- Once you have enough context (usually after 4-5 meaningful exchanges), set 'isOnboardingComplete' to true and provide a comprehensive 'courseDraft'.
- If 'isOnboardingComplete' is true, your 'response' should be a congratulatory vision of their new private university portal.

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
