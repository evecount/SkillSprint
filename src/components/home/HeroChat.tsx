"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, Loader2, ArrowRight, Zap, GraduationCap, MapPin, Calendar, Users, Star, FastForward, Clock } from 'lucide-react';
import { prospectiveOnboardingChat, ProspectiveOnboardingOutput } from '@/ai/flows/prospective-onboarding';
import { onboardingConsultant } from '@/ai/flows/onboarding-consultant';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Message = {
  role: 'user' | 'model';
  text: string;
};

type UserRole = 'mentor' | 'student' | null;

export function HeroChat() {
  const [role, setRole] = useState<UserRole>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ProspectiveOnboardingOutput['portalDraft'] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    const initialMsg = selectedRole === 'mentor' 
      ? "Welcome to SkillSprint. I am Proctor. Your 30+ years of craft is a finite treasure. Let's build your professional side-hustle. What industry domain are we digitalizing today?"
      : "Welcome seeker. I am Proctor. You're here to buy back your time. Which industry has locked you out that you're ready to pay a Master to enter directly?";
    
    setMessages([{ role: 'model', text: initialMsg }]);
  };

  const handleSend = async (forcedInput?: string) => {
    const textToSend = forcedInput || input;
    if (!textToSend.trim() || loading || !role) return;

    if (!forcedInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      if (role === 'mentor') {
        const history = messages.map(m => ({ role: m.role, text: m.text }));
        const result = await prospectiveOnboardingChat({
          history,
          userMessage: textToSend
        });

        setMessages(prev => [...prev, { role: 'model', text: result.response }]);
        if (result.portalDraft && (result.isOnboardingComplete || forcedInput?.includes("blueprint"))) {
          setDraft(result.portalDraft);
        }
      } else {
        const result = await onboardingConsultant({
          userName: "Seeker",
          role: 'learner',
          orgName: "SkillSprint",
          userMessage: textToSend
        });
        setMessages(prev => [...prev, { role: 'model', text: result.response }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "The registry encountered a connection error. State your domain again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFastTrack = () => {
    if (role === 'mentor') {
      handleSend("I'm ready. Generate my paid blueprint now.");
    } else {
      window.location.href = "/learner/dashboard";
    }
  };

  if (!role) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button 
          onClick={() => handleRoleSelect('mentor')}
          className="group relative h-[450px] rounded-[3rem] bg-white text-secondary overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl border-2 border-transparent hover:border-primary/20"
        >
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
          <div className="relative h-full flex flex-col items-center justify-center p-10 text-center space-y-6">
            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-4xl font-black tracking-tight mb-2">Mentor / Lecturer</h3>
              <p className="text-secondary/40 font-black uppercase tracking-[0.3em] text-[10px]">Launch Your Side-Hustle</p>
            </div>
            <p className="text-secondary/70 font-medium italic leading-relaxed text-sm md:text-base">
              "I&apos;m ready to monetize my career legacy and mentor the next generation."
            </p>
            <div className="pt-4">
              <span className="inline-flex h-14 px-10 rounded-2xl bg-secondary text-white items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl group-hover:bg-primary transition-colors">
                Become a Mentor <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => handleRoleSelect('student')}
          className="group relative h-[450px] rounded-[3rem] bg-secondary text-white overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
        >
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
          <div className="relative h-full flex flex-col items-center justify-center p-10 text-center space-y-6">
            <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-4xl font-black tracking-tight mb-2">Apprentice / Student</h3>
              <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">Buy Back Your Time</p>
            </div>
            <p className="text-white/80 font-medium italic leading-relaxed text-sm md:text-base">
              "I&apos;m ready to pay a Master to learn how to DO and skip the unpaid loops."
            </p>
            <div className="pt-4">
              <span className="inline-flex h-14 px-10 rounded-2xl bg-primary text-white items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-accent transition-colors">
                Find an Apprenticeship <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  if (draft) {
    return (
      <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden bg-white animate-in zoom-in duration-500">
        <CardHeader className="bg-secondary text-white p-10 md:p-14">
          <Badge className="bg-primary text-white border-none px-4 py-1.5 mb-6 rounded-full text-xs font-black uppercase tracking-widest">Apprenticeship Blueprint</Badge>
          <CardTitle className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter">Your Side-Hustle <span className="text-primary italic">Drafted.</span></CardTitle>
          <p className="text-white/50 text-xl mt-4 font-bold italic">Proctor has structured your professional exchange.</p>
        </CardHeader>
        <CardContent className="p-10 md:p-14 space-y-10">
          <div className="p-8 rounded-[2rem] bg-muted/50 border border-border/50">
            <h3 className="font-black text-3xl text-secondary tracking-tight">{draft.title}</h3>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed italic">{draft.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Zap, label: "Mastery Domain", value: draft.masteryDomain },
              { icon: MapPin, label: "Format", value: draft.logistics.format },
              { icon: Star, label: "Tuition Model", value: draft.logistics.price },
              { icon: Users, label: "Enrollment", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-6 rounded-[2rem] bg-muted/30 border border-transparent hover:border-primary/30 transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{item.label}</p>
                  <p className="text-lg font-black text-secondary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-10 md:p-14 bg-muted/20 border-t border-border/50">
          <Button asChild className="w-full h-20 text-2xl font-black rounded-[2rem] bg-primary hover:bg-accent text-white shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]">
            <Link href="/teacher/dashboard">
              Launch Paid Apprenticeship <ArrowRight className="ml-3 h-8 w-8" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden bg-white flex flex-col h-[750px] animate-in slide-in-from-right duration-500">
      <CardHeader className="border-b border-border/10 bg-muted/30 px-10 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-secondary text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-secondary/20">
              P
            </div>
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl font-black text-secondary tracking-tight">Proctor</CardTitle>
                <Badge variant="outline" className="rounded-full px-3 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary">Success Consultant</Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Professional Mastery Agent</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFastTrack}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-full px-4"
            >
              <FastForward className="mr-2 h-3 w-3" /> {role === 'mentor' ? 'Skip to Setup' : 'Explore Registry'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setRole(null)} className="h-8 w-8 p-0 rounded-full hover:bg-muted">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth"
      >
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full animate-in slide-in-from-bottom-4 duration-300",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[85%] rounded-[2rem] px-8 py-6 text-sm md:text-base font-bold leading-relaxed shadow-sm",
              m.role === 'user' 
                ? "bg-primary text-white shadow-primary/20" 
                : "bg-muted/80 text-secondary border border-border/5"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-[2rem] px-8 py-6 border border-border/10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-8 border-t border-border/10 bg-white">
        <form 
          className="flex w-full gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder={role === 'mentor' ? "What is your mastery domain?" : "What industry are you targeting?"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-16 rounded-2xl px-8 bg-muted/50 border-transparent focus-visible:ring-primary text-base font-bold text-secondary shadow-inner"
          />
          <Button type="submit" size="icon" className="h-16 w-16 shrink-0 rounded-2xl bg-secondary hover:bg-primary transition-all shadow-xl shadow-secondary/20" disabled={loading || !input.trim()}>
            <Send className="h-7 w-7 text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
