
"use client"

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, ArrowLeft, Quote, Clock, Star, GraduationCap } from 'lucide-react';

export default function AboutMission() {
  return (
    <div className="min-h-screen bg-background pb-32 pt-16 md:pt-20">
      <Navbar role="learner" />
      
      <main className="container mx-auto max-w-4xl px-4">
        <Button variant="ghost" asChild className="mb-8 -ml-2 text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[10px]">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registry
          </Link>
        </Button>

        <section className="space-y-12">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-none px-5 py-1.5 text-[9px] font-black tracking-[0.3em] uppercase rounded-full">
              Our Theory of Practice
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-secondary tracking-tighter leading-[0.8]">
              The Mission of <br />
              <span className="text-primary italic">SkillSprint.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-6 mt-8">
              "In a world of infinite information, lived mastery is the only remaining moat. We bridge the gap between those who have done it and those who are ready to get real work in the field."
            </p>
          </div>

          <div className="grid gap-12 pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-secondary tracking-tight">Trading Time for Mastery</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">
                Traditional education often leaves you locked out of the very industries you study. We respect the student who works to fund their own growth. You aren&apos;t just paying for content; you&apos;re buying back the practitioner&apos;s years of trial, error, and sacrificed time to get direct entry into the craft.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-secondary tracking-tight">The Professional Sanctuary</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">
                For the veteran practitioner, SkillSprint is a sanctuary for your legacy. We provide the architecture to turn your professional truth into a high-value side-hustle that keeps your craft alive and funded by those who value practical excellence and direct experience.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-secondary tracking-tight">Practical Excellence</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">
                AI has erased educational moats for data, but it can&apos;t replicate lived experience. We focus on the "Tactical Truth"—the practical excellence required to actually do the job, which institutional gatekeepers can&apos;t teach and paper credentials often fail to validate.
              </p>
            </div>
          </div>

          {/* Simplified Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 rounded-[2rem] bg-secondary text-white group hover:scale-[1.02] transition-transform duration-500">
               <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-2">Monetize Legacy</h3>
              <p className="text-white/60 font-medium text-xs leading-relaxed">Turn your 30+ years of craft into a paid side-hustle. Pass on the tactical truth while funding your next chapter.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-primary text-white group hover:scale-[1.02] transition-transform duration-500">
               <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black mb-2">Direct Access</h3>
              <p className="text-white/80 font-medium text-xs leading-relaxed">Trade money for the practitioner&apos;s time. Bypass "no experience" loops and get real work insights directly from industry practitioners.</p>
            </div>
          </div>

          <div className="rounded-[3rem] bg-secondary p-10 md:p-16 text-white text-center space-y-8 mt-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
            <Quote className="h-12 w-12 text-primary mx-auto opacity-50" />
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
              Doing over <span className="text-primary italic">Studying.</span>
            </h3>
            <p className="text-white/60 text-lg max-w-xl mx-auto font-medium leading-relaxed">
              Whether you&apos;re a veteran practitioner or an apprentice moonlighting after your shift—practical excellence is the only meritocracy that matters.
            </p>
            <Button asChild className="rounded-[1.5rem] bg-primary hover:bg-accent text-white h-16 px-12 font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              <Link href="/learner/dashboard">Join the Registry</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
