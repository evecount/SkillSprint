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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-md md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif">
            U
          </div>
          <span className="hidden sm:inline">University of Life</span>
        </Link>

        <div className="flex flex-1 justify-around md:flex-none md:justify-end md:gap-6">
          {role === 'learner' && (
            <>
              <Link href="/learner/dashboard" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary md:flex-row md:text-sm">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/learner/courses" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary md:flex-row md:text-sm">
                <BookOpen className="h-5 w-5" />
                <span>My Portals</span>
              </Link>
              <div className="hidden md:flex flex-col items-center gap-1 text-xs text-muted-foreground md:flex-row md:text-sm">
                <div className="flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-1 text-secondary">
                  <Trophy className="h-4 w-4" />
                  <span className="font-bold">1,250 XP</span>
                </div>
              </div>
            </>
          )}

          {role === 'teacher' && (
            <>
              <Link href="/teacher/dashboard" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary md:flex-row md:text-sm">
                <LayoutDashboard className="h-5 w-5" />
                <span>My Studio</span>
              </Link>
              <Link href="/admin/courses/new" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary md:flex-row md:text-sm">
                <PlusCircle className="h-5 w-5" />
                <span>New Portal</span>
              </Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Link href="/admin/dashboard" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary md:flex-row md:text-sm">
                <BarChart2 className="h-5 w-5" />
                <span>Insights</span>
              </Link>
              <Link href="/admin/users" className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary md:flex-row md:text-sm">
                <User className="h-5 w-5" />
                <span>Community</span>
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:block">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
