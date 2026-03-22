
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
    <div className="min-h-screen bg-background pb-32 pt-24 md:pt-24">
      <Navbar role="learner" />
      
      <main className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-0.5">
            <h1 className="text-3xl font-black text-secondary tracking-tighter leading-none mb-1">My <span className="text-primary italic">Join.</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Active Apprenticeship Cycles</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-secondary text-white px-4 py-2.5 rounded-2xl shadow-xl shadow-secondary/10 flex items-center gap-4 border border-white/5">
              <div>
                <p className="text-[7px] font-black uppercase tracking-widest text-primary mb-0">Level</p>
                <p className="text-lg font-black leading-none">12</p>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <p className="text-[7px] font-black uppercase tracking-widest text-primary mb-0">Streak</p>
                <p className="text-lg font-black leading-none flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-primary fill-current" /> {mockLearner.streak}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Pills - More Compact */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="bg-primary text-white p-5 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 h-20 w-20 bg-white/10 rounded-full group-hover:scale-110 transition-transform" />
            <p className="text-[7px] font-black uppercase tracking-widest mb-1">Global Mastery XP</p>
            <p className="text-3xl font-black">{mockLearner.totalXP}</p>
            <Progress value={75} className="h-1 mt-3 rounded-full bg-white/20" />
          </div>
          
          <div className="bg-white p-5 rounded-[2rem] border border-black/5 flex flex-col justify-center">
            <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-1">Active Portals</p>
            <p className="text-3xl font-black text-secondary">04</p>
          </div>

          <div className="bg-white p-5 rounded-[2rem] border border-black/5 flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-secondary leading-none text-xs">Fast Finisher</p>
                <p className="text-[7px] text-muted-foreground uppercase tracking-widest font-black mt-0.5">Lived Achievement</p>
              </div>
          </div>
        </div>

        {/* Active Cycles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-black text-secondary tracking-tight">Current Apprenticeships</h2>
            <Button variant="ghost" className="rounded-full font-black text-[9px] uppercase tracking-widest hover:text-primary p-0 h-auto">
              Archive <ArrowRight className="ml-1.5 h-3 w-3" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-[2rem] bg-white flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-secondary/90 text-white border-none rounded-full px-2 py-0.5 text-[7px] font-black tracking-widest uppercase">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-5 flex-1">
                  <CardTitle className="text-base font-black text-secondary leading-tight">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5 font-medium italic text-[10px] leading-relaxed">"{course.description}"</CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[7px] font-black uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> 45m Session</span>
                      <span>4 / 12 Chapters</span>
                    </div>
                    <Progress value={33} className="h-1 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-6 pt-0">
                  <Button asChild className="w-full h-10 rounded-xl bg-primary hover:bg-accent text-white font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20">
                    <Link href={`/learner/course/${course.id}`}>
                      <Play className="mr-2 h-2.5 w-2.5 fill-current" /> Return to Source
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
