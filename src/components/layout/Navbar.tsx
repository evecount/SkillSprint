
"use client"

import Link from 'next/link';
import { Home, BookOpen, User, PlusCircle, Compass, ShieldCheck } from 'lucide-react';
import { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = 'learner' }: NavbarProps) {
  const pathname = usePathname();

  const navItems = role === 'learner' ? [
    { label: 'Home', icon: Home, href: '/learner/dashboard' },
    { label: 'Apprentice', icon: Compass, href: '/learner/courses' },
    { label: 'Profile', icon: User, href: '/profile' },
  ] : [
    { label: 'Studio', icon: ShieldCheck, href: '/teacher/dashboard' },
    { label: 'New Guild', icon: PlusCircle, href: '/admin/courses/new' },
    { label: 'Profile', icon: User, href: '/profile' },
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center border-t bg-background/95 backdrop-blur-xl md:hidden">
        <div className="grid h-full w-full grid-cols-3">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all active:scale-95",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", pathname === item.href && "fill-primary/10")} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
