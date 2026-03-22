
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-white selection:bg-primary/30 flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-8 overflow-y-auto lg:overflow-hidden scrollbar-hide">
        <div className="container mx-auto px-4 h-full max-w-5xl">
          <div className="h-full flex items-stretch justify-center">
            {/* The HomeDiscovery engine */}
            <div className="w-full max-w-[800px] h-full min-h-[600px] flex flex-col">
              <HeroChat />
            </div>
          </div>
        </div>
      </main>
      
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
            {['Mission', 'Ethics', 'Connect', 'Archive'].map((item) => (
              <Link key={item} href={item === 'Mission' ? '/about' : '#'} className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
