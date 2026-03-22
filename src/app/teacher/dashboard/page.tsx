"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Users, ArrowRight, Landmark, DollarSign, TrendingUp, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import { AIConsultant } from '@/components/consultant/AIConsultant';
import { mockCourses, mockTeacher, mockOrg } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function TeacherDashboard() {
  const teacherCourses = mockCourses.filter(c => c.authorId === mockTeacher.id);

  return (
    <div className="min-h-screen bg-background pb-32 pt-12 md:pt-24">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm tracking-wider uppercase">
              <Heart className="h-4 w-4" />
              <span>Veteran Practitioner / Lecturer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">Mastery Studio</h1>
            <p className="text-muted-foreground font-medium">Digitalizing your 30+ years of lived truth for the new workforce.</p>
          </div>
          <Button asChild size="lg" className="h-16 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 shadow-xl shadow-secondary/20 font-bold uppercase tracking-widest">
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-5 w-5" /> Structure Apprenticeship
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tuition Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-secondary">$4,820</div>
              <p className="text-[10px] font-bold text-primary mt-1">+15% this month</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Apprentices</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-secondary">12</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-1">High-intent seekers</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Practitioner Impact</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-secondary">1,240</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-1">Direct inquiries</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Cycles</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-secondary">84h</div>
              <p className="text-[10px] font-bold text-muted-foreground mt-1">Direct exchange</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black text-secondary">Your Active Apprenticeships</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teacherCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-[2.5rem] bg-white">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary text-white border-none rounded-full px-3 py-1 font-bold">
                      $499 Tuition
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 font-medium">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex justify-between items-center text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.modules.length} Chapters</span>
                  <span className="text-secondary">12 Apprentices</span>
                </CardContent>
                <div className="p-6 border-t border-border/50 bg-muted/20">
                  <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-white rounded-xl font-bold h-12" asChild>
                    <Link href={`/admin/courses/edit/${course.id}`}>
                      Refine Guild <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
            
            <Link href="/admin/courses/new" className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-[2.5rem] border-4 border-dashed border-border hover:border-primary/50 bg-white hover:bg-primary/5 transition-all group p-8 text-center">
              <div className="h-20 w-20 rounded-3xl bg-muted group-hover:bg-primary group-hover:scale-110 transition-all flex items-center justify-center text-secondary group-hover:text-white">
                <Plus className="h-10 w-10" />
              </div>
              <div>
                <p className="font-bold text-xl text-secondary">Structure Paid Guild</p>
                <p className="text-xs text-muted-foreground mt-1">Let Proctor architect your professional side-hustle</p>
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
