"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X, MessageSquare, ArrowRight, Loader2, Bot, GraduationCap } from 'lucide-react';
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
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-5">
      {isOpen && (
        <Card className="w-[380px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border-primary/10 animate-in slide-in-from-bottom-8 duration-300 rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-[2rem] flex flex-row items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Proctor</CardTitle>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Architectural Support</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-primary-foreground rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-6 space-y-6 max-h-[450px] overflow-y-auto scroll-smooth bg-white">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
                <p className="text-xs font-bold uppercase tracking-[0.2em]">Consulting the Archive...</p>
              </div>
            ) : data ? (
              <>
                <div className="text-sm leading-relaxed text-foreground font-medium">
                  {data.response}
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Legacy Objectives</p>
                  {data.suggestedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs bg-muted/30 p-4 rounded-2xl hover:bg-muted/50 transition-all border border-transparent hover:border-border cursor-pointer group">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="font-bold text-foreground/80 leading-snug">{action}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground font-medium text-center py-8">I'm ready to help you architect your wisdom.</p>
            )}
          </CardContent>
          <CardFooter className="p-6 border-t bg-muted/10">
            <Button className="w-full text-xs h-11 font-bold rounded-xl shadow-lg" onClick={() => fetchAdvice("Give me a quick tip!")} disabled={loading}>
              <Sparkles className="mr-2 h-4 w-4" /> Get New Wisdom Guidance
            </Button>
          </CardFooter>
        </Card>
      )}

      <Button 
        size="lg" 
        className={cn(
          "rounded-[1.5rem] h-16 w-16 shadow-2xl border-4 border-white transition-all hover:scale-110 duration-300",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
        {!isOpen && (
          <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] px-2 py-1 font-black shadow-lg border-2 border-white">
            PROCTOR
          </Badge>
        )}
      </Button>
    </div>
  );
}