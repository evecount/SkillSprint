import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Shield, Sparkles, Landmark, GraduationCap, Users, Zap, DollarSign, Clock } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-32 pb-32">
        {/* Hero Section - The Registry Hook */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16 space-y-8">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 px-6 py-2 text-sm font-black tracking-[0.2em] rounded-none uppercase italic">
              The Global Registry of Direct Human Mastery
            </Badge>
            <h1 className="font-headline text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.85] max-w-5xl uppercase italic">
              Stop Moonlighting in <span className="text-secondary">Dead Ends.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-bold max-w-3xl leading-relaxed italic">
              Bypass the institutional gatekeepers. Pay the Master directly. The University of Life turns 30 years of lived experience into the new economy of paid apprenticeships.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-24">
            <div className="relative">
              <div className="absolute -top-12 -left-12 hidden lg:block z-0">
                <div className="h-48 w-48 border-[12px] border-secondary opacity-20" />
              </div>
              <div className="relative z-10">
                <HeroChat />
              </div>
              <div className="absolute -bottom-12 -right-12 hidden lg:block z-0">
                <div className="h-48 w-48 bg-black opacity-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t-8 border-black">
            <div className="space-y-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="h-14 w-14 rounded-none bg-black flex items-center justify-center border-4 border-white shadow-none">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-2xl italic">Moonlight Mastery</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Work your shift, then master your craft with a practitioner who has actually done the work.</p>
            </div>
            <div className="space-y-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="h-14 w-14 rounded-none bg-secondary flex items-center justify-center border-4 border-white shadow-none">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-2xl italic">Master Side-Hustle</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Retirees finally monetize their legacy. Students invest in direct-from-source truth.</p>
            </div>
            <div className="space-y-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="h-14 w-14 rounded-none bg-black flex items-center justify-center border-4 border-white shadow-none">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-2xl italic">Bypass Gatekeepers</h3>
              <p className="text-sm font-bold text-muted-foreground italic">No internships. No hierarchy. Just a paid apprenticeship with the industry's veterans.</p>
            </div>
            <div className="space-y-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="h-14 w-14 rounded-none bg-secondary flex items-center justify-center border-4 border-white shadow-none">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-2xl italic">Paid Guilds</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Join high-impact, high-intent cohorts where human wisdom is the only currency.</p>
            </div>
          </div>
        </section>

        {/* Roles Section - The Exchange */}
        <section id="path" className="py-32 mt-32 border-t-8 border-black bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-8">Identify Your Exchange</h2>
            <p className="max-w-2xl mx-auto text-white/60 text-xl font-bold mb-20 italic">A symbiotic marketplace for the new workforce. Own your legacy or fund your future.</p>
            
            <div className="grid gap-12 sm:grid-cols-3">
              {/* Teacher Path */}
              <div className="p-10 border-8 border-white rounded-none hover:bg-secondary transition-colors group cursor-default">
                <Sparkles className="h-16 w-16 mb-8 mx-auto group-hover:scale-110 transition-transform text-white" />
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-white italic">Wisdom Architect</h3>
                <p className="text-white/70 font-bold mb-10 italic">"I have done the work." Digitalize your legacy into a paid side-hustle. You earn what you're worth.</p>
                <Button asChild variant="outline" className="w-full h-16 text-xl text-white border-4 border-white bg-transparent rounded-none hover:bg-white hover:text-black font-black uppercase tracking-widest italic">
                  <Link href="/teacher/dashboard">Architect Side-Hustle</Link>
                </Button>
              </div>
              
              {/* Learner Path */}
              <div className="p-10 border-8 border-secondary rounded-none hover:bg-white transition-colors group cursor-default bg-secondary text-white hover:text-black">
                <GraduationCap className="h-16 w-16 mb-8 mx-auto group-hover:scale-110 transition-transform text-white group-hover:text-black" />
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-white group-hover:text-black italic">Source Apprentice</h3>
                <p className="text-white group-hover:text-black font-bold mb-10 italic">"I want mastery." Invest in direct access to a veteran. Moonlight your way to a real career.</p>
                <Button asChild className="w-full h-16 text-xl bg-black text-white rounded-none hover:bg-secondary font-black uppercase tracking-widest border-4 border-black italic">
                  <Link href="/learner/dashboard">Fund Your Mastery</Link>
                </Button>
              </div>

              {/* Admin Path */}
              <div className="p-10 border-8 border-white rounded-none hover:bg-secondary transition-colors group cursor-default">
                <Landmark className="h-16 w-16 mb-8 mx-auto group-hover:scale-110 transition-transform text-white" />
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-white italic">Registry Champion</h3>
                <p className="text-white/70 font-bold mb-10 italic">"I bring the guild." Scale access to direct mastery. Bridge the gap for the new workforce.</p>
                <Button asChild variant="outline" className="w-full h-16 text-xl text-white border-4 border-white bg-transparent rounded-none hover:bg-white hover:text-black font-black uppercase tracking-widest italic">
                  <Link href="/admin/dashboard">Champion Registry</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t-8 border-black py-24 text-center bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10">
            <div className="h-24 w-24 bg-black text-white flex items-center justify-center font-serif text-6xl font-black italic border-8 border-secondary">
              U
            </div>
            <div className="max-w-2xl space-y-6">
              <p className="font-black uppercase tracking-[0.6em] text-sm">University of Life</p>
              <p className="text-2xl font-bold text-black/60 italic leading-relaxed">"Retirees aren't all billionaires. Their lived wisdom is our greatest untapped economy."</p>
            </div>
            <p className="opacity-40 font-black text-[10px] uppercase tracking-widest">© 2024 University of Life. All mastery rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
