import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Shield, Sparkles, Landmark, GraduationCap } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-32 pb-32">
        {/* Hero Section - Proctor Centered and First */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16 space-y-8">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 px-6 py-2 text-sm font-black tracking-[0.2em] rounded-none uppercase italic">
              A New Registry of Human Mastery
            </Badge>
            <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9] max-w-5xl uppercase italic">
              Those who have done, <span className="text-secondary">can now teach.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-bold max-w-2xl leading-relaxed italic">
              Democratizing access to lived wisdom. Bypass the internship gatekeepers. 
              Digitalize your legacy into a private Wisdom Portal.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-24">
            <div className="relative">
              <div className="absolute -top-10 -left-10 hidden lg:block z-0">
                <div className="h-40 w-40 border-8 border-secondary opacity-20" />
              </div>
              <div className="relative z-10">
                <HeroChat />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden lg:block z-0">
                <div className="h-40 w-40 bg-black opacity-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t-8 border-black">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-none bg-black flex items-center justify-center">
                <Landmark className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-xl italic">Direct Source</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Learn from practitioners who lived the career, not institutional bureaucrats.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-none bg-secondary flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-xl italic">Bypass Barriers</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Direct mentoring for those denied a seat at the traditional table.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-none bg-black flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-xl italic">Own Your Legacy</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Architects retain full control of their intellectual property and tuition.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-none bg-secondary flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-xl italic">Private Portals</h3>
              <p className="text-sm font-bold text-muted-foreground italic">Custom-built ecosystems for specific domains of deep human mastery.</p>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-32 mt-32 border-t-8 border-black bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-5xl font-black tracking-tighter uppercase italic mb-20">The Guild of Global Mastery</h2>
            <div className="grid gap-12 sm:grid-cols-3">
              <div className="p-8 border-4 border-white rounded-none hover:bg-secondary transition-colors group cursor-default">
                <Sparkles className="h-12 w-12 mb-6 mx-auto group-hover:scale-110 transition-transform text-white" />
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-white italic">Wisdom Architects</h3>
                <p className="text-white/70 font-bold mb-8 italic">Decades of mastery. Now digitalized into a lasting legacy portal.</p>
                <Button asChild variant="outline" className="w-full h-14 text-white border-white bg-transparent rounded-none hover:bg-white hover:text-black font-black uppercase tracking-widest italic">
                  <Link href="/teacher/dashboard">Open Studio</Link>
                </Button>
              </div>
              
              <div className="p-8 border-4 border-secondary rounded-none hover:bg-white transition-colors group cursor-default bg-secondary text-white hover:text-black">
                <GraduationCap className="h-12 w-12 mb-6 mx-auto group-hover:scale-110 transition-transform text-white" />
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-white group-hover:text-black italic">Direct Students</h3>
                <p className="text-white group-hover:text-black font-bold mb-8 italic">Master the craft from those who actually do it. Bypass the gatekeepers.</p>
                <Button asChild className="w-full h-14 bg-black text-white rounded-none hover:bg-secondary font-black uppercase tracking-widest border-2 border-black italic">
                  <Link href="/learner/dashboard">Find a Portal</Link>
                </Button>
              </div>

              <div className="p-8 border-4 border-white rounded-none hover:bg-secondary transition-colors group cursor-default">
                <Landmark className="h-12 w-12 mb-6 mx-auto group-hover:scale-110 transition-transform text-white" />
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-white italic">Registry Admins</h3>
                <p className="text-white/70 font-bold mb-8 italic">Orchestrate and validate your organization's wisdom ecosystem.</p>
                <Button asChild variant="outline" className="w-full h-14 text-white border-white bg-transparent rounded-none hover:bg-white hover:text-black font-black uppercase tracking-widest italic">
                  <Link href="/admin/dashboard">Registry Stats</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t-8 border-black py-24 text-center bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="h-20 w-20 bg-black text-white flex items-center justify-center font-serif text-5xl font-black italic border-4 border-white">
              U
            </div>
            <div className="max-w-2xl space-y-4">
              <p className="font-black uppercase tracking-[0.4em] text-xs">University of Life</p>
              <p className="text-lg font-bold text-black/60 italic leading-relaxed">"The world doesn't need more institutions. It needs more sources of truth."</p>
            </div>
            <p className="opacity-40 font-black text-[10px] uppercase tracking-widest">© 2024 University of Life. All wisdom rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}