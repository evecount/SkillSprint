"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, User, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { prospectiveOnboardingChat, ProspectiveOnboardingOutput } from '@/ai/flows/prospective-onboarding';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome! I'm Captain Sprint. I believe everyone has a masterpiece of knowledge inside them. What's one thing you've mastered over the years that you'd love to teach others?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<ProspectiveOnboardingOutput['courseDraft'] | null>(null);
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
      if (result.courseDraft) {
        setDraft(result.courseDraft);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a small hiccup. Could you try saying that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  if (draft) {
    return (
      <Card className="border-none shadow-2xl bg-white overflow-hidden animate-in fade-in zoom-in duration-500">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            <Badge variant="secondary" className="bg-white/20 text-white border-none">Onboarding Success</Badge>
          </div>
          <CardTitle className="text-2xl font-bold">Your Course Legacy Begins!</CardTitle>
          <p className="text-primary-foreground/80 text-sm">Captain Sprint has drafted your first module structure.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="rounded-xl border-2 border-primary/10 bg-primary/5 p-4">
            <h3 className="font-bold text-lg text-primary">{draft.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{draft.description}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Draft Chapters</p>
            {draft.modules.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg text-sm">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </div>
                <span className="font-medium">{m.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-muted/30 border-t flex flex-col gap-3">
          <Button asChild className="w-full h-12 text-lg">
            <Link href="/teacher/dashboard">
              Launch This Course <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">You can refine these lessons in your Teacher Studio.</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm flex flex-col h-[500px]">
      <CardHeader className="border-b py-4 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold">Captain Sprint</CardTitle>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">Ready to help you build</span>
              </div>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-secondary animate-bounce" />
        </div>
      </CardHeader>
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm",
              m.role === 'user' 
                ? "bg-primary text-primary-foreground rounded-tr-none" 
                : "bg-muted text-foreground rounded-tl-none border"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 border">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t bg-white">
        <form 
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder="Share your passion..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
