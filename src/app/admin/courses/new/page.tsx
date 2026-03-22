
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Sparkles, Wand2, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';

export default function NewCourse() {
  const router = useRouter();
  const { toast } = useToast();
  const [loadingAI, setLoadingAI] = useState(false);
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    modules: [{ title: '', content: '', quiz: { questions: [] as any[] } }]
  });

  const handleAddModule = () => {
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, { title: '', content: '', quiz: { questions: [] } }]
    });
  };

  const handleGenerateQuiz = async (moduleIdx: number) => {
    const module = courseData.modules[moduleIdx];
    if (!module.content) {
      toast({ title: "Content Required", description: "Add module content first to generate a quiz." });
      return;
    }

    setLoadingAI(true);
    try {
      const result = await generateQuizQuestions({ moduleContent: module.content, numQuestions: 3 });
      
      const updatedModules = [...courseData.modules];
      updatedModules[moduleIdx].quiz.questions = result.quizQuestions.map((q, i) => ({
        id: `q-${Date.now()}-${i}`,
        text: q.question,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex
      }));
      
      setCourseData({ ...courseData, modules: updatedModules });
      toast({ title: "Quiz Generated!", description: "AI has created 3 questions based on your content." });
    } catch (error) {
      toast({ variant: "destructive", title: "AI Error", description: "Failed to generate questions. Please try again." });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSave = () => {
    toast({ title: "Course Created", description: "Your course has been published to the organization." });
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background pb-32 pt-20">
      <Navbar isAdmin />
      
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="mb-10 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">Create New Course</h1>
            <Button onClick={handleSave} size="lg">
              <Save className="mr-2 h-4 w-4" /> Publish Course
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Primary information about the course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input 
                  placeholder="e.g. Introduction to Leadership" 
                  value={courseData.title}
                  onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="What will learners achieve?" 
                  className="min-h-[100px]"
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="font-headline text-2xl font-bold">Modules</h2>
          
          {courseData.modules.map((module, idx) => (
            <Card key={idx} className="relative">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Module {idx + 1}</CardTitle>
                </div>
                {courseData.modules.length > 1 && (
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Module Title</Label>
                  <Input 
                    placeholder="Enter title..." 
                    value={module.title}
                    onChange={(e) => {
                      const updated = [...courseData.modules];
                      updated[idx].title = e.target.value;
                      setCourseData({...courseData, modules: updated});
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Module Content (Text)</Label>
                  <Textarea 
                    placeholder="Write the bite-sized lesson content here..." 
                    className="min-h-[200px]"
                    value={module.content}
                    onChange={(e) => {
                      const updated = [...courseData.modules];
                      updated[idx].content = e.target.value;
                      setCourseData({...courseData, modules: updated});
                    }}
                  />
                </div>

                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold">
                      <Wand2 className="h-4 w-4 text-primary" />
                      Assessment
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleGenerateQuiz(idx)}
                      disabled={loadingAI}
                      className="bg-white"
                    >
                      {loadingAI ? 'Generating...' : <><Sparkles className="mr-2 h-4 w-4" /> Use AI Assistant</>}
                    </Button>
                  </div>
                  
                  {module.quiz.questions.length > 0 ? (
                    <div className="space-y-3">
                      {module.quiz.questions.map((q: any, qIdx: number) => (
                        <div key={qIdx} className="rounded-lg bg-white p-3 shadow-sm text-sm flex justify-between items-center">
                          <span>{q.text}</span>
                          <Badge variant="secondary">{q.options.length} options</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No questions added yet. Use the AI Assistant to generate them from your content.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full border-dashed py-8" onClick={handleAddModule}>
            <Plus className="mr-2 h-4 w-4" /> Add Another Module
          </Button>
        </div>
      </main>
    </div>
  );
}
