
"use client"

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Heart, Landmark, ArrowLeft, Quote, Globe, Users } from 'lucide-react';

export default function AboutManifesto() {
  return (
    <div className="min-h-screen bg-background pb-32 pt-12 md:pt-24">
      <Navbar role="learner" />
      
      <main className="container mx-auto max-w-4xl px-4">
        <Button variant="ghost" asChild className="mb-8 -ml-2 text-muted-foreground hover:text-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registry
          </Link>
        </Button>

        <section className="space-y-12">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase rounded-full">
              The Inner Temple
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-secondary tracking-tighter leading-none">
              The Manifesto of <br />
              <span className="text-primary italic">Lived Truth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed italic">
              "Traditional institutions are often built on nepotism and corporate ageism. We are building a sanctuary for the sidelined."
            </p>
          </div>

          <div className="grid gap-12 pt-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Shield className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-secondary">The Stalled Master</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Many of our <strong>Mentors and Lecturers</strong> are veterans whose careers were stalled by gatekeepers. They possess 30+ years of practical truth that institutions no longer value. We believe their legacy is the most valuable asset in the modern economy. Here, they own their registry.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Zap className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-secondary">The Hungry Student</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We respect the <strong>Apprentice and Student</strong> who works a double shift at a dead-end job just to moonlight with a master. They aren't looking for a degree; they are looking for direct access. Their fresh perspective is what keeps a master's legacy alive and relevant.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Heart className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-secondary">Radical Reciprocity</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                The student often teaches the master as much as they learn. This is not a top-down broadcast; it is a symbiotic exchange. A master's time is a finite treasure, and the student's high-intent engagement is the fuel that preserves it.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Landmark className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-secondary">The Registry Champion</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our <strong>Champions</strong> are the enablers. They don't manage; they orchestrate. Their mission is to democratize access to human excellence at scale, bridging hungry communities to direct sources of truth.
              </p>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-secondary p-8 md:p-16 text-white text-center space-y-8 mt-12">
            <Quote className="h-12 w-12 text-primary mx-auto opacity-50" />
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Bypassing the <span className="text-primary">Ageist Gatekeepers.</span>
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
              Whether you are in Singapore, London, or New York—ageism is a mindset of the past. The University of Life is the meritocracy of the future.
            </p>
            <Button asChild className="rounded-2xl bg-primary hover:bg-accent text-white h-16 px-12 font-bold uppercase tracking-widest text-xs">
              <Link href="/learner/dashboard">Join the Exchange</Link>
            </Button>
          </div>
        </section>

        <div className="py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-3xl font-black text-secondary">Global</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Impact</p>
          </div>
          <div className="text-center space-y-2">
            <Users className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-3xl font-black text-secondary">100%</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reciprocal</p>
          </div>
          <div className="text-center space-y-2">
            <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-3xl font-black text-secondary">Direct</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Access</p>
          </div>
        </div>
      </main>
    </div>
  );
}
