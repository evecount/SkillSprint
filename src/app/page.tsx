
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, GraduationCap, Landmark, Zap, DollarSign, Clock, Heart, Info, ArrowRight } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-12 pb-40 md:pt-24 overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col items-center text-center mb-12 space-y-6 pt-12">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-[10px] font-black tracking-[0.2em] uppercase rounded-full">
              The Registry of Direct Mastery
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter text-secondary leading-[0.9] max-w-6xl">
              Moonlight with <br />
              <span className="text-primary italic">The Masters.</span>
            </h1>
            <p className="text-base md:text-2xl text-muted-foreground font-medium max-w-3xl leading-relaxed mt-4">
              Monetize 30+ years of craft. Bypass institutional gatekeepers. A professional meritocracy for a generation that values direct excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="rounded-2xl bg-secondary hover:bg-secondary/90 text-white h-16 px-10 font-bold uppercase tracking-widest text-xs shadow-xl shadow-secondary/20">
                <Link href="/learner/dashboard">Find a Source</Link>
              </Button>
              <Button variant="ghost" asChild className="text-primary font-black hover:bg-primary/5 rounded-full h-16 px-10 uppercase tracking-widest text-xs">
                <Link href="/about" className="flex items-center gap-2">
                  <Info className="h-5 w-5" /> The Manifesto
                </Link>
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <HeroChat />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            <div className="group p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="h-14 w-14 rounded-3xl bg-primary/10 flex items-center justify-center mb-8">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-black text-2xl text-secondary mb-3 tracking-tight">Paid Mentorship</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">Own your legacy. Turn decades of practical truth into a professional side-hustle.</p>
            </div>
            <div className="group p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="h-14 w-14 rounded-3xl bg-secondary/10 flex items-center justify-center mb-8">
                <DollarSign className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-black text-2xl text-secondary mb-3 tracking-tight">Direct Tuition</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">Apprentices pay the source, not the campus. High-impact learning for the high-intent.</p>
            </div>
            <div className="group p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="h-14 w-14 rounded-3xl bg-primary/10 flex items-center justify-center mb-8">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-black text-2xl text-secondary mb-3 tracking-tight">Bypass Institutions</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">No gatekeepers. Here, your lived experience is the only asset that matters.</p>
            </div>
            <div className="group p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="h-14 w-14 rounded-3xl bg-secondary/10 flex items-center justify-center mb-8">
                <Clock className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-black text-2xl text-secondary mb-3 tracking-tight">After-Shift Mastery</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">Moonlight with a master after your day job. Mastery that fits your real life.</p>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-32 mt-32 bg-secondary text-white rounded-[4rem] mx-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto leading-none">
              Identify Your <span className="text-primary">Contribution.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/60 text-xl font-medium mb-20 leading-relaxed italic">
              "A reciprocal exchange for the new professional workforce. No gatekeepers, just truth."
            </p>
            
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group">
                <Zap className="h-12 w-12 mb-8 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-black mb-4 tracking-tight">Mentor / Lecturer</h3>
                <p className="text-white/60 text-base font-medium mb-10 leading-relaxed">Mind or craft. Structure your 30+ years of legacy into a professional paid side-hustle.</p>
                <Button asChild className="w-full rounded-[2rem] bg-primary hover:bg-accent text-white h-16 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Link href="/teacher/dashboard">Digitalize Legacy</Link>
                </Button>
              </div>
              
              <div className="p-10 rounded-[3rem] bg-primary text-white text-left shadow-[0_35px_60px_-15px_rgba(162,84,28,0.3)] scale-105 relative z-10">
                <div className="absolute -top-6 -right-6 h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <GraduationCap className="h-12 w-12 mb-8 text-white" />
                <h3 className="text-3xl font-black mb-4 tracking-tight">Apprentice / Student</h3>
                <p className="text-white/90 text-base font-medium mb-10 leading-relaxed">Direct access. Moonlight with the source and bypass the corporate internships.</p>
                <Button asChild className="w-full rounded-[2rem] bg-secondary hover:bg-secondary/90 text-white h-16 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Link href="/learner/dashboard">Find a Master</Link>
                </Button>
              </div>

              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group">
                <Landmark className="h-12 w-12 mb-8 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-black mb-4 tracking-tight">Registry Champion</h3>
                <p className="text-white/60 text-base font-medium mb-10 leading-relaxed">I can bring lots more people. Orchestrate the exchange and scale access to excellence.</p>
                <Button asChild variant="outline" className="w-full rounded-[2rem] border-white/20 text-white hover:bg-white hover:text-secondary h-16 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Link href="/admin/dashboard">Champion Registry</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-24 text-center border-t border-border/50 mb-32 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-secondary text-white font-black text-3xl shadow-xl shadow-secondary/20">
              U
            </Link>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">© 2024 University of Life. Lived mastery, democratized.</p>
            <Link href="/about" className="text-xs font-black text-primary uppercase tracking-[0.3em] hover:underline flex items-center gap-2">
              <Shield className="h-4 w-4" /> The Inner Temple Manifesto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
