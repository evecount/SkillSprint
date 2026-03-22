"use client"

import Link from 'next/link';
import { Trophy, Home, BookOpen, BarChart2, User, LayoutDashboard, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = 'learner' }: NavbarProps) {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:top-0 md:bottom-auto md:left-0 md:right-0">
      <div className="container mx-auto">
        <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl md:rounded-none md:border-none md:bg-white md:shadow-sm md:border-b h-16 md:h-20 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 font-headline hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white font-bold text-xl shadow-lg shadow-secondary/20">
              U
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight text-secondary">University</span>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase -mt-0.5">of Life</span>
            </div>
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            {role === 'learner' && (
              <>
                <Link href="/learner/dashboard" className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                  <Home className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden xs:inline">Dashboard</span>
                </Link>
                <Link href="/learner/courses" className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                  <BookOpen className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden xs:inline">My Guilds</span>
                </Link>
                <div className="hidden md:flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary border border-primary/20">
                  <Trophy className="h-4 w-4" />
                  <span className="font-bold text-xs">1,250 XP</span>
                </div>
              </>
            )}

            {role === 'teacher' && (
              <>
                <Link href="/teacher/dashboard" className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                  <LayoutDashboard className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden xs:inline">Studio</span>
                </Link>
                <Link href="/admin/courses/new" className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors md:flex-row md:text-xs">
                  <PlusCircle className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden xs:inline">New Guild</span>
                </Link>
              </>
            )}

            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 cursor-pointer transition-colors overflow-hidden">
              <User className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}