
"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, ArrowRight, Zap, MapPin, Users, Star, Heart, Briefcase, X, Check, ShieldCheck, Info, Landmark } from 'lucide-react';
import { prospectiveOnboardingChat, ProspectiveOnboardingOutput } from '@/ai/flows/prospective-onboarding';
import { onboardingConsultant } from '@/ai/flows/onboarding-consultant';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useFirestore, useUser, addDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';

type Message = {
  role: 'user' | 'model';
  text: string;
};

type UserRole = 'mentor' | 'student' | null;

const MOCK_EXPERIENCES = [
  { id: 'hero', type: 'hero' },
  { id: 'role-mentor', type: 'role', role: 'mentor' as const },
  { id: 'role-student', type: 'role', role: 'student' as const },
  { id: 1, type: 'offer', title: "4A Agency Creative Direction", author: "Marcus V.", domain: "Advertising", price: "$500/cycle", image: "https://picsum.photos/seed/skillsprint2/600/800", hint: "creative office" },
  { id: 2, type: 'offer', title: "Lived Civil Engineering Truth", author: "Dr. Chen", domain: "Engineering", price: "$750/cycle", image: "https://picsum.photos/seed/skillsprint3/600/800", hint: "bridge construction" },
  { id: 3, type: 'offer', title: "Dark Romanticism Mastery", author: "Julian R.", domain: "Fine Arts", price: "$400/cycle", image: "https://picsum.photos/seed/skillsprint4/600/800", hint: "classic art" },
];

export function HeroChat() {
  const [role, setRole] = useState<UserRole>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ProspectiveOnboardingOutput['portalDraft'] | null>(null);
  const [stackIndex, setStackIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { firestore } = useFirestore();
  const { user } = useUser();

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
    
    if (firestore && user) {
      const convRef = doc(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations'));
      setConversationId(convRef.id);
      
      addDocumentNonBlocking(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations'), {
        id: convRef.id,
        learnerId: user.uid,
        organizationId: 'org_1',
        startTime: new Date().toISOString(),
        topicSummary: `Initial Onboarding as ${selectedRole}`,
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
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

        if (firestore && user && conversationId) {
          const msgCol = collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations', conversationId, 'chatMessages');
          addDocumentNonBlocking(msgCol, {
            conversationId,
            sender: 'learner',
            messageText: textToSend,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
          addDocumentNonBlocking(msgCol, {
            conversationId,
            sender: 'ai',
            messageText: result.response,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
        }

      } else {
        const result = await onboardingConsultant({
          userName: user?.displayName || "Apprentice",
          role: 'learner',
          orgName: "SkillSprint",
          userMessage: textToSend,
          history: messages
        });
        setMessages(prev => [...prev, { role: 'model', text: result.response }]);

        if (firestore && user && conversationId) {
          const msgCol = collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations', conversationId, 'chatMessages');
          addDocumentNonBlocking(msgCol, {
            conversationId,
            sender: 'learner',
            messageText: textToSend,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
          addDocumentNonBlocking(msgCol, {
            conversationId,
            sender: 'ai',
            messageText: result.response,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "The registry encountered a connection error." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    const currentItem = MOCK_EXPERIENCES[stackIndex];

    setTimeout(() => {
      if (currentItem.type === 'role' && direction === 'right') {
        handleRoleSelect(currentItem.role);
      }
      setStackIndex((prev) => (prev + 1) % MOCK_EXPERIENCES.length);
      setSwipeDirection(null);
    }, 600);
  };

  if (!role) {
    return (
      <div className="w-full h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="relative w-full flex-1 min-h-[600px] perspective-1000">
          {MOCK_EXPERIENCES.map((item: any, idx) => {
            const isTop = idx === stackIndex;
            const isNext = idx === (stackIndex + 1) % MOCK_EXPERIENCES.length;
            if (!isTop && !isNext) return null;

            return (
              <div 
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-all duration-500 flex flex-col",
                  isTop ? "z-20 scale-100 translate-y-0" : "z-10 scale-95 translate-y-8 opacity-40",
                  isTop && swipeDirection === 'left' && "animate-swipe-out-left-tilt",
                  isTop && swipeDirection === 'right' && "animate-swipe-out-right-tilt"
                )}
              >
                {item.type === 'hero' ? (
                  <Card className="h-full w-full rounded-[2.5rem] bg-secondary border-white/10 p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="space-y-6">
                      <Badge className="bg-primary/20 text-primary border-primary/30 px-5 py-1.5 text-[9px] font-black tracking-[0.3em] uppercase rounded-full mb-2">
                        SkillSprint Registry
                      </Badge>
                      <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter leading-[0.85] text-white mb-6">
                        Master the Craft, <br />
                        <span className="text-primary italic">Skip the Loop.</span>
                      </h1>
                      <div className="space-y-3 max-w-sm">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                          <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium leading-relaxed text-white/60">
                            Trade money for time. Buy back years of struggle to get real work in the field.
                          </p>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium leading-relaxed text-white/60">
                            Lived Mastery over academic loops. Gain direct, ungatekept access to the practitioners who actually do the work.
                          </p>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                          <Landmark className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium leading-relaxed text-white/60">
                            Professional Sanctuary. Bypass the industrialized loop. AI has arrived to change the rules—no more forced work, only the mastery that truly matters.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <Link href="/about" className="inline-flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:text-white transition-colors group">
                        <Info className="h-5 w-5" /> Our Mission <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card>
                ) : item.type === 'role' ? (
                  <Card className={cn(
                    "h-full w-full rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center justify-center text-center shadow-2xl border-4 transition-all",
                    item.role === 'mentor' ? "bg-white border-primary/20 text-secondary" : "bg-secondary border-white/5 text-white"
                  )}>
                     <div className={cn(
                       "h-20 w-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl",
                       item.role === 'mentor' ? "bg-primary/10 text-primary" : "bg-white/10 text-primary"
                     )}>
                       {item.role === 'mentor' ? <Heart className="h-10 w-10" /> : <Briefcase className="h-10 w-10" />}
                     </div>
                     <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                       {item.role === 'mentor' ? "Veteran Practitioner" : "Direct Apprentice"}
                     </h3>
                     <p className={cn(
                       "font-black uppercase tracking-[0.3em] text-[10px] mb-8",
                       item.role === 'mentor' ? "text-secondary/40" : "text-white/40"
                     )}>
                       {item.role === 'mentor' ? "Monetize Career Legacy" : "Buy Back Professional Time"}
                     </p>
                     <p className="text-xs font-bold opacity-60 max-w-[240px] leading-relaxed italic">
                       "Swipe RIGHT to enter the Registry and architect your path as a {item.role === 'mentor' ? 'Practitioner' : 'Apprentice'}."
                     </p>
                  </Card>
                ) : (
                  <Card className="group relative h-full w-full overflow-hidden rounded-[2.5rem] bg-secondary border border-white/10 shadow-2xl">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      data-ai-hint={item.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-10 left-10 right-10 text-left">
                      <div className="flex items-center gap-4 mb-3">
                        <Badge className="bg-primary text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest border-none rounded-full">
                          {item.domain}
                        </Badge>
                        <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">{item.price}</span>
                      </div>
                      <h4 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tighter mb-2">{item.title}</h4>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                        <Users className="h-4 w-4" /> practitioner: {item.author}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-center gap-8 py-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleSwipe('left')}
            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-secondary/80 backdrop-blur-md border-white/10 text-white hover:bg-destructive hover:border-destructive transition-all hover:scale-110 active:scale-95 shadow-2xl"
          >
            <X className="h-8 w-8 md:h-10 md:w-10" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleSwipe('right')}
            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary text-white border-none shadow-xl shadow-primary/20 hover:bg-accent transition-all hover:scale-110 active:scale-95"
          >
            <Check className="h-8 w-8 md:h-10 md:w-10" />
          </Button>
        </div>
      </div>
    );
  }

  if (draft) {
    return (
      <Card className="w-full border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white animate-in zoom-in duration-500 flex flex-col h-full max-h-[700px]">
        <CardHeader className="bg-secondary text-white p-8 md:p-12 shrink-0">
          <Badge className="bg-primary text-white border-none px-4 py-1.5 mb-4 rounded-full text-[8px] font-black uppercase tracking-widest">Registry Blueprint</Badge>
          <CardTitle className="text-3xl md:text-5xl font-black leading-[0.85] tracking-tighter">Your Side-Hustle <br /><span className="text-primary italic">Drafted.</span></CardTitle>
        </CardHeader>
        <CardContent className="p-8 md:p-12 space-y-6 flex-1 overflow-y-auto">
          <div className="p-6 rounded-[2rem] bg-muted/50 border border-border/50 text-left">
            <h3 className="font-black text-xl text-secondary tracking-tight">{draft.title}</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed italic">"{draft.description}"</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, label: "Domain", value: draft.masteryDomain },
              { icon: MapPin, label: "Format", value: draft.logistics.format },
              { icon: Star, label: "Tuition", value: draft.logistics.price },
              { icon: Users, label: "Access", value: draft.logistics.enrollmentMode },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/30 transition-all group text-left">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[7px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">{item.label}</p>
                  <p className="text-[10px] font-black text-secondary truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-8 md:p-12 bg-muted/20 border-t border-border/50 shrink-0">
          <Button asChild className="w-full h-16 text-xs font-black uppercase tracking-[0.4em] rounded-[1.5rem] bg-primary hover:bg-accent text-white shadow-xl shadow-primary/20 transition-all">
            <Link href="/teacher/dashboard">
              Launch Paid Apprenticeship <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white flex flex-col h-full max-h-[750px] animate-in slide-in-from-right duration-500">
      <CardHeader className="border-b border-border/10 bg-muted/30 px-8 py-5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center font-black text-xl shadow-xl shadow-secondary/20">P</div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-black text-secondary tracking-tight">Proctor</CardTitle>
                <Badge variant="outline" className="rounded-full px-2 py-0 text-[8px] font-black uppercase tracking-widest border-primary/30 text-primary">Consultant</Badge>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Active Consultation</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setRole(null)} className="h-10 w-10 p-0 rounded-full hover:bg-muted">
            <ArrowRight className="h-5 w-5 rotate-180" />
          </Button>
        </div>
      </CardHeader>
      <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex w-full animate-in slide-in-from-bottom-4 duration-300", m.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-[1.5rem] px-5 py-3 text-[13px] font-bold leading-relaxed text-left",
              m.role === 'user' ? "bg-primary text-white" : "bg-muted/80 text-secondary border border-border/5"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-[1.5rem] px-6 py-3 border border-border/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 border-t border-border/10 bg-white shrink-0">
        <form className="flex w-full gap-3" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input 
            placeholder={role === 'mentor' ? "What is your industry domain?" : "Which industry is locking you out?"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 h-14 rounded-2xl px-6 bg-muted/50 border-transparent focus-visible:ring-primary text-sm font-bold text-secondary outline-none"
          />
          <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-2xl bg-secondary hover:bg-primary transition-all shadow-xl shadow-secondary/20" disabled={loading || !input.trim()}>
            <Send className="h-5 w-5 text-white" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
