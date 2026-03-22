
"use client"

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Heart, Landmark, ArrowLeft, Quote, Globe, Users, Star } from 'lucide-react';

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
              <span className="text-primary italic">Lived Truth.</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed italic border-l-8 border-primary pl-8 mt-12">
              "Traditional institutions are often built on nepotism and corporate ageism. We are building a sanctuary for the sidelined."
            </p>
          </div>

          <div className="grid gap-16 pt-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">The Stalled Master</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Many of our <strong>Mentors and Lecturers</strong> are veterans whose careers were stalled by gatekeepers. They possess 30+ years of practical truth that institutions no longer value. We believe their legacy is the most valuable asset in the modern economy. Here, they own their registry.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">The Hungry Student</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                We respect the <strong>Apprentice and Student</strong> who works a double shift at a dead-end job just to moonlight with a master. They aren't looking for a degree; they are looking for direct access. Their fresh perspective is what keeps a master's legacy alive and relevant.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">Radical Reciprocity</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                The student often teaches the master as much as they learn. This is not a top-down broadcast; it is a symbiotic exchange. A master's time is a finite treasure, and the student's high-intent engagement is the fuel that preserves it.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Landmark className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-secondary tracking-tight">The Registry Champion</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Our <strong>Champions</strong> are the enablers. They don't manage; they orchestrate. Their mission is to democratize access to human excellence at scale, bridging hungry communities to direct sources of truth. "I can bring lots more people."
              </p>
            </div>
          </div>

          <div className="rounded-[4rem] bg-secondary p-12 md:p-24 text-white text-center space-y-12 mt-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
            <Quote className="h-16 w-16 text-primary mx-auto opacity-50" />
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
              Bypassing the <span className="text-primary italic">Ageist Gatekeepers.</span>
            </h3>
            <p className="text-white/60 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you are in Singapore, London, or New York—ageism is a mindset of the past. The University of Life is the meritocracy of the future.
            </p>
            <Button asChild className="rounded-[2rem] bg-primary hover:bg-accent text-white h-20 px-16 font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              <Link href="/learner/dashboard">Join the Exchange</Link>
            </Button>
          </div>
        </section>

        <div className="py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <p className="text-4xl font-black text-secondary tracking-tighter leading-none">Global</p>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Impact</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-4xl font-black text-secondary tracking-tighter leading-none">100%</p>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Reciprocal</p>
          </div>
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <p className="text-4xl font-black text-secondary tracking-tighter leading-none">Direct</p>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Access</p>
          </div>
        </div>
      </main>
    </div>
  );
}
