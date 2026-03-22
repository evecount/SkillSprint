
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="h-screen bg-secondary text-white selection:bg-primary/30 flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Main content area optimized for full-height Discovery engine */}
      <main className="flex-1 pt-20 pb-4 flex flex-col items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 w-full max-w-5xl h-full flex flex-col items-center justify-center">
          {/* The HomeDiscovery engine - Fixed height container to prevent collapse */}
          <div className="w-full max-w-[800px] h-[85vh] min-h-[500px] max-h-[700px] flex flex-col">
            <HeroChat />
          </div>
        </div>
      </main>
      
      <footer className="bg-black/40 border-t border-white/5 py-3 px-4 z-50 hidden md:block shrink-0">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
             <Link href="/" className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center font-black text-white text-[10px] shadow-lg shadow-primary/20">S</div>
                <span className="text-[10px] font-black tracking-tighter">SkillSprint</span>
             </Link>
             <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 Career Mastery Sanctuary</span>
          </div>
          <div className="flex gap-8">
            {['Mission', 'Ethics', 'Connect', 'Archive'].map((item) => (
              <Link key={item} href={item === 'Mission' ? '/about' : '#'} className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
