
"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, Loader2, ArrowRight, CheckCircle2, Zap, Landmark, Users, MapPin, Calendar } from 'lucide-react';
import { prospectiveOnboardingChat, ProspectiveOnboardingOutput } from '@/ai/flows/prospective-onboarding';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "I am Proctor. I architect the bridge between your lived mastery and the next generation. What industry or craft are we masterminding today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ProspectiveOnboardingOutput['portalDraft'] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const result = await prospectiveOnboardingChat({
        history,
        userMessage: userMsg
      });

      setMessages(prev => [...prev, { role: 'model', text: result.response }]);
      if (result.portalDraft && result.isOnboardingComplete) {
        setDraft(result.portalDraft);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Encountered a registry error. Please re-state your domain." }]);
    } finally {
      setLoading(false);
    }
  };

  if (draft) {
    return (
      <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white animate-in zoom-in duration-500">
        <CardHeader className="bg-secondary text-white p-8 md:p-12">
          <Badge className="bg-primary text-white border-none px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wider">Blueprint Ready</Badge>
          <CardTitle className="text-3xl md:text-5xl font-black leading-tight tracking-tight">Your Guild <span className="text-primary italic">Drafted.</span></CardTitle>
          <p className="text-white/60 text-lg mt-2 font-medium">Proctor has architecturalized your exchange.</p>
        </CardHeader>
        <CardContent className="p-8 md:p-12 space-y-8">
          <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
            <h3 className="font-bold text-2xl text-secondary">{draft.title}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">{draft.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Zap, label: "Mastery Domain", value: draft.masteryDomain },
              { icon: MapPin, label: "Format", value: draft.logistics.format },
              { icon: Calendar, label: "Frequency", value: draft.logistics.frequency },
              { icon: Users, label: "Enrollment", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all">
                <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-bold text-secondary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-8 md:p-12 bg-muted/20 border-t border-border/50">
          <Button asChild className="w-full h-16 text-xl font-bold rounded-2xl bg-primary hover:bg-accent shadow-lg shadow-primary/20">
            <Link href="/teacher/dashboard">
              Launch Guild Studio <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white flex flex-col h-[650px] md:h-[700px]">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center font-bold text-xl">
              P
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-secondary">Proctor</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Architectural Registry</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
      >
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-6 py-4 text-sm font-medium leading-relaxed",
              m.role === 'user' 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-muted text-secondary"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-6 py-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t border-border/50 bg-white">
        <form 
          className="flex w-full gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder="State your domain of mastery..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-14 rounded-xl px-6 bg-muted/50 border-transparent focus-visible:ring-primary text-sm font-medium"
          />
          <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-xl bg-secondary hover:bg-secondary/90 transition-all shadow-lg" disabled={loading || !input.trim()}>
            <Send className="h-6 w-6 text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
