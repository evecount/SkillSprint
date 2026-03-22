"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, ArrowRight, Zap, MapPin, Users, Star, FastForward, Heart, Briefcase, X, Check } from 'lucide-react';
import { prospectiveOnboardingChat, ProspectiveOnboardingOutput } from '@/ai/flows/prospective-onboarding';
import { onboardingConsultant } from '@/ai/flows/onboarding-consultant';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

type Message = {
  role: 'user' | 'model';
  text: string;
};

type UserRole = 'mentor' | 'student' | null;

const MOCK_EXPERIENCES = [
  { id: 1, title: "4A Agency Creative Direction", author: "Marcus V.", domain: "Advertising", price: "$500/cycle", image: "https://picsum.photos/seed/skillsprint2/600/800", hint: "creative office" },
  { id: 2, title: "Lived Civil Engineering Truth", author: "Dr. Chen", domain: "Engineering", price: "$750/cycle", image: "https://picsum.photos/seed/skillsprint3/600/800", hint: "bridge construction" },
  { id: 3, title: "Dark Romanticism Mastery", author: "Julian R.", domain: "Fine Arts", price: "$400/cycle", image: "https://picsum.photos/seed/skillsprint4/600/800", hint: "classic art" },
  { id: 4, title: "Growth Marketing Guerrilla", author: "Sarah L.", domain: "Marketing", price: "$600/cycle", image: "https://picsum.photos/seed/skillsprint1/600/800", hint: "digital data" },
];

export function HeroChat() {
  const [role, setRole] = useState<UserRole>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ProspectiveOnboardingOutput['portalDraft'] | null>(null);
  const [stackIndex, setStackIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    const initialMsg = selectedRole === 'mentor' 
      ? "Welcome Practitioner. I am Proctor. Your 30+ years of truth is a finite treasure. Let's build your paid side-hustle. What industry domain are we digitalizing?"
      : "Welcome Apprentice. I am Proctor. You're here to buy back your time. Which industry has locked you out that you're ready to pay a Practitioner to enter directly?";
    
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
          userName: "Apprentice",
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

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setStackIndex((prev) => (prev + 1) % MOCK_EXPERIENCES.length);
      setSwipeDirection(null);
    }, 600);
  };

  if (!role) {
    return (
      <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 max-h-full">
        {/* Top: Discovery Swiper Card */}
        <Card className="flex-1 bg-white/5 border-white/10 rounded-[3rem] overflow-hidden flex flex-col min-h-[480px]">
          <CardHeader className="px-10 py-6 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Live Apprenticeship Stack</h3>
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                 <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Registry Sync</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 relative p-10 flex items-center justify-center perspective-1000">
            {MOCK_EXPERIENCES.map((item, idx) => {
              const isTop = idx === stackIndex;
              const isNext = idx === (stackIndex + 1) % MOCK_EXPERIENCES.length;
              
              if (!isTop && !isNext) return null;

              return (
                <div 
                  key={item.id}
                  className={cn(
                    "absolute inset-x-10 inset-y-8 transition-all duration-500",
                    isTop ? "z-20 scale-100" : "z-10 scale-95 translate-y-4 opacity-20",
                    isTop && swipeDirection === 'left' && "animate-swipe-out-left-tilt",
                    isTop && swipeDirection === 'right' && "animate-swipe-out-right-tilt"
                  )}
                >
                  <div className="group relative h-full w-full overflow-hidden rounded-[2.5rem] bg-secondary border border-white/10 shadow-2xl">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      data-ai-hint={item.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-primary text-white px-3 py-0.5 text-[8px] font-black uppercase tracking-widest border-none">
                          {item.domain}
                        </Badge>
                        <span className="text-[10px] font-bold text-white/60">{item.price}</span>
                      </div>
                      <h4 className="text-3xl font-black text-white leading-tight tracking-tighter">{item.title}</h4>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Users className="h-3 w-3" /> practitioner: {item.author}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Swiper Controls - Positioned Relative to the Stack */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSwipe('left')}
                className="h-16 w-16 rounded-[1.5rem] bg-secondary/80 backdrop-blur-md border-white/10 text-white hover:bg-destructive hover:border-destructive transition-all hover:scale-110 active:scale-90"
              >
                <X className="h-7 w-7" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSwipe('right')}
                className="h-16 w-16 rounded-[1.5rem] bg-primary text-white border-none shadow-xl shadow-primary/20 hover:bg-accent transition-all hover:scale-110 active:scale-90"
              >
                <Check className="h-7 w-7" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom: Role Matcher Card */}
        <div className="grid grid-cols-2 gap-4 h-[240px]">
          <button 
            onClick={() => handleRoleSelect('mentor')}
            className="group relative rounded-[2.5rem] bg-white text-secondary overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl border-2 border-transparent hover:border-primary/40 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-black tracking-tight leading-none mb-1">Practitioner</h3>
            <p className="text-secondary/40 font-black uppercase tracking-[0.2em] text-[8px]">Monetize Legacy</p>
          </button>

          <button 
            onClick={() => handleRoleSelect('student')}
            className="group relative rounded-[2.5rem] bg-secondary text-white overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl border border-white/5 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-black tracking-tight leading-none mb-1">Apprentice</h3>
            <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[8px]">Buy Back Time</p>
          </button>
        </div>
      </div>
    );
  }

  if (draft) {
    return (
      <Card className="w-full border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden bg-white animate-in zoom-in duration-500 flex flex-col max-h-[750px]">
        <CardHeader className="bg-secondary text-white p-10">
          <Badge className="bg-primary text-white border-none px-4 py-1.5 mb-4 rounded-full text-[8px] font-black uppercase tracking-widest">Registry Blueprint</Badge>
          <CardTitle className="text-4xl md:text-5xl font-black leading-[0.9] tracking-tighter">Your Side-Hustle <span className="text-primary italic">Drafted.</span></CardTitle>
        </CardHeader>
        <CardContent className="p-10 space-y-8 flex-1 overflow-y-auto">
          <div className="p-8 rounded-[2rem] bg-muted/50 border border-border/50">
            <h3 className="font-black text-2xl text-secondary tracking-tight">{draft.title}</h3>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed italic">{draft.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, label: "Domain", value: draft.masteryDomain },
              { icon: MapPin, label: "Format", value: draft.logistics.format },
              { icon: Star, label: "Tuition", value: draft.logistics.price },
              { icon: Users, label: "Access", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/30 transition-all group">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                  <p className="text-xs font-black text-secondary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-10 bg-muted/20 border-t border-border/50">
          <Button asChild className="w-full h-16 text-xl font-black rounded-[1.5rem] bg-primary hover:bg-accent text-white shadow-xl shadow-primary/20 transition-all">
            <Link href="/teacher/dashboard">
              Launch Paid Apprenticeship <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden bg-white flex flex-col h-[750px] animate-in slide-in-from-right duration-500">
      <CardHeader className="border-b border-border/10 bg-muted/30 px-10 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center font-black text-xl shadow-xl shadow-secondary/20">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-black text-secondary tracking-tight">Proctor</CardTitle>
                <Badge variant="outline" className="rounded-full px-2 text-[8px] font-black uppercase tracking-widest border-primary/30 text-primary">Consultant</Badge>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Active Consultation</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFastTrack}
              className="text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-full"
            >
              <FastForward className="mr-1.5 h-3 w-3" /> Fast Track
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setRole(null)} className="h-8 w-8 p-0 rounded-full hover:bg-muted">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-10 space-y-6 scroll-smooth"
      >
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full animate-in slide-in-from-bottom-4 duration-300",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[85%] rounded-[1.5rem] px-6 py-5 text-sm font-bold leading-relaxed shadow-sm",
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
            <div className="bg-muted rounded-[1.5rem] px-6 py-5 border border-border/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t border-border/10 bg-white">
        <form 
          className="flex w-full gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input 
            placeholder={role === 'mentor' ? "What is your industry domain?" : "Which industry is locking you out?"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-14 rounded-2xl px-6 bg-muted/50 border-transparent focus-visible:ring-primary text-sm font-bold text-secondary outline-none"
          />
          <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-2xl bg-secondary hover:bg-primary transition-all shadow-xl shadow-secondary/20" disabled={loading || !input.trim()}>
            <Send className="h-6 w-6 text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
