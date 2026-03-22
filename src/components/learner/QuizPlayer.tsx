
"use client"

import { useState } from 'react';
import { Quiz, Question } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuizPlayer({ quiz, onComplete }: { quiz: Quiz, onComplete: (score: number) => void }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / quiz.questions.length) * 100;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      onComplete(score);
    }
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader className="bg-primary/5 pb-2">
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Assessment</span>
            <span>Question {currentQuestionIdx + 1} of {quiz.questions.length}</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
        <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-6">
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(v) => !isAnswered && setSelectedOption(parseInt(v))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = idx === currentQuestion.correctAnswerIndex;
            const isSelected = idx === selectedOption;
            
            let itemClass = "flex items-center gap-3 rounded-xl border-2 p-4 transition-all cursor-pointer hover:border-primary/50";
            if (isAnswered) {
              if (isCorrect) itemClass = "flex items-center gap-3 rounded-xl border-green-500 bg-green-50 p-4 transition-all";
              else if (isSelected) itemClass = "flex items-center gap-3 rounded-xl border-red-500 bg-red-50 p-4 transition-all";
              else itemClass = "flex items-center gap-3 rounded-xl border-muted p-4 transition-all opacity-50";
            } else if (isSelected) {
              itemClass = "flex items-center gap-3 rounded-xl border-primary bg-primary/5 p-4 transition-all";
            }

            return (
              <Label key={idx} className={itemClass}>
                <RadioGroupItem value={idx.toString()} className="sr-only" />
                <div className="flex-1 text-base font-medium">{option}</div>
                {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
              </Label>
            );
          })}
        </RadioGroup>

        <div className="mt-8 flex justify-end">
          {!isAnswered ? (
            <Button 
              onClick={handleSubmit} 
              disabled={selectedOption === null}
              size="lg"
              className="px-8"
            >
              Verify Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="px-8">
              {currentQuestionIdx === quiz.questions.length - 1 ? 'Finish Assessment' : 'Next Question'} 
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
