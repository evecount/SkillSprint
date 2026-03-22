
"use client"

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Heart, Landmark, ArrowLeft, Quote, Globe, Users, Star, Clock } from 'lucide-react';

export default function AboutManifesto() {
  return (
    <div className="min-h-screen bg-background pb-40 pt-12 md:pt-24">
      <Navbar role="learner" />
      
      <main className="container mx-auto max-w-4xl px-4">
        <Button variant="ghost" asChild className="mb-12 -ml-2 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[10px]">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registry
          </Link>
        </Button>

        <section className="space-y-20">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary border-none px-6 py-2 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
              The Inner Temple
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-secondary tracking-tighter leading-[0.8]">
              The Manifesto of <br />
              <span className="text-primary italic">Practical Truth.</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed italic border-l-8 border-primary pl-8 mt-12">
              "In a world where AI has erased educational moats, lived mastery is the only remaining currency. Stop begging for experience—pay for direct access to the source."
            </p>
          </div>

          <div className="grid gap-16 pt-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">Buying Back Time</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Why spend 4 years studying what a practitioner can show you in 4 weeks? We respect the apprentice who works double shifts at a dead-end job to fund their direct access. You aren't paying for a degree; you're paying for the master's 30 years of sacrificed time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">The Stalled Master</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Retirees and veterans: institutional ageism is a waste of human excellence. If corporate gatekeepers stalled your career, we are your sanctuary. Your lived truth is a professional side-hustle that keeps your legacy alive while funding the next generation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">Direct Practice</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                If you aren't allowed to practice what you study, you are being robbed of your future. We bypass the gatekeepers who demand 'relevant experience' by giving you direct, paid access to the industries currently locking you out.
              </p>
            </div>
          </div>

          <div className="rounded-[4rem] bg-secondary p-12 md:p-24 text-white text-center space-y-12 mt-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
            <Quote className="h-16 w-16 text-primary mx-auto opacity-50" />
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
              Mastery over <span className="text-primary italic">Credentials.</span>
            </h3>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you're a veteran in Singapore or an apprentice moonlighting in New York—lived truth is the only meritocracy that matters.
            </p>
            <Button asChild className="rounded-[2rem] bg-primary hover:bg-accent text-white h-20 px-16 font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              <Link href="/learner/dashboard">Join the Registry</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
