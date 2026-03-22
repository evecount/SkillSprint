
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Info, Star, Zap, GraduationCap, ArrowRight } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary/30">
      <Navbar role="learner" />
      
      <main className="pt-24 pb-40 overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
          
          <div className="flex flex-col items-center text-center mb-16 space-y-6 pt-12">
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 px-6 py-2 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
              The Registry of Direct Mastery
            </Badge>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] max-w-5xl">
              Buy Back <br />
              <span className="text-primary italic">Your Time.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed mt-6 italic">
              "Retirees: Turn your 30+ years of craft into a paid side-hustle. Students: Pay for direct access to the source and stop wasting time on gatekept 'experience'."
            </p>
          </div>

          {/* The "Tinder" Entry - HeroChat handles the role selection and onboarding */}
          <div className="max-w-3xl mx-auto mb-32">
            <HeroChat />
          </div>

          {/* Core Values - High Contrast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 group">
              <div className="h-16 w-16 rounded-3xl bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-black text-3xl mb-4 tracking-tight">Paid Legacy</h3>
              <p className="text-white/50 text-base font-medium leading-relaxed italic">Retirees: stop being sidelined. Your sacrificed time is a treasure. Digitalize your truth and get paid for your mastery.</p>
            </div>
            
            <div className="p-10 rounded-[3rem] bg-primary text-white shadow-[0_0_50px_-12px_rgba(162,84,28,0.4)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <Star className="h-32 w-32" />
              </div>
              <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center mb-8">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-black text-3xl mb-4 tracking-tight">Direct Access</h3>
              <p className="text-white/90 text-base font-medium leading-relaxed italic">Stop begging for internships. Pay to learn how to DO. Trade money for the master's time and bypass the entry-level loop.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 group">
              <div className="h-16 w-16 rounded-3xl bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-black text-3xl mb-4 tracking-tight">No Educational Moats</h3>
              <p className="text-white/50 text-base font-medium leading-relaxed italic">With AI, information is free. But lived truth is finite. We focus on the practical excellence that institutional gatekeepers can't provide.</p>
            </div>
          </div>
        </section>

        {/* The Manifesto CTA */}
        <section className="mt-40 text-center space-y-8">
          <Link href="/about" className="inline-flex items-center gap-3 text-xs font-black text-primary uppercase tracking-[0.4em] hover:text-white transition-colors group">
            <Info className="h-5 w-5" /> The Inner Temple Manifesto <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </section>
      </main>
      
      <footer className="py-24 text-center border-t border-white/10 mb-32 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white font-black text-3xl shadow-xl shadow-primary/20">
              U
            </div>
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">© 2024 University of Life. Time for Mastery, Democratized.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
