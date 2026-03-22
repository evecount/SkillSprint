"use client"

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, CheckCircle, AlertCircle, Plus, ShieldCheck, Landmark, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AIConsultant } from '@/components/consultant/AIConsultant';
import { mockOrg, mockAdmin } from '@/lib/mock-data';

const completionData = [
  { name: 'Mon', completion: 45 },
  { name: 'Tue', completion: 52 },
  { name: 'Wed', completion: 61 },
  { name: 'Thu', completion: 58 },
  { name: 'Fri', completion: 70 },
];

const engagementData = [
  { name: 'Week 1', users: 120 },
  { name: 'Week 2', users: 180 },
  { name: 'Week 3', users: 210 },
  { name: 'Week 4', users: 340 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:pt-16">
      <Navbar role="admin" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b-8 border-black pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Landmark className="h-6 w-6" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">Registry Champion</span>
            </div>
            <h1 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Campus Registry</h1>
            <p className="text-muted-foreground font-bold italic mt-2">Orchestrating the exchange of human mastery. You bring the people, we bridge the sources.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-16 px-8 text-lg font-black uppercase italic tracking-widest rounded-none border-4 border-black hover:bg-black hover:text-white transition-all" asChild>
              <Link href="/admin/users">
                Directory of Sources
              </Link>
            </Button>
            <Button className="h-16 px-8 text-lg font-black uppercase italic tracking-widest rounded-none bg-black border-4 border-black hover:bg-secondary shadow-none transition-all" asChild>
              <Link href="/admin/courses/new">
                <Plus className="mr-3 h-6 w-6" /> Orchestrate Portal
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Active Contributors</CardTitle>
              <Users className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">1,248</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mt-2">+12% new voices this month</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Wisdom Portals</CardTitle>
              <BookOpen className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">24</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Scaling legacy exchange</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Exchange Rate</CardTitle>
              <CheckCircle className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">78%</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mt-2">Active source interactions</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-4 border-black bg-white rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Registry Health</CardTitle>
              <Globe className="h-5 w-5 text-black" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">Vibrant</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Democratizing access daily</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="engagement" className="space-y-8">
          <TabsList className="bg-muted/10 border-4 border-black rounded-none h-14 p-1">
            <TabsTrigger value="engagement" className="rounded-none font-black uppercase italic tracking-widest text-xs h-full data-[state=active]:bg-black data-[state=active]:text-white">Mutual Engagement</TabsTrigger>
            <TabsTrigger value="completion" className="rounded-none font-black uppercase italic tracking-widest text-xs h-full data-[state=active]:bg-black data-[state=active]:text-white">Shared Mastery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement" className="space-y-4">
            <Card className="border-4 border-black shadow-none bg-white rounded-none">
              <CardHeader>
                <CardTitle className="text-2xl font-black uppercase italic tracking-tight">Active Exchange Over Time</CardTitle>
                <CardDescription className="font-bold italic">Collaborative interactions between sources and seekers.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#000" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                    <YAxis stroke="#000" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip contentStyle={{ border: '4px solid black', borderRadius: '0', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="users" stroke="hsl(var(--secondary))" strokeWidth={5} dot={{ r: 6, fill: "hsl(var(--secondary))", strokeWidth: 0 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completion" className="space-y-4">
            <Card className="border-4 border-black shadow-none bg-white rounded-none">
              <CardHeader>
                <CardTitle className="text-2xl font-black uppercase italic tracking-tight">Wisdom Inquiry Rate</CardTitle>
                <CardDescription className="font-bold italic">Student-led inquiries driving source refinement.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#000" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                    <YAxis stroke="#000" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip contentStyle={{ border: '4px solid black', borderRadius: '0', fontWeight: 'bold' }} />
                    <Bar dataKey="completion" fill="black" radius={0} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AIConsultant 
        userName={mockAdmin.name} 
        role="admin" 
        orgName={mockOrg.name} 
      />
    </div>
  );
}
