"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, Loader2, ArrowRight, CheckCircle2, DollarSign, MapPin, Calendar, Users, GraduationCap } from 'lucide-react';
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
      <Card className="border-4 border-black shadow-none bg-white overflow-hidden animate-in fade-in zoom-in duration-500 rounded-none">
        <CardHeader className="bg-black text-white p-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            <Badge variant="secondary" className="bg-secondary text-white border-none px-3 rounded-none uppercase font-black tracking-widest text-[10px]">Democratizing Knowledge</Badge>
          </div>
          <CardTitle className="text-3xl font-black leading-tight uppercase italic">Your Wisdom Architecture is Ready!</CardTitle>
          <p className="text-white/80 text-base mt-2 font-medium">Proctor has digitalized your higher education draft.</p>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="rounded-none border-4 border-black bg-muted/20 p-6">
            <h3 className="font-black text-xl text-black uppercase tracking-tight">{draft.title}</h3>
            <p className="text-sm text-black font-medium mt-2 leading-relaxed">{draft.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: DollarSign, label: "Monetization", value: draft.logistics.price },
              { icon: MapPin, label: "Format", value: draft.logistics.format },
              { icon: Calendar, label: "Frequency", value: draft.logistics.frequency },
              { icon: Users, label: "Enrollment", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-none bg-muted/40 p-4 border border-black/10">
                <item.icon className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-black text-[9px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className="text-xs font-black text-black mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Wisdom Chapters</p>
            {draft.chapters.slice(0, 3).map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-muted/20 rounded-none group transition-all hover:bg-black hover:text-white border-2 border-transparent hover:border-black">
                <div className="h-7 w-7 rounded-none bg-black text-white flex items-center justify-center text-xs font-black group-hover:bg-secondary">
                  {i + 1}
                </div>
                <span className="font-black text-sm truncate flex-1 uppercase tracking-tight">{m.title}</span>
                <Badge variant="outline" className="text-[9px] font-black uppercase rounded-none opacity-0 group-hover:opacity-100 transition-opacity border-white text-white">Insight Map</Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-8 bg-black border-t-4 border-secondary flex flex-col gap-4">
          <Button asChild className="w-full h-14 text-xl font-black shadow-none rounded-none bg-secondary hover:bg-white hover:text-black uppercase italic tracking-tighter">
            <Link href="/teacher/dashboard">
              Launch My Portal <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
          <p className="text-[9px] text-center text-white/60 font-black leading-relaxed uppercase tracking-[0.2em]">
            Take full control of your tuition, schedule, and legacy in the Studio.
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-black shadow-none bg-white flex flex-col h-[600px] rounded-none overflow-hidden">
      <CardHeader className="border-b-4 border-black py-6 bg-muted/10 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-none bg-black flex items-center justify-center text-white shadow-none border-2 border-white">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-base font-black uppercase tracking-widest">Proctor</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-none bg-secondary animate-pulse" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Architect of Mastery</span>
              </div>
            </div>
          </div>
          <div className="h-10 w-10 rounded-none bg-secondary text-white flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth bg-white"
      >
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[88%] rounded-none px-6 py-4 text-sm border-2 leading-relaxed font-bold",
              m.role === 'user' 
                ? "bg-black text-white border-black" 
                : "bg-muted/30 text-black border-muted"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted/30 rounded-none px-6 py-4 border-2 border-muted">
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-none bg-black/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-none bg-black/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-none bg-black/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t-4 border-black bg-white">
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
            className="flex-1 h-14 rounded-none px-6 bg-muted/20 border-2 border-black focus-visible:ring-secondary transition-all text-base font-bold placeholder:text-muted-foreground/60"
          />
          <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-none shadow-none bg-black hover:bg-secondary transition-all" disabled={loading || !input.trim()}>
            <Send className="h-6 w-6 text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}