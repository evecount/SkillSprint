"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Trophy, ArrowRight, Play, Clock, Star, Zap, Landmark } from 'lucide-react';
import { mockCourses, mockLearner, mockOrg } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { AIConsultant } from '@/components/consultant/AIConsultant';

export default function LearnerDashboard() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <Navbar role="learner" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 border-b-8 border-black pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Zap className="h-6 w-6 text-secondary" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Direct Student</span>
            </div>
            <h1 className="font-headline text-5xl font-black uppercase italic tracking-tighter">My Registry</h1>
            <p className="text-muted-foreground font-bold italic mt-2">Connecting directly with human mastery.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-black text-white px-8 py-4 border-4 border-black text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">Current Level</p>
              <p className="text-3xl font-black italic">12</p>
            </div>
            <div className="bg-white text-black px-8 py-4 border-4 border-black text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Streak</p>
              <p className="text-3xl font-black italic flex items-center justify-center gap-2">
                <Flame className="h-6 w-6 text-secondary fill-current" /> {mockLearner.streak}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Gamification Stats */}
        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-4 border-black shadow-none rounded-none bg-black text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Trophy className="h-32 w-32" />
            </div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-secondary">Global Wisdom XP</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-6xl font-black italic">{mockLearner.totalXP}</div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span>To Level 13</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-4 border-2 border-white rounded-none bg-white/10" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-4 border-black shadow-none rounded-none bg-white group hover:bg-muted/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Active Portals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-black italic">04</div>
              <p className="mt-4 text-xs font-bold italic text-muted-foreground">Engaging directly with 2 Wisdom Architects.</p>
            </CardContent>
          </Card>

          <Card className="border-4 border-black shadow-none rounded-none bg-white hidden lg:block group hover:bg-muted/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center bg-secondary text-white border-4 border-black">
                <Star className="h-8 w-8" />
              </div>
              <div>
                <div className="font-black text-lg uppercase italic tracking-tight">Fast Finisher</div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mastery validated in &lt; 30s</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Courses */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <h2 className="font-headline text-3xl font-black uppercase italic tracking-tighter">My Active Path</h2>
            <Button variant="ghost" className="font-black uppercase tracking-widest italic hover:bg-black hover:text-white rounded-none">
              Directory of Portals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <Card key={course.id} className="border-4 border-black shadow-none rounded-none overflow-hidden group hover:border-secondary transition-all">
                <div className="relative aspect-video w-full border-b-4 border-black overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black text-white border-none rounded-none font-black uppercase tracking-widest text-[10px] px-3 py-1 italic">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-2xl font-black uppercase italic leading-none">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 font-bold italic mt-2 text-black/60">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 45m EST
                      </span>
                      <span>4 / 12 Chapters</span>
                    </div>
                    <Progress value={33} className="h-4 border-2 border-black rounded-none bg-muted/20" />
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full h-14 bg-black text-white hover:bg-secondary rounded-none font-black uppercase tracking-widest italic border-2 border-black">
                    <Link href={`/learner/course/${course.id}`}>
                      <Play className="mr-3 h-5 w-5 fill-current" /> Return to Source
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <AIConsultant 
        userName={mockLearner.name} 
        role="learner" 
        orgName={mockOrg.name} 
      />
    </div>
  );
}
