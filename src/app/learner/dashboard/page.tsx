
"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight, Play, Clock, Star, Zap } from 'lucide-react';
import { mockCourses, mockLearner } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';

export default function LearnerDashboard() {
  return (
    <div className="min-h-screen bg-background pb-32 pt-28 md:pt-32">
      <Navbar role="learner" />
      
      <main className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-secondary tracking-tighter leading-none mb-2">My <span className="text-primary italic">Join.</span></h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Active Apprenticeship Cycles</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-secondary text-white px-5 py-3 rounded-2xl shadow-xl shadow-secondary/10 flex items-center gap-4 border border-white/5">
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-primary mb-0.5">Level</p>
                <p className="text-xl font-black leading-none">12</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-primary mb-0.5">Streak</p>
                <p className="text-xl font-black leading-none flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-primary fill-current" /> {mockLearner.streak}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="bg-primary text-white p-6 rounded-[2.5rem] shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform" />
            <p className="text-[8px] font-black uppercase tracking-widest mb-1">Global Mastery XP</p>
            <p className="text-4xl font-black">{mockLearner.totalXP}</p>
            <Progress value={75} className="h-1.5 mt-4 rounded-full bg-white/20" />
          </div>
          
          <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 flex flex-col justify-center">
            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">Active Portals</p>
            <p className="text-4xl font-black text-secondary">04</p>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-secondary/5 text-secondary flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="font-black text-secondary leading-none text-sm">Fast Finisher</p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest font-black mt-1">Lived Achievement</p>
              </div>
          </div>
        </div>

        {/* Active Cycles */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-secondary tracking-tight">Current Apprenticeships</h2>
            <Button variant="ghost" className="rounded-full font-black text-[10px] uppercase tracking-widest hover:text-primary p-0 h-auto">
              Archive <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-[2.5rem] bg-white flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary/90 text-white border-none rounded-full px-3 py-1 text-[8px] font-black tracking-widest uppercase">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6 flex-1">
                  <CardTitle className="text-lg font-black text-secondary leading-tight">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 font-medium italic text-xs leading-relaxed">"{course.description}"</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 45m Session</span>
                      <span>4 / 12 Chapters</span>
                    </div>
                    <Progress value={33} className="h-1.5 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-8 pt-0">
                  <Button asChild className="w-full h-12 rounded-2xl bg-primary hover:bg-accent text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                    <Link href={`/learner/course/${course.id}`}>
                      <Play className="mr-2 h-3 w-3 fill-current" /> Return to Source
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
