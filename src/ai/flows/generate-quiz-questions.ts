'use server';
/**
 * @fileOverview A Genkit flow for generating multiple-choice quiz questions based on provided module content.
 *
 * - generateQuizQuestions - A function that handles the quiz question generation process.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  moduleContent: z
    .string()
    .describe('The content of the module for which to generate quiz questions.'),
  numQuestions:
    z.number().int().min(1).optional().describe('Optional: The desired number of quiz questions to generate. Defaults to 3 if not specified.'),
});
export type GenerateQuizQuestionsInput = z.infer<
  typeof GenerateQuizQuestionsInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The text of the multiple-choice question.'),
  options:
    z.array(z.string()).min(2).max(5).describe('An array of plausible answer options for the question. Must contain at least 2 and at most 5 options.'),
  correctAnswerIndex:
    z.number().int().min(0).describe('The zero-based index of the correct answer within the options array.'),
}).refine(data => data.correctAnswerIndex < data.options.length, {
  message: 'correctAnswerIndex must be a valid index within the options array.',
});

const GenerateQuizQuestionsOutputSchema = z.object({
  quizQuestions:
    z.array(QuizQuestionSchema).describe('An array of generated multiple-choice quiz questions.'),
});
export type GenerateQuizQuestionsOutput = z.infer<
  typeof GenerateQuizQuestionsOutputSchema
>;

export async function generateQuizQuestions(
  input: GenerateQuizQuestionsInput
): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const generateQuizQuestionsPrompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: { schema: GenerateQuizQuestionsInputSchema },
  output: { schema: GenerateQuizQuestionsOutputSchema },
  prompt: `You are an expert educator tasked with creating multiple-choice quiz questions based on provided module content.

Based on the following module content, generate {{numQuestions}} multiple-choice quiz questions.
Each question should have 4 plausible answer options, and you must clearly identify the zero-based index of the correct answer.
Ensure the questions effectively test understanding of the module content and that the correct answer index is valid for the provided options.

Module Content:
{{{moduleContent}}}

Please generate the quiz questions in the following JSON format:
{{jsonSchema GenerateQuizQuestionsOutputSchema}}`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async (input) => {
    // Provide a default for numQuestions if not provided in the input
    const numQuestions = input.numQuestions ?? 3;

    const { output } = await generateQuizQuestionsPrompt({
      moduleContent: input.moduleContent,
      numQuestions: numQuestions,
    });
    return output!;
  }
);
