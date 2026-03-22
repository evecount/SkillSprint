"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, User, Loader2, ArrowRight, CheckCircle2, DollarSign, MapPin, Calendar, Users, GraduationCap } from 'lucide-react';
import { prospectiveOnboardingChat, ProspectiveOnboardingOutput } from '@/ai/flows/prospective-onboarding';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the University of Life. I'm Proctor. I believe the world needs your unique mastery. If you were to open your own private 'Wisdom Portal' today—whether for the ad exec legacy or the art of leadership—what's the one thing you'd love to share with the next generation?" }
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
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a small hiccup. Could you try saying that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  if (draft) {
    return (
      <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] bg-white overflow-hidden animate-in fade-in zoom-in duration-500 rounded-[2rem]">
        <CardHeader className="bg-primary text-primary-foreground p-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            <Badge variant="secondary" className="bg-white/20 text-white border-none px-3">Democratizing Knowledge</Badge>
          </div>
          <CardTitle className="text-3xl font-bold leading-tight">Your Wisdom Portal Architecture is Ready!</CardTitle>
          <p className="text-primary-foreground/80 text-base mt-2">Proctor has digitalized your higher education draft.</p>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="rounded-2xl border-2 border-primary/10 bg-primary/5 p-6">
            <h3 className="font-bold text-xl text-primary">{draft.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{draft.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: DollarSign, label: "Monetization", value: draft.logistics.price },
              { icon: MapPin, label: "Format", value: draft.logistics.format },
              { icon: Calendar, label: "Frequency", value: draft.logistics.frequency },
              { icon: Users, label: "Enrollment", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl bg-muted/40 p-4 transition-colors hover:bg-muted/60">
                <item.icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-black text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Wisdom Chapters</p>
            {draft.chapters.slice(0, 3).map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-muted/20 rounded-2xl group transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-border">
                <div className="h-7 w-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                  {i + 1}
                </div>
                <span className="font-bold text-sm truncate flex-1">{m.title}</span>
                <Badge variant="outline" className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Insight Map</Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-8 bg-muted/30 border-t flex flex-col gap-4">
          <Button asChild className="w-full h-14 text-xl font-bold shadow-xl rounded-2xl">
            <Link href="/teacher/dashboard">
              Launch My Portal <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
          <p className="text-[10px] text-center text-muted-foreground font-medium leading-relaxed uppercase tracking-wider">
            Take full control of your tuition, schedule, and legacy in the Studio.
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] bg-white/95 backdrop-blur-md flex flex-col h-[600px] rounded-[2rem] overflow-hidden">
      <CardHeader className="border-b py-6 bg-primary/5 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-[1.2rem] bg-primary flex items-center justify-center text-primary-foreground shadow-lg border-2 border-white/20">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-base font-bold tracking-tight">Proctor</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Architect of Mastery</span>
              </div>
            </div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-secondary" />
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
              "max-w-[88%] rounded-3xl px-6 py-4 text-sm shadow-sm leading-relaxed",
              m.role === 'user' 
                ? "bg-primary text-primary-foreground rounded-tr-none font-medium" 
                : "bg-muted/50 text-foreground rounded-tl-none border font-medium"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted/50 rounded-3xl rounded-tl-none px-6 py-4 border">
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t bg-white">
        <form 
          className="flex w-full gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder="Tell Proctor about your lived mastery..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-14 rounded-2xl px-6 bg-muted/20 border-transparent focus-visible:ring-primary/20 transition-all text-base"
          />
          <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all" disabled={loading || !input.trim()}>
            <Send className="h-6 w-6" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}