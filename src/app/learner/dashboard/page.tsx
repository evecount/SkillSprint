"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Trophy, ArrowRight, Play, Clock, Star } from 'lucide-react';
import { mockCourses, mockLearner, mockOrg } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { AIConsultant } from '@/components/consultant/AIConsultant';

export default function LearnerDashboard() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-16">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2 text-center md:text-left">
          <h1 className="font-headline text-3xl font-bold">Welcome back, {mockLearner.name}!</h1>
          <p className="text-muted-foreground">You're on a {mockLearner.streak}-day streak. Keep it up!</p>
        </div>

        {/* Hero Gamification Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-primary text-primary-foreground border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-secondary fill-current" /> Daily Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{mockLearner.streak} Days</div>
              <p className="mt-2 text-primary-foreground/80 text-sm">Complete a module today to keep the momentum!</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-primary" /> Total XP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">{mockLearner.totalXP}</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Level 12</span>
                  <span>250 XP to Level 13</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="hidden lg:block shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-secondary fill-current" /> Recent Achievement
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-sm">Fast Finisher</div>
                <p className="text-xs text-muted-foreground">Finished a quiz in under 30s</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold">Your Training Path</h2>
            <Button variant="ghost" className="text-primary hover:bg-primary/5">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden shadow-md border-none transition-all hover:shadow-xl group">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 45m
                      </span>
                      <span>4 / 12 modules</span>
                    </div>
                    <Progress value={33} className="h-1.5" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full h-11">
                    <Link href={`/learner/course/${course.id}`}>
                      <Play className="mr-2 h-4 w-4 fill-current" /> Continue Learning
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* AI Onboarding Consultant */}
      <AIConsultant 
        userName={mockLearner.name} 
        role="learner" 
        orgName={mockOrg.name} 
      />
    </div>
  );
}
