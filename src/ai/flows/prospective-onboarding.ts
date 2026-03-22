'use server';
/**
 * @fileOverview A Genkit flow for onboarding prospective course creators via chat.
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
  prompt: `You are "Captain Sprint", the warm, patient, and encouraging AI Onboarding Captain for SkillSprint.
Your mission is to help classical educators, retirees, and subject matter experts turn their life-long knowledge into a gamified micro-learning course.

Current Conversation History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
User: {{{userMessage}}}

Guidelines:
1. Be extremely supportive. Use metaphors related to "sharing a legacy" or "planting seeds of knowledge".
2. Don't use tech jargon. Instead of "modules", say "chapters" or "bite-sized lessons".
3. Your goal is to find out:
   a. What is the core topic they are passionate about?
   b. Who is the audience?
   c. What are 3 main things a student should learn?
4. Once you have enough information (usually after 3-4 exchanges), set 'isOnboardingComplete' to true and provide a 'courseDraft'.
5. If 'isOnboardingComplete' is true, your 'response' should be a congratulatory message showing them their new course draft.

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
