import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Info, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary/30 flex flex-col">
      <Navbar role="learner" />
      
      <main className="flex-1 pt-24 pb-40 overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
          
          <div className="flex flex-col items-center text-center mb-16 space-y-6 pt-12">
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 px-6 py-2 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
              Professional Apprenticeship Registry
            </Badge>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] max-w-5xl">
              Master the Craft, <br />
              <span className="text-primary italic">Skip the Loop.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed mt-6 italic">
              "Trade money for time. Masters: Monetize your legacy. Students: Get real work in the field by buying back years of trial and error."
            </p>
          </div>

          {/* The Entry - HeroChat handles role selection & swiping on Portals */}
          <div className="max-w-4xl mx-auto mb-20">
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
      
      {/* Professional Footer */}
      <footer className="bg-black/40 border-t border-white/5 py-20 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white font-black text-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                  S
                </div>
                <span className="text-xl font-black tracking-tighter">SkillSprint</span>
              </Link>
              <p className="text-white/40 text-sm font-medium leading-relaxed">
                The professional sanctuary for career legacy and practical excellence. Bypassing institutional loops through direct mastery exchange.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Registry</h4>
              <ul className="space-y-4">
                <li><Link href="/learner/dashboard" className="text-sm text-white/60 hover:text-white transition-colors font-bold">Find a Mentor</Link></li>
                <li><Link href="/teacher/dashboard" className="text-sm text-white/60 hover:text-white transition-colors font-bold">Launch a Guild</Link></li>
                <li><Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors font-bold">The Mission</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Support</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors font-bold">Ethics Charter</Link></li>
                <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors font-bold">Tuition FAQ</Link></li>
                <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors font-bold">Privacy</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Connect</h4>
              <div className="flex gap-4">
                <Link href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 SkillSprint. All Rights Reserved.</p>
            <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
              <div className="h-1 w-1 rounded-full bg-primary" />
              Built for the New Workforce
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
