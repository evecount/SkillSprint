
"use client"

import Link from 'next/link';
import { Home, User, PlusCircle, Compass, ShieldCheck, Info } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = 'learner' }: NavbarProps) {
  const pathname = usePathname();

  const navItems = role === 'learner' ? [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Registry', icon: Compass, href: '/learner/dashboard' },
    { label: 'Manifesto', icon: Info, href: '/about' },
  ] : [
    { label: 'Studio', icon: ShieldCheck, href: '/teacher/dashboard' },
    { label: 'New Guild', icon: PlusCircle, href: '/admin/courses/new' },
    { label: 'Manifesto', icon: Info, href: '/about' },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden h-20 items-center border-b bg-background/80 backdrop-blur-xl md:flex">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white font-bold text-xl shadow-lg shadow-secondary/20">
              U
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight text-secondary">University</span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase -mt-0.5">of Life</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 cursor-pointer transition-colors overflow-hidden">
              <User className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-24 items-center border-t bg-background/95 backdrop-blur-xl md:hidden mobile-nav-shadow px-4">
        <div className="grid h-full w-full grid-cols-3 gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 rounded-2xl",
                pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-7 w-7", pathname === item.href && "fill-primary/10")} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
