
"use client"

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  BookOpen, 
  Users, 
  ArrowRight, 
  DollarSign, 
  Calendar, 
  Zap, 
  Clock, 
  Video,
  X,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { mockCourses, mockTeacher } from '@/lib/mock-data';
import Image from 'next/image';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';

export default function PractitionerStudio() {
  const [selectedCycle, setSelectedCycle] = useState<any>(null);
  const teacherCourses = mockCourses.filter(c => c.authorId === mockTeacher.id);

  const stats = [
    { label: 'Revenue', value: '$4,820', icon: DollarSign, color: 'text-primary' },
    { label: 'Apprentices', value: '12', icon: Users, color: 'text-secondary' },
    { label: 'Lived Impact', value: '1,240 XP', icon: Zap, color: 'text-primary' },
    { label: 'Active Hours', value: '84h', icon: Clock, color: 'text-secondary' },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 pt-28 md:pt-32">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4 max-w-6xl">
        {/* Header & Stats Section */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-secondary tracking-tighter leading-none mb-2">Practitioner <span className="text-primary italic">Studio.</span></h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Digitalizing 30+ Years of Craft</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-3 rounded-2xl border border-black/5 shadow-sm">
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <stat.icon className={stat.color + " h-3 w-3"} />
                  <span className="text-lg font-black text-secondary tracking-tight">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Pillar Buttons */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild className="h-24 rounded-[2rem] bg-secondary hover:bg-black text-white flex flex-col items-center justify-center gap-1 group transition-all hover:scale-[1.02] shadow-xl shadow-secondary/10">
            <Link href="/admin/courses/new">
              <Plus className="h-6 w-6 mb-1 group-hover:rotate-90 transition-transform" />
              <span className="font-black uppercase tracking-widest text-[10px]">Structure an Experience</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-24 rounded-[2rem] border-4 border-black bg-white hover:bg-muted text-black flex flex-col items-center justify-center gap-1 group transition-all hover:scale-[1.02]">
            <Video className="h-6 w-6 mb-1 text-primary" />
            <span className="font-black uppercase tracking-widest text-[10px]">Create a Workshop</span>
          </Button>
          <Button variant="outline" className="h-24 rounded-[2rem] border-4 border-black bg-white hover:bg-muted text-black flex flex-col items-center justify-center gap-1 group transition-all hover:scale-[1.02]">
            <Calendar className="h-6 w-6 mb-1 text-secondary" />
            <span className="font-black uppercase tracking-widest text-[10px]">Schedule an Event</span>
          </Button>
        </div>

        {/* Active Cycles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-secondary tracking-tight">Active Professional Cycles</h2>
            <Badge variant="outline" className="rounded-full px-4 py-1 font-black text-[10px] uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
              {teacherCourses.length} Registered Sources
            </Badge>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teacherCourses.map((course) => (
              <button 
                key={course.id} 
                onClick={() => setSelectedCycle(course)}
                className="group relative text-left transition-all hover:scale-[1.02] focus:outline-none"
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-[2.5rem] bg-white h-full flex flex-col">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image 
                      src={course.thumbnail} 
                      alt={course.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-white border-none rounded-full px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                        $499 Tuition
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-6 flex-1">
                    <CardTitle className="text-lg font-black text-secondary group-hover:text-primary transition-colors leading-tight">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 font-medium italic text-xs">"{course.description}"</CardDescription>
                  </CardHeader>
                  <div className="p-6 pt-0 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.modules.length} Chapters</span>
                    <span className="text-secondary">12 Seekers</span>
                  </div>
                </Card>
              </button>
            ))}
            
            <Link href="/admin/courses/new" className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-[2.5rem] border-4 border-dashed border-border hover:border-primary/50 bg-white hover:bg-primary/5 transition-all group p-8 text-center">
              <div className="h-16 w-16 rounded-3xl bg-muted group-hover:bg-primary group-hover:scale-110 transition-all flex items-center justify-center text-secondary group-hover:text-white">
                <Plus className="h-8 w-8" />
              </div>
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-secondary">New Legacy Cycle</p>
                <p className="text-[10px] text-muted-foreground mt-1">Structure your next professional truth.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Cycle Detail Dialog */}
      <Dialog open={!!selectedCycle} onOpenChange={() => setSelectedCycle(null)}>
        {selectedCycle && (
          <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative aspect-video w-full">
               <Image 
                src={selectedCycle.thumbnail} 
                alt={selectedCycle.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <button 
                onClick={() => setSelectedCycle(null)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-8 left-8 right-8">
                <Badge className="bg-primary text-white mb-3 px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-full">Active Registry Source</Badge>
                <DialogTitle className="text-3xl font-black text-white tracking-tighter leading-none">{selectedCycle.title}</DialogTitle>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <DialogDescription className="text-base text-secondary font-medium leading-relaxed italic">
                {selectedCycle.description}
              </DialogDescription>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-2xl">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">Tuition Model</p>
                  <p className="text-sm font-black text-secondary">$499 / Cycle</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-2xl">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">Engagement</p>
                  <p className="text-sm font-black text-secondary">12 Seekers</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-2xl">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                  <div className="flex items-center gap-1 text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    <span className="text-sm font-black">Live</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 h-14 rounded-2xl bg-primary hover:bg-accent text-white font-black uppercase tracking-widest text-xs">
                  Manage Practical Content
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 border-black font-black uppercase tracking-widest text-xs">
                  View Analytics
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
