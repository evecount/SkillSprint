import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Info, ArrowRight } from 'lucide-react';
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
              The Professional Apprenticeship Registry
            </Badge>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] max-w-5xl">
              Mastery, <br />
              <span className="text-primary italic">Fast-Tracked.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed mt-6 italic">
              "Skip the gatekeepers. Retirees: Monetize your legacy. Students: Buy back your time with direct access to practical excellence."
            </p>
          </div>

          {/* The Entry - HeroChat handles role selection */}
          <div className="max-w-3xl mx-auto mb-20">
            <HeroChat />
          </div>

          {/* Minimal Mission Link */}
          <div className="text-center">
            <Link href="/about" className="inline-flex items-center gap-3 text-xs font-black text-primary uppercase tracking-[0.4em] hover:text-white transition-colors group">
              <Info className="h-5 w-5" /> Our Theory of Practice <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="py-24 text-center border-t border-white/10 mb-32 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white font-black text-3xl shadow-xl shadow-primary/20">
              S
            </div>
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">© 2024 SkillSprint. Professional Mastery, Fast-Tracked.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
