import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Info, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary/30 flex flex-col overflow-hidden">
      <Navbar role="learner" />
      
      <main className="flex-1 pt-32 pb-8 overflow-y-auto lg:overflow-hidden scrollbar-hide">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
            
            {/* Left Column: Mission & Identity Card */}
            <div className="lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="flex-1 p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 text-[8px] font-black tracking-[0.3em] uppercase rounded-full mb-8">
                    SkillSprint Registry
                  </Badge>
                  <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-8">
                    Master the Craft, <br />
                    <span className="text-primary italic">Skip the Loop.</span>
                  </h1>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Zap className="h-6 w-6 text-primary shrink-0" />
                      <p className="text-sm font-medium leading-relaxed opacity-60">
                        Trading money for time. Veterans monetize their truth. Apprentices buy back years of struggle.
                      </p>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      <p className="text-sm font-medium leading-relaxed opacity-60">
                        Practical Excellence over paper credentials. Direct entry to the industries that locked you out.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-white/5 mt-8">
                  <Link href="/about" className="inline-flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:text-white transition-colors group">
                    <Info className="h-5 w-5" /> Our Theory of Practice <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Registry & Matcher (HeroChat) */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-[600px] lg:min-h-0">
              <HeroChat />
            </div>
            
          </div>
        </div>
      </main>
      
      {/* Compact Professional Footer */}
      <footer className="bg-black/40 border-t border-white/5 py-6 px-4 z-50 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
             <Link href="/" className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center font-black text-white text-xs shadow-lg shadow-primary/20">S</div>
                <span className="text-xs font-black tracking-tighter">SkillSprint</span>
             </Link>
             <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 Career Mastery Sanctuary</span>
          </div>
          <div className="flex gap-10">
            {['Ethics', 'Safety', 'Connect', 'Archive'].map((item) => (
              <Link key={item} href="#" className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}