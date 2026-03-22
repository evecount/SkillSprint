"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, X, Loader2, Send } from 'lucide-react';
import { onboardingConsultant, OnboardingConsultantOutput } from '@/ai/flows/onboarding-consultant';
import { useFirestore, useUser, addDocumentNonBlocking } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';

interface AIConsultantProps {
  userName: string;
  role: 'admin' | 'teacher' | 'learner';
  orgName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AIConsultant({ userName, role, orgName, isOpen, onClose }: AIConsultantProps) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const { firestore } = useFirestore();
  const { user } = useUser();

  const fetchAdvice = async (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim() && !message) return;

    if (!message) setInput('');
    setLoading(true);

    const newMessages: { role: 'user' | 'model', text: string }[] = [
      ...messages,
      { role: 'user', text: textToSend }
    ];
    setMessages(newMessages);

    try {
      const result = await onboardingConsultant({
        userName,
        role,
        orgName,
        userMessage: textToSend,
        history: messages
      });

      setMessages(prev => [...prev, { role: 'model', text: result.response }]);

      // PERSIST TO DIGITAL ASSET DATABASE
      if (firestore && user) {
        let currentConvId = conversationId;
        
        // Create conversation record if it doesn't exist
        if (!currentConvId) {
          const convRef = doc(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations'));
          currentConvId = convRef.id;
          setConversationId(currentConvId);
          
          addDocumentNonBlocking(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations'), {
            id: currentConvId,
            learnerId: user.uid,
            organizationId: 'org_1',
            startTime: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
        }

        // Add User Message
        addDocumentNonBlocking(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations', currentConvId, 'chatMessages'), {
          conversationId: currentConvId,
          sender: 'learner',
          messageText: textToSend,
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString()
        });

        // Add AI Response
        addDocumentNonBlocking(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations', currentConvId, 'chatMessages'), {
          conversationId: currentConvId,
          sender: 'ai',
          messageText: result.response,
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString()
        });

        // Add Suggestion if applicable
        if (result.recommendation) {
          addDocumentNonBlocking(collection(firestore, 'organizations', 'org_1', 'learners', user.uid, 'aiConversations', currentConvId, 'aiSuggestions'), {
            conversationId: currentConvId,
            learnerId: user.uid,
            suggestedEntityType: 'Role',
            suggestedEntityId: result.recommendation.suggestedRole,
            reasoning: result.recommendation.reasoning,
            suggestionTimestamp: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error("Consultant error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchAdvice("Architect my professional path.");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm md:items-end md:justify-end md:bg-transparent md:p-8">
      <Card className="w-full max-w-[380px] shadow-2xl border-4 border-black animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 rounded-none overflow-hidden bg-white">
        <CardHeader className="bg-black text-white rounded-none flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-none bg-white/10 flex items-center justify-center border-2 border-white/20">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-sm font-black uppercase tracking-widest">Proctor</CardTitle>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Registry Architect</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white rounded-none" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-4 max-h-[50vh] overflow-y-auto bg-muted/5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 text-[11px] font-bold leading-relaxed border-2 border-black ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white text-black'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 border-2 border-black">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t-4 border-black bg-white">
          <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); fetchAdvice(); }}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query the Archive..."
              className="flex-1 bg-muted/30 border-2 border-black h-10 px-3 text-[11px] font-bold outline-none focus:bg-white"
            />
            <Button size="icon" className="h-10 w-10 rounded-none bg-black" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
