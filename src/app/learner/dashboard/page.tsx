"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Trophy, ArrowRight, Play, Clock, Star, Zap } from 'lucide-react';
import { mockCourses, mockLearner, mockOrg } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { AIConsultant } from '@/components/consultant/AIConsultant';

export default function LearnerDashboard() {
  return (
    <div className="min-h-screen bg-background pb-32 pt-24">
      <Navbar role="learner" />
      
      <main className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm tracking-wider uppercase">
              <Zap className="h-4 w-4" />
              <span>Direct Student</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">My Registry</h1>
            <p className="text-muted-foreground font-medium">Moonlighting with human mastery.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-secondary text-white px-6 py-3 rounded-2xl shadow-xl shadow-secondary/20">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Level</p>
              <p className="text-2xl font-black">12</p>
            </div>
            <div className="bg-white border border-border text-secondary px-6 py-3 rounded-2xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Streak</p>
              <p className="text-2xl font-black flex items-center gap-2">
                <Flame className="h-6 w-6 text-primary fill-current" /> {mockLearner.streak}
              </p>
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-[2rem] border-none shadow-xl bg-secondary text-white overflow-hidden group">
            <div className="absolute -right-8 -top-8 h-40 w-40 bg-primary opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary">Global Wisdom XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black">{mockLearner.totalXP}</div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>To Level 13</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2 rounded-full bg-white/10" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow bg-white p-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Portals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-secondary">04</div>
              <p className="mt-2 text-xs font-medium text-muted-foreground">Engaging with 2 Wisdom Architects.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm hidden lg:block bg-white p-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Star className="h-7 w-7" />
              </div>
              <div>
                <p className="font-bold text-secondary">Fast Finisher</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Validated in &lt; 30s</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Guilds */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-secondary">Active Apprenticeships</h2>
            <Button variant="ghost" className="rounded-full font-bold hover:text-primary">
              All Guilds <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-[2.5rem] bg-white">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary/90 text-white border-none rounded-full px-3 py-1 text-[10px] font-bold tracking-wider">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-bold text-secondary leading-tight">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 font-medium">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 45m EST</span>
                      <span>4 / 12 Chapters</span>
                    </div>
                    <Progress value={33} className="h-2 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="px-8 pb-8 pt-0">
                  <Button asChild className="w-full h-12 rounded-2xl bg-primary hover:bg-accent text-white font-bold shadow-lg shadow-primary/10">
                    <Link href={`/learner/course/${course.id}`}>
                      <Play className="mr-2 h-4 w-4 fill-current" /> Return to Source
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