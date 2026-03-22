"use client"

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, ArrowLeft, Quote, Clock } from 'lucide-react';

export default function AboutMission() {
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
              Our Theory of Practice
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-secondary tracking-tighter leading-[0.8]">
              The Mission of <br />
              <span className="text-primary italic">SkillSprint.</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed italic border-l-8 border-primary pl-8 mt-12">
              "In a world of infinite information, lived mastery is the only remaining moat. We bridge the gap between those who have done it and those who are ready to do it."
            </p>
          </div>

          <div className="grid gap-16 pt-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">Trading Time for Mastery</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Traditional education often leaves you locked out of the very industries you study. We respect the student who works to fund their own growth. You aren&apos;t just paying for content; you&apos;re buying back the master&apos;s years of trial, error, and sacrificed time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">The Professional Side-Hustle</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                For the veteran practitioner, SkillSprint is a sanctuary for your legacy. If your career was stalled by institutional ageism, we provide the architecture to turn your truth into a high-value side-hustle that keeps your craft alive and funded.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">Practical Truth</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                AI has erased educational moats for data, but it can&apos;t replicate experience. We focus on the "Tactical Truth"—the practical excellence that institutional gatekeepers can&apos;t teach and institutions don&apos;t understand.
              </p>
            </div>
          </div>

          <div className="rounded-[4rem] bg-secondary p-12 md:p-24 text-white text-center space-y-12 mt-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
            <Quote className="h-16 w-16 text-primary mx-auto opacity-50" />
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
              Doing over <span className="text-primary italic">Studying.</span>
            </h3>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you&apos;re a veteran in Singapore or a student moonlighting in New York—practical truth is the only meritocracy that matters.
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
