
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, GraduationCap, Landmark, Zap, DollarSign, Clock, Heart, Info } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-12 pb-32 md:pt-24 overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col items-center text-center mb-12 space-y-6 pt-12">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full">
              The Registry of Lived Mastery
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-secondary leading-tight max-w-5xl">
              Moonlight with <br />
              <span className="text-primary italic">The Masters.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Monetize 30+ years of craft. Bypass the institutional gatekeepers. A new meritocracy for a generation that values direct excellence.
            </p>
            <Button variant="ghost" asChild className="text-primary font-bold hover:bg-primary/5 rounded-full">
              <Link href="/about" className="flex items-center gap-2">
                <Info className="h-4 w-4" /> Read our Manifesto
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <HeroChat />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-8 rounded-[2rem] bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">Paid Mentorship</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Own your legacy. Turn decades of "doing" into a professional side-hustle.</p>
            </div>
            <div className="group p-8 rounded-[2rem] bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">Direct Tuition</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Apprentices pay the source, not the institution. High-impact learning for the high-intent.</p>
            </div>
            <div className="group p-8 rounded-[2rem] bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">Bypass Gatekeepers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">No institutional ageism. Here, your experience is your greatest asset.</p>
            </div>
            <div className="group p-8 rounded-[2rem] bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all">
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">After-Shift Mastery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Moonlight with a master after your day job. Master the craft that actually matters.</p>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-24 mt-24 bg-secondary text-white rounded-[3rem] mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-6">Identify Your Contribution</h2>
            <p className="max-w-xl mx-auto text-white/60 text-lg mb-16">A symbiotic exchange for the new workforce.</p>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                <Zap className="h-10 w-10 mb-6 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Mentor / Lecturer</h3>
                <p className="text-white/60 text-sm mb-8">Of the mind or by doing. Structure your legacy into a paid apprenticeship.</p>
                <Button asChild className="w-full rounded-2xl bg-primary hover:bg-accent text-white h-14 font-bold uppercase tracking-widest text-xs">
                  <Link href="/teacher/dashboard">Start My Side-Hustle</Link>
                </Button>
              </div>
              
              <div className="p-8 rounded-[2.5rem] bg-primary text-white text-left shadow-2xl shadow-primary/20">
                <GraduationCap className="h-10 w-10 mb-6 text-white" />
                <h3 className="text-2xl font-bold mb-3">Apprentice / Student</h3>
                <p className="text-white/80 text-sm mb-8">Direct access. Fund your mastery with the source and bypass the internships.</p>
                <Button asChild className="w-full rounded-2xl bg-secondary hover:bg-secondary/90 text-white h-14 font-bold uppercase tracking-widest text-xs">
                  <Link href="/learner/dashboard">Find a Master</Link>
                </Button>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                <Landmark className="h-10 w-10 mb-6 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Registry Champion</h3>
                <p className="text-white/60 text-sm mb-8">I can bring lots more people. Orchestrate the exchange and scale access to excellence.</p>
                <Button asChild variant="outline" className="w-full rounded-2xl border-white/20 text-white hover:bg-white hover:text-secondary h-14 font-bold uppercase tracking-widest text-xs">
                  <Link href="/admin/dashboard">Become a Champion</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-16 text-center border-t border-border/50 mb-32 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="h-12 w-12 bg-secondary text-white flex items-center justify-center font-bold text-2xl rounded-xl">
              U
            </div>
            <p className="text-sm font-medium text-muted-foreground">© 2024 University of Life. Lived mastery, democratized.</p>
            <Link href="/about" className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:underline">
              The Manifesto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
