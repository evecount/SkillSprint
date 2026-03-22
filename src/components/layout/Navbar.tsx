"use client"

import Link from 'next/link';
import { Compass, BookOpen, User, LayoutDashboard, Info } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = 'learner' }: NavbarProps) {
  const pathname = usePathname();

  // 3-Tab Navigation: Explore (Discovery), Guilds (Activity), Identity (Profile)
  const navItems = role === 'learner' ? [
    { label: 'Explore', icon: Compass, href: '/learner/dashboard' },
    { label: 'Guilds', icon: '/learner/dashboard', href: '/learner/dashboard' }, // Links to active apprenticeships
    { label: 'Identity', icon: User, href: '/learner/dashboard' }, // Links to professional registry entry
  ] : [
    { label: 'Explore', icon: Compass, href: '/admin/dashboard' },
    { label: 'Studio', icon: LayoutDashboard, href: '/teacher/dashboard' },
    { label: 'Identity', icon: User, href: '/teacher/dashboard' },
  ];

  // Specific icons for Guilds/Studio
  const getIcon = (label: string) => {
    if (label === 'Explore') return Compass;
    if (label === 'Guilds') return BookOpen;
    if (label === 'Studio') return LayoutDashboard;
    if (label === 'Identity') return User;
    return Compass;
  };

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
            {navItems.map((item) => {
              const Icon = getIcon(item.label);
              return (
                <Link 
                  key={item.label}
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group py-2",
                    pathname === item.href ? "text-primary" : "text-white/60 hover:text-primary"
                  )}
                >
                  <Icon className={cn("h-4 w-4", pathname === item.href ? "fill-primary/20" : "")} />
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(162,84,28,0.5)]" />
                  )}
                </Link>
              );
            })}
            <Link 
              href="/about" 
              className="flex items-center gap-2 text-[9px] font-black text-white/30 hover:text-white uppercase tracking-[0.4em] transition-colors"
            >
              <Info className="h-3 w-3" /> Mission
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - High Intent Native Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] flex h-24 items-center border-t border-white/10 bg-secondary/95 backdrop-blur-3xl md:hidden mobile-nav-shadow px-6 pb-2">
        <div className="grid h-full w-full grid-cols-3 gap-4">
          {navItems.map((item) => {
            const Icon = getIcon(item.label);
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 transition-all active:scale-90 rounded-[2.5rem]",
                  pathname === item.href ? "text-primary bg-primary/10" : "text-white/40"
                )}
              >
                <Icon className={cn("h-6 w-6", pathname === item.href && "fill-primary/20")} />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
