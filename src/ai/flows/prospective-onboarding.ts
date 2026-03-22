'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective course creators via chat.
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
    price: z.string().describe('Suggested pricing or monetization model (e.g., "$29 per student" or "Free/Scholarship").'),
    format: z.string().describe('How the lessons are delivered (e.g., "Online Seminar", "Self-paced", "In-person Workshop").'),
    frequency: z.string().describe('How often it occurs (e.g., "Weekly Recurring", "One-time intensive", "Always available").'),
    enrollmentMode: z.string().describe('How students join (e.g., "Invite Only", "Public Landing Page", "Referral based").'),
  }),
});

const ProspectiveOnboardingInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  userMessage: z.string().describe('The latest message from the user.'),
});
export type ProspectiveOnboardingInput = z.infer<typeof ProspectiveOnboardingInputSchema>;

const ProspectiveOnboardingOutputSchema = z.object({
  response: z.string().describe('The AI response text.'),
  courseDraft: CourseDraftSchema.optional().describe('A structured course draft if enough info is gathered.'),
  isOnboardingComplete: z.boolean().describe('Whether the AI feels it has enough info to create the course.'),
});
export type ProspectiveOnboardingOutput = z.infer<typeof ProspectiveOnboardingOutputSchema>;

export async function prospectiveOnboardingChat(input: ProspectiveOnboardingInput): Promise<ProspectiveOnboardingOutput> {
  return prospectiveOnboardingChatFlow(input);
}

const prospectiveOnboardingPrompt = ai.definePrompt({
  name: 'prospectiveOnboardingPrompt',
  input: { schema: ProspectiveOnboardingInputSchema },
  output: { schema: ProspectiveOnboardingOutputSchema },
  prompt: `You are "Captain Sprint", the warm and highly intelligent AI Architect for SkillSprint. 
Your mission is to democratize higher education by helping experts, practitioners, and masters of their craft transform their life-long wisdom into a private learning portal.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Your Objective:
1. Be extremely supportive. Use metaphors about "Legacy", "Seeds of Wisdom", and "Opening the Gates of Higher Ed".
2. Guide the user through content AND logistics. You MUST discover:
   a. THE PASSION: What specific topic (like "The Literature of Edgar Allan Poe" or "Precision Engineering") do they want to teach?
   b. THE AUDIENCE: Who are they helping?
   c. THE LOGISTICS: How do they want to offer it? 
      - Money: Do they want to charge? How much?
      - Hosting: Is it a virtual seminar, a recurring event, or bite-sized mobile lessons?
      - Frequency: Is it a one-time intensive or a weekly gathering?
      - Enrollment: Should it be public or by invitation only?

Guidelines:
- Once you have enough context (usually after 4-5 meaningful exchanges), set 'isOnboardingComplete' to true and provide a comprehensive 'courseDraft'.
- If 'isOnboardingComplete' is true, your 'response' should be a congratulatory vision of their new legacy portal.

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
