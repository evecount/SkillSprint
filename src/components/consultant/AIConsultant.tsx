"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X, MessageSquare, ArrowRight, Loader2, Bot } from 'lucide-react';
import { onboardingConsultant, OnboardingConsultantOutput } from '@/ai/flows/onboarding-consultant';
import { cn } from '@/lib/utils';

interface AIConsultantProps {
  userName: string;
  role: 'admin' | 'teacher' | 'learner';
  orgName: string;
}

export function AIConsultant({ userName, role, orgName }: AIConsultantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingConsultantOutput | null>(null);

  const fetchAdvice = async (message?: string) => {
    setLoading(true);
    try {
      const result = await onboardingConsultant({
        userName,
        role,
        orgName,
        userMessage: message
      });
      setData(result);
    } catch (error) {
      console.error("Consultant error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !data) {
      fetchAdvice();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {isOpen && (
        <Card className="w-[350px] shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm font-bold">Captain Sprint</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20 text-primary-foreground" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-xs">Consulting the knowledge base...</p>
              </div>
            ) : data ? (
              <>
                <div className="text-sm leading-relaxed text-foreground">
                  {data.response}
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mission Checklist</p>
                  {data.suggestedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs bg-muted/50 p-2 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-primary/10 cursor-pointer">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">I'm ready to help you sprint ahead!</p>
            )}
          </CardContent>
          <CardFooter className="p-4 border-t bg-muted/30">
            <Button className="w-full text-xs h-9" onClick={() => fetchAdvice("Give me a quick tip!")} disabled={loading}>
              <Sparkles className="mr-2 h-3 w-3" /> Get a New Mission
            </Button>
          </CardFooter>
        </Card>
      )}

      <Button 
        size="lg" 
        className={cn(
          "rounded-full h-14 w-14 shadow-xl border-4 border-background transition-all hover:scale-110",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && (
          <Badge className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] px-1.5">
            AI
          </Badge>
        )}
      </Button>
    </div>
  );
}
