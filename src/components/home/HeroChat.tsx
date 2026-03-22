"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, Loader2, ArrowRight, CheckCircle2, DollarSign, MapPin, Calendar, Users, GraduationCap, Landmark, Zap } from 'lucide-react';
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
      text: "I am Proctor. I architect the bridge between your lived mastery and the next generation. If you were to launch your own private Wisdom Guild today—bypassing every institutional gatekeeper—what specific industry or craft are we masterminding?" 
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
      setMessages(prev => [...prev, { role: 'model', text: "Registry error encountered. Please re-state your domain of mastery." }]);
    } finally {
      setLoading(false);
    }
  };

  if (draft) {
    return (
      <Card className="border-8 border-black shadow-none bg-white overflow-hidden animate-in fade-in zoom-in duration-500 rounded-none">
        <CardHeader className="bg-black text-white p-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-secondary text-white border-none px-4 py-1 rounded-none uppercase font-black tracking-widest text-xs italic">Guild Blueprint Ready</Badge>
          </div>
          <CardTitle className="text-4xl md:text-5xl font-black leading-[0.9] uppercase italic tracking-tighter">Wisdom Guild <span className="text-secondary">Drafted</span></CardTitle>
          <p className="text-white/60 text-lg mt-4 font-bold max-w-lg italic">Proctor has architecturalized your exchange. Your direct-from-source academy is ready.</p>
        </CardHeader>
        <CardContent className="p-10 space-y-10">
          <div className="rounded-none border-4 border-black bg-muted/20 p-8">
            <h3 className="font-black text-2xl text-black uppercase tracking-tighter italic">{draft.title}</h3>
            <p className="text-base text-black font-bold mt-4 leading-relaxed italic">{draft.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap, label: "Mastery Domain", value: draft.masteryDomain },
              { icon: MapPin, label: "Delivery Format", value: draft.logistics.format },
              { icon: Calendar, label: "Engagement Frequency", value: draft.logistics.frequency },
              { icon: Users, label: "Enrollment Protocol", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 rounded-none bg-muted/30 p-6 border-2 border-black/10 hover:border-black transition-colors">
                <item.icon className="h-6 w-6 text-secondary mt-1 shrink-0" />
                <div>
                  <p className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-black text-black leading-tight uppercase italic">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="h-4 w-4 text-black" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Architectural Chapters</p>
            </div>
            {draft.chapters.slice(0, 4).map((m, i) => (
              <div key={i} className="flex items-center gap-6 p-4 bg-muted/20 rounded-none group transition-all hover:bg-black hover:text-white border-2 border-transparent hover:border-black">
                <div className="h-10 w-10 rounded-none bg-black text-white flex items-center justify-center text-sm font-black group-hover:bg-secondary shrink-0 italic">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-black text-base truncate block uppercase tracking-tight italic">{m.title}</span>
                  <span className="text-[10px] uppercase font-bold opacity-60 tracking-widest">{m.coreInsight.substring(0, 40)}...</span>
                </div>
                <Badge variant="outline" className="text-[9px] font-black uppercase rounded-none border-black group-hover:border-white group-hover:text-white shrink-0">Insight Map</Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-10 bg-black border-t-8 border-secondary flex flex-col gap-6">
          <Button asChild className="w-full h-20 text-3xl font-black shadow-none rounded-none bg-secondary hover:bg-white hover:text-black uppercase italic tracking-tighter">
            <Link href="/teacher/dashboard">
              Launch Guild Studio <ArrowRight className="ml-3 h-8 w-8" />
            </Link>
          </Button>
          <div className="flex justify-center items-center gap-4 text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">
            <CheckCircle2 className="h-4 w-4" />
            <span>Own Your Legacy</span>
            <span className="h-1 w-1 bg-white/20 rounded-full" />
            <span>Direct Industry Access</span>
            <span className="h-1 w-1 bg-white/20 rounded-full" />
            <span>Bypass Barriers</span>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-8 border-black shadow-none bg-white flex flex-col h-[700px] rounded-none overflow-hidden relative">
      <CardHeader className="border-b-8 border-black py-8 bg-muted/10 px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-none bg-black flex items-center justify-center text-white border-4 border-white shadow-none italic text-2xl font-black">
              P
            </div>
            <div>
              <CardTitle className="text-xl font-black uppercase tracking-[0.2em] italic">Proctor</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-none bg-secondary animate-pulse" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Architectural Registry</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex h-12 w-12 rounded-none bg-secondary text-white items-center justify-center border-2 border-black">
            <Zap className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth bg-white"
      >
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[90%] rounded-none px-8 py-6 text-base border-4 leading-relaxed font-bold italic",
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
            <div className="bg-muted/30 rounded-none px-8 py-6 border-4 border-muted">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-none bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-none bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-none bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-8 border-t-8 border-black bg-white">
        <form 
          className="flex w-full gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder="Tell Proctor your industry or mastery domain..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-16 rounded-none px-8 bg-muted/10 border-4 border-black focus-visible:ring-secondary transition-all text-lg font-black placeholder:text-muted-foreground/40 italic"
          />
          <Button type="submit" size="icon" className="h-16 w-16 shrink-0 rounded-none shadow-none bg-black hover:bg-secondary transition-all border-4 border-black" disabled={loading || !input.trim()}>
            <Send className="h-8 w-8 text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
