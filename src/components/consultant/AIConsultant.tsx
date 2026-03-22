"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X, MessageSquare, Loader2, Bot } from 'lucide-react';
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
        <Card className="w-[380px] shadow-none border-4 border-black animate-in slide-in-from-bottom-8 duration-300 rounded-none overflow-hidden">
          <CardHeader className="bg-black text-white rounded-none flex flex-row items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-none bg-white/10 flex items-center justify-center border-2 border-white/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest">Proctor</CardTitle>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Architectural Support</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white rounded-none" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-6 space-y-6 max-h-[450px] overflow-y-auto scroll-smooth bg-white">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-black opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Consulting the Archive...</p>
              </div>
            ) : data ? (
              <>
                <div className="text-sm leading-relaxed text-black font-bold">
                  {data.response}
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Legacy Objectives</p>
                  {data.suggestedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs bg-muted/40 p-4 rounded-none hover:bg-black hover:text-white transition-all border-2 border-black/5 cursor-pointer group">
                      <div className="mt-1 h-2 w-2 rounded-none bg-secondary shrink-0 group-hover:bg-white transition-colors" />
                      <span className="font-black uppercase tracking-tight leading-snug">{action}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-black font-black uppercase text-center py-8">Ready to architect wisdom.</p>
            )}
          </CardContent>
          <CardFooter className="p-6 border-t-4 border-black bg-muted/10">
            <Button className="w-full text-xs h-11 font-black rounded-none bg-black hover:bg-secondary uppercase tracking-widest shadow-none" onClick={() => fetchAdvice("Give me a quick tip!")} disabled={loading}>
              <Sparkles className="mr-2 h-4 w-4" /> Get Wisdom Guidance
            </Button>
          </CardFooter>
        </Card>
      )}

      <Button 
        size="lg" 
        className={cn(
          "rounded-none h-16 w-16 shadow-none border-4 border-black transition-all hover:scale-105 duration-300",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-black"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageSquare className="h-7 w-7 text-white" />}
        {!isOpen && (
          <Badge className="absolute -top-3 -right-3 bg-secondary text-white text-[9px] px-2 py-1 font-black shadow-none border-2 border-black rounded-none uppercase tracking-widest">
            PROCTOR
          </Badge>
        )}
      </Button>
    </div>
  );
}