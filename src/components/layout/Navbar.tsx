"use client"

import Link from 'next/link';
import { Trophy, Home, BookOpen, BarChart2, User, LayoutDashboard, PlusCircle, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = 'learner' }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 backdrop-blur-xl md:top-0 md:bottom-auto md:border-t-0 md:border-b shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 font-headline text-2xl font-black text-foreground tracking-tight hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif shadow-lg">
            U
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black uppercase tracking-[0.1em]">University</span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] -mt-0.5">of Life</span>
          </div>
        </Link>

        <div className="flex flex-1 justify-around md:flex-none md:justify-end md:gap-10">
          {role === 'learner' && (
            <>
              <Link href="/learner/dashboard" className="flex flex-col items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/learner/courses" className="flex flex-col items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                <BookOpen className="h-5 w-5" />
                <span>My Portals</span>
              </Link>
              <div className="hidden md:flex flex-col items-center gap-1 text-xs md:flex-row">
                <div className="flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-secondary border border-secondary/10">
                  <Trophy className="h-4 w-4" />
                  <span className="font-black text-[10px] tracking-widest uppercase">1,250 XP</span>
                </div>
              </div>
            </>
          )}

          {role === 'teacher' && (
            <>
              <Link href="/teacher/dashboard" className="flex flex-col items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                <LayoutDashboard className="h-5 w-5" />
                <span>Wisdom Studio</span>
              </Link>
              <Link href="/admin/courses/new" className="flex flex-col items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                <PlusCircle className="h-5 w-5" />
                <span>New Portal</span>
              </Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Link href="/admin/dashboard" className="flex flex-col items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                <BarChart2 className="h-5 w-5" />
                <span>Campus Stats</span>
              </Link>
              <Link href="/admin/users" className="flex flex-col items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                <User className="h-5 w-5" />
                <span>Registry</span>
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:block">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-muted/50">
            <User className="h-6 w-6 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </nav>
  );
}