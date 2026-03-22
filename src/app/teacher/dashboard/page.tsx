
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
    <div className="min-h-screen bg-background pb-32 pt-24 md:pt-24">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4 max-w-6xl">
        {/* Header & Stats Section - Compact */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-secondary tracking-tighter leading-none mb-1">Practitioner <span className="text-primary italic">Studio.</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Digitalizing 30+ Years of Craft</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-2.5 rounded-xl border border-black/5 shadow-sm">
                <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{stat.label}</p>
                <div className="flex items-center gap-1.5">
                  <stat.icon className={stat.color + " h-3 w-3"} />
                  <span className="text-base font-black text-secondary tracking-tight">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Pillar Buttons - Compact */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button asChild className="h-20 rounded-[1.5rem] bg-secondary hover:bg-black text-white flex flex-col items-center justify-center gap-0.5 group transition-all hover:scale-[1.02] shadow-xl shadow-secondary/10">
            <Link href="/admin/courses/new">
              <Plus className="h-5 w-5 mb-0.5 group-hover:rotate-90 transition-transform" />
              <span className="font-black uppercase tracking-widest text-[9px]">Structure an Experience</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-20 rounded-[1.5rem] border-2 border-black bg-white hover:bg-muted text-black flex flex-col items-center justify-center gap-0.5 group transition-all hover:scale-[1.02]">
            <Video className="h-5 w-5 mb-0.5 text-primary" />
            <span className="font-black uppercase tracking-widest text-[9px]">Create a Workshop</span>
          </Button>
          <Button variant="outline" className="h-20 rounded-[1.5rem] border-2 border-black bg-white hover:bg-muted text-black flex flex-col items-center justify-center gap-0.5 group transition-all hover:scale-[1.02]">
            <Calendar className="h-5 w-5 mb-0.5 text-secondary" />
            <span className="font-black uppercase tracking-widest text-[9px]">Schedule an Event</span>
          </Button>
        </div>

        {/* Active Cycles Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teacherCourses.map((course) => (
            <button 
              key={course.id} 
              onClick={() => setSelectedCycle(course)}
              className="group relative text-left transition-all hover:scale-[1.02] focus:outline-none"
            >
              <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-[2rem] bg-white h-full flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-secondary text-white border-none rounded-full px-2 py-0.5 font-black text-[9px] uppercase tracking-widest">
                      $499 Tuition
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-5 flex-1">
                  <CardTitle className="text-base font-black text-secondary group-hover:text-primary transition-colors leading-tight">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5 font-medium italic text-[10px]">"{course.description}"</CardDescription>
                </CardHeader>
                <div className="p-5 pt-0 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="h-2.5 w-2.5" /> {course.modules.length} Chapters</span>
                  <span className="text-secondary">12 Seekers</span>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </main>

      {/* Cycle Detail Dialog */}
      <Dialog open={!!selectedCycle} onOpenChange={() => setSelectedCycle(null)}>
        {selectedCycle && (
          <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl animate-in zoom-in-95 duration-300">
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
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-primary text-white mb-2 px-3 py-0.5 text-[7px] font-black uppercase tracking-widest rounded-full">Active Registry Source</Badge>
                <DialogTitle className="text-2xl font-black text-white tracking-tighter leading-none">{selectedCycle.title}</DialogTitle>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <DialogDescription className="text-sm text-secondary font-medium leading-relaxed italic">
                {selectedCycle.description}
              </DialogDescription>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/50 p-3 rounded-xl">
                  <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Tuition Model</p>
                  <p className="text-xs font-black text-secondary">$499 / Cycle</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl">
                  <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Engagement</p>
                  <p className="text-xs font-black text-secondary">12 Seekers</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl">
                  <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Status</p>
                  <div className="flex items-center gap-1 text-primary">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    <span className="text-xs font-black">Live</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-accent text-white font-black uppercase tracking-widest text-[10px]">
                  Manage Practical Content
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-xl border-2 border-black font-black uppercase tracking-widest text-[10px]">
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
