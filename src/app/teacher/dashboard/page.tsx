
"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Users, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
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
            <h1 className="font-headline text-3xl font-bold">Creator Studio</h1>
            <p className="text-muted-foreground">Design impactful micro-learning experiences for {mockOrg.name}.</p>
          </div>
          <Button asChild size="lg">
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-5 w-5" /> Create New Course
            </Link>
          </Button>
        </div>

        {/* Teacher Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherCourses.length}</div>
              <p className="text-xs text-muted-foreground">Across 2 categories</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">482</div>
              <p className="text-xs text-green-600 font-medium">+15% active this week</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Quiz Score</CardTitle>
              <Sparkles className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84%</div>
              <p className="text-xs text-muted-foreground">High engagement rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">My Courses</h2>
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
                  <span>{course.modules.length} Modules</span>
                  <span>128 Learners</span>
                </CardContent>
                <div className="p-4 border-t bg-muted/20">
                  <Button variant="ghost" className="w-full justify-between hover:bg-white" asChild>
                    <Link href={`/admin/courses/edit/${course.id}`}>
                      Edit Content <ArrowRight className="h-4 w-4" />
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
                <p className="font-bold">Create New Course</p>
                <p className="text-xs text-muted-foreground">Use AI to build modules faster</p>
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
