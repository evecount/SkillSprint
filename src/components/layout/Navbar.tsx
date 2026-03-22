"use client"

import Link from 'next/link';
import { Home, User, Compass, Info, BookOpen, LayoutDashboard } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = 'learner' }: NavbarProps) {
  const pathname = usePathname();

  // Simplified navigation based on "Discovery", "Matches", and "Philosophy"
  const navItems = role === 'learner' ? [
    { label: 'Registry', icon: Compass, href: '/learner/dashboard' },
    { label: 'My Guilds', icon: BookOpen, href: '/learner/dashboard' }, // Simplified for MVP
    { label: 'Mission', icon: Info, href: '/about' },
  ] : [
    { label: 'Studio', icon: LayoutDashboard, href: '/teacher/dashboard' },
    { label: 'Registry', icon: Compass, href: '/admin/dashboard' },
    { label: 'Mission', icon: Info, href: '/about' },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden h-28 items-center border-b border-white/10 bg-secondary/80 backdrop-blur-2xl md:flex">
        <div className="container mx-auto flex items-center justify-between px-10">
          <Link href="/" className="flex items-center gap-6 hover:opacity-80 transition-opacity group">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white font-black text-3xl shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
              S
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-white">SkillSprint</span>
              <span className="text-[12px] font-black text-primary tracking-[0.4em] uppercase -mt-1">Registry</span>
            </div>
          </Link>

          <div className="flex items-center gap-14">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group py-2",
                  pathname === item.href ? "text-primary" : "text-white/60 hover:text-primary"
                )}
              >
                <item.icon className={cn("h-4 w-4", pathname === item.href ? "fill-primary/20" : "")} />
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(162,84,28,0.5)]" />
                )}
              </Link>
            ))}
            <div className="h-16 w-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all overflow-hidden border-2 border-white/5 hover:border-primary/30">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Native App Style (3 Core Tabs) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] flex h-24 items-center border-t border-white/10 bg-secondary/95 backdrop-blur-3xl md:hidden mobile-nav-shadow px-6 pb-2">
        <div className="grid h-full w-full grid-cols-3 gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-2 transition-all active:scale-90 rounded-[2.5rem]",
                pathname === item.href ? "text-primary bg-primary/10" : "text-white/40"
              )}
            >
              <item.icon className={cn("h-6 w-6", pathname === item.href && "fill-primary/20")} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
