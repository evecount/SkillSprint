
"use client"

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, CheckCircle2, Circle, Play, HelpCircle, Trophy } from 'lucide-react';
import { mockCourses } from '@/lib/mock-data';
import { QuizPlayer } from '@/components/learner/QuizPlayer';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function CourseViewer() {
  const { courseId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const course = mockCourses.find(c => c.id === courseId);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  if (!course) return <div>Course not found</div>;

  const currentModule = course.modules[activeModuleIndex];

  const handleModuleComplete = () => {
    if (currentModule.quiz && !showQuiz) {
      setShowQuiz(true);
    } else {
      markComplete();
    }
  };

  const markComplete = () => {
    if (!completedModules.includes(currentModule.id)) {
      setCompletedModules([...completedModules, currentModule.id]);
      toast({
        title: "Module Completed!",
        description: "You earned 50 XP!",
      });
    }
    
    if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setShowQuiz(false);
    } else {
      toast({
        title: "Course Finished!",
        description: "Congratulations! You've completed all modules.",
      });
      router.push('/learner/dashboard');
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar - Module List */}
        <aside className="hidden w-80 flex-col border-r bg-card md:flex">
          <div className="p-4 border-b">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2 -ml-2">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
            </Button>
            <h2 className="font-headline text-lg font-bold">{course.title}</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {course.modules.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveModuleIndex(idx);
                    setShowQuiz(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    activeModuleIndex === idx ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"
                  )}
                >
                  {completedModules.includes(m.id) ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 opacity-40" />
                  )}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className={cn("text-xs", activeModuleIndex === idx ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {m.quiz ? 'Module + Quiz' : 'Short Reading'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-background/50 p-4 md:p-8">
          <div className="mx-auto max-w-3xl space-y-8">
            {showQuiz && currentModule.quiz ? (
              <QuizPlayer 
                quiz={currentModule.quiz} 
                onComplete={(score) => {
                  toast({
                    title: "Quiz Passed!",
                    description: `Score: ${score}% - Bonus 100 XP added!`,
                  });
                  markComplete();
                }} 
              />
            ) : (
              <Card className="border-none shadow-lg">
                <CardHeader className="border-b bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Module {activeModuleIndex + 1}</Badge>
                    {currentModule.quiz && (
                      <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                        <HelpCircle className="mr-1 h-3 w-3" /> Includes Assessment
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-3xl">{currentModule.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {currentModule.videoUrl && (
                    <div className="mb-8 aspect-video rounded-xl bg-muted flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Play className="h-12 w-12 opacity-20" />
                        <span>Interactive Video Content</span>
                      </div>
                    </div>
                  )}
                  <div className="prose prose-blue max-w-none text-lg leading-relaxed text-muted-foreground">
                    <p>{currentModule.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </CardContent>
                <div className="p-6 border-t bg-muted/30 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Trophy className="h-5 w-5" />
                    +50 XP on completion
                  </div>
                  <Button onClick={handleModuleComplete} size="lg" className="h-12 px-8">
                    {currentModule.quiz ? 'Start Quiz' : 'Complete Module'} <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
