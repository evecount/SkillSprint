"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Users, MessageSquare, Sparkles, ArrowRight, Landmark } from 'lucide-react';
import Link from 'next/link';
import { AIConsultant } from '@/components/consultant/AIConsultant';
import { mockCourses, mockTeacher, mockOrg } from '@/lib/mock-data';
import Image from 'next/image';

export default function TeacherDashboard() {
  const teacherCourses = mockCourses.filter(c => c.authorId === mockTeacher.id);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-16">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-1 text-primary">
              <Landmark className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Master Architect</span>
            </div>
            <h1 className="font-headline text-3xl font-bold">Wisdom Studio</h1>
            <p className="text-muted-foreground">Curate your legacy for the University of Life community.</p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-5 w-5" /> Architect New Portal
            </Link>
          </Button>
        </div>

        {/* Teacher Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Portals</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherCourses.length}</div>
              <p className="text-xs text-muted-foreground">Across 2 faculties</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentees Enrolled</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">482</div>
              <p className="text-xs text-green-600 font-medium">+15% inquiry this week</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Legacy Score</CardTitle>
              <Sparkles className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84%</div>
              <p className="text-xs text-muted-foreground">High understanding rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">My Active Portals</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teacherCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden shadow-md border-none group hover:shadow-lg transition-all">
                <div className="relative aspect-video w-full">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{course.modules.length} Chapters</span>
                  <span>128 Students</span>
                </CardContent>
                <div className="p-4 border-t bg-muted/20">
                  <Button variant="ghost" className="w-full justify-between hover:bg-white" asChild>
                    <Link href={`/admin/courses/edit/${course.id}`}>
                      Refine Wisdom <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
            
            <Link href="/admin/courses/new" className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/10 p-8 text-center transition-all hover:bg-muted/20 hover:border-primary/50 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold">Architect New Portal</p>
                <p className="text-xs text-muted-foreground">Use Proctor to curate your wisdom</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <AIConsultant 
        userName={mockTeacher.name} 
        role="teacher" 
        orgName={mockOrg.name} 
      />
    </div>
  );
}
