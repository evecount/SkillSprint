
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
    { label: 'Temple', icon: Info, href: '/about' },
  ] : [
    { label: 'Studio', icon: ShieldCheck, href: '/teacher/dashboard' },
    { label: 'New Guild', icon: PlusCircle, href: '/admin/courses/new' },
    { label: 'Temple', icon: Info, href: '/about' },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden h-24 items-center border-b bg-background/80 backdrop-blur-xl md:flex">
        <div className="container mx-auto flex items-center justify-between px-10">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-secondary text-white font-black text-2xl shadow-xl shadow-secondary/20 group-hover:scale-110 transition-transform">
              U
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-secondary">University</span>
              <span className="text-[11px] font-black text-primary tracking-[0.3em] uppercase -mt-1">of Life</span>
            </div>
          </Link>

          <div className="flex items-center gap-12">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all relative group",
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className={cn("h-4 w-4", pathname === item.href ? "fill-primary/10" : "")} />
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <div className="h-12 w-12 rounded-[1.25rem] bg-muted flex items-center justify-center hover:bg-muted/80 cursor-pointer transition-all overflow-hidden border-2 border-transparent hover:border-primary/20">
              <User className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Large and Tactile */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] flex h-28 items-center border-t bg-background/95 backdrop-blur-2xl md:hidden mobile-nav-shadow px-6 pb-2">
        <div className="grid h-full w-full grid-cols-3 gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-2 transition-all active:scale-90 rounded-[2rem]",
                pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-8 w-8", pathname === item.href && "fill-primary/10")} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
