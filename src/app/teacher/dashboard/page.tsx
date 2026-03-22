"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Users, Sparkles, ArrowRight, Landmark, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { AIConsultant } from '@/components/consultant/AIConsultant';
import { mockCourses, mockTeacher, mockOrg } from '@/lib/mock-data';
import Image from 'next/image';

export default function TeacherDashboard() {
  const teacherCourses = mockCourses.filter(c => c.authorId === mockTeacher.id);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-20">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b-8 border-black pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Landmark className="h-6 w-6" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Master Architect</span>
            </div>
            <h1 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Wisdom Studio</h1>
            <p className="text-muted-foreground font-bold italic mt-2">Monetizing your 30+ years of lived mastery.</p>
          </div>
          <Button asChild size="lg" className="h-16 px-10 text-xl font-black uppercase italic tracking-widest rounded-none shadow-none bg-black border-4 border-black hover:bg-secondary">
            <Link href="/admin/courses/new">
              <Plus className="mr-3 h-6 w-6" /> Architect New Guild
            </Link>
          </Button>
        </div>

        {/* Teacher Stats */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Tuition Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">$4,820</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">This month's exchange</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Active Apprentices</CardTitle>
              <Users className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">12</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mt-2">+2 high-intent students</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Growth Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">15%</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Legacy reach increasing</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Wisdom Impact</CardTitle>
              <Sparkles className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">84%</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Direct mastery validated</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="font-headline text-3xl font-black uppercase italic tracking-tighter">Your Active Guilds</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teacherCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden shadow-none border-4 border-black group hover:border-secondary transition-all rounded-none bg-white">
                <div className="relative aspect-video w-full border-b-4 border-black">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black text-white border-none rounded-none font-black uppercase tracking-widest text-[10px] px-3 py-1 italic">
                      $499 Tuition
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-black uppercase italic leading-tight">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 font-bold italic mt-2 text-black/60">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>{course.modules.length} Chapters</span>
                  <span className="text-black">12 Apprentices</span>
                </CardContent>
                <div className="p-4 border-t-4 border-black bg-muted/20">
                  <Button variant="ghost" className="w-full justify-between hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest italic h-12" asChild>
                    <Link href={`/admin/courses/edit/${course.id}`}>
                      Structure Apprenticeship <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
            
            <Link href="/admin/courses/new" className="flex h-full min-h-[350px] flex-col items-center justify-center gap-6 border-4 border-dashed border-black/20 bg-muted/10 p-10 text-center transition-all hover:bg-secondary/5 hover:border-secondary group rounded-none">
              <div className="flex h-16 w-16 items-center justify-center bg-black text-white group-hover:scale-110 transition-transform border-4 border-white shadow-none">
                <Plus className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <p className="font-black uppercase tracking-widest text-lg italic">Architect Paid Guild</p>
                <p className="text-xs font-bold italic text-muted-foreground">Let Proctor structure your side-hustle</p>
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
