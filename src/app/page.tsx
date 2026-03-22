import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Sparkles, Landmark, GraduationCap, Users, Zap, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-24 pb-32 overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex flex-col items-center text-center mb-12 space-y-6 pt-12">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full">
              The Guild of Direct Human Mastery
            </Badge>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-secondary leading-tight max-w-5xl">
              Master Your Craft. <br />
              <span className="text-primary italic">Pay the Source.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Bypass the gatekeepers. Moonlight with practitioners who have done the work. Retirees turn 30 years of truth into the new economy of apprenticeships.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-24 transition-all duration-500 hover:scale-[1.01]">
            <HeroChat />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">Moonlight Mastery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Work your shift, then master your craft with a veteran practitioner.</p>
            </div>
            <div className="group p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">Monetize Legacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Retirees monetize 30 years of truth. Students invest in direct mastery.</p>
            </div>
            <div className="group p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">No Gatekeepers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">No nepotism. No institutional hierarchy. Just a direct apprenticeship.</p>
            </div>
            <div className="group p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-xl text-secondary mb-2">Real Outcomes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Join high-intent cohorts where human wisdom is the primary currency.</p>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section id="path" className="py-24 mt-24 bg-secondary text-white rounded-[3rem] mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Identify Your Contribution</h2>
            <p className="max-w-xl mx-auto text-white/60 text-lg mb-16">A symbiotic marketplace for the new workforce.</p>
            
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                <Sparkles className="h-10 w-10 mb-6 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Wisdom Architect</h3>
                <p className="text-white/60 text-sm mb-8">Own your legacy. Structure your lived mastery into a paid apprenticeship.</p>
                <Button asChild className="w-full rounded-2xl bg-primary hover:bg-accent text-white h-12">
                  <Link href="/teacher/dashboard">Architect a Guild</Link>
                </Button>
              </div>
              
              <div className="p-8 rounded-3xl bg-primary text-white text-left shadow-2xl shadow-primary/20">
                <GraduationCap className="h-10 w-10 mb-6 text-white" />
                <h3 className="text-2xl font-bold mb-3">Source Student</h3>
                <p className="text-white/80 text-sm mb-8">Invest in direct access. Moonlight your way to a career that actually matters.</p>
                <Button asChild className="w-full rounded-2xl bg-secondary hover:bg-secondary/90 text-white h-12">
                  <Link href="/learner/dashboard">Fund Your Mastery</Link>
                </Button>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                <Landmark className="h-10 w-10 mb-6 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Registry Champion</h3>
                <p className="text-white/60 text-sm mb-8">Democratize access. Bring hungry communities to these direct sources.</p>
                <Button asChild variant="outline" className="w-full rounded-2xl border-white/20 text-white hover:bg-white hover:text-secondary h-12">
                  <Link href="/admin/dashboard">Champion Registry</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-16 text-center border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="h-12 w-12 bg-secondary text-white flex items-center justify-center font-bold text-2xl rounded-xl">
              U
            </div>
            <p className="text-sm font-medium text-muted-foreground">© 2024 University of Life. Lived mastery, democratized.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}