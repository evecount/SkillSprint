import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Info, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary/30 flex flex-col overflow-hidden">
      <Navbar role="learner" />
      
      <main className="flex-1 pt-24 pb-12 overflow-y-auto md:overflow-hidden scrollbar-hide">
        <div className="container mx-auto px-4 h-full">
          <div className="relative h-full flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] -z-10" />
            
            {/* Left: Compact Hero Card */}
            <div className="w-full lg:w-1/3 space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 text-[8px] font-black tracking-[0.3em] uppercase rounded-full mb-6">
                  SkillSprint Registry
                </Badge>
                <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6">
                  Master the Craft, <br />
                  <span className="text-primary italic">Skip the Loop.</span>
                </h1>
                <p className="text-lg text-white/60 font-medium leading-relaxed italic">
                  Trade money for time. Practitioners: Monetize your legacy. Apprentices: Get real work by buying back years of trial and error.
                </p>
                <div className="pt-8 border-t border-white/5 mt-8">
                  <Link href="/about" className="inline-flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:text-white transition-colors group">
                    <Info className="h-5 w-5" /> Mission & Theory <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: The Match Gateway (HeroChat) */}
            <div className="w-full lg:w-2/3 h-full flex items-center justify-center max-h-[850px]">
              <HeroChat />
            </div>
          </div>
        </div>
      </main>
      
      {/* Slim Footer for Compact View */}
      <footer className="bg-black/40 border-t border-white/5 py-6 px-4 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
             <Link href="/" className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center font-black text-white text-xs">S</div>
                <span className="text-xs font-black tracking-tighter">SkillSprint</span>
             </Link>
             <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 Registry Sanctuary</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-primary transition-colors">Ethics</Link>
            <Link href="#" className="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-primary transition-colors">FAQ</Link>
            <Link href="#" className="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-primary transition-colors">Connect</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
