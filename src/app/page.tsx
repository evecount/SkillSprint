import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Shield, Sparkles, BookOpenCheck, Landmark, GraduationCap } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 px-4 py-1.5 text-sm font-semibold tracking-wide rounded-none">
                  Those who have done, can now teach.
                </Badge>
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-[1.1]">
                  Your Wisdom is a <span className="text-secondary italic relative">Legacy<span className="absolute bottom-1 left-0 w-full h-3 bg-secondary/10 -z-10"></span></span>.
                </h1>
                <p className="text-xl text-foreground leading-relaxed max-w-xl">
                  The University of Life is where mastery bypasses the gatekeepers. We help practitioners—from veteran ad execs to master engineers—build private portals to mentor the next generation directly.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-5 pt-2">
                <Button asChild size="lg" className="h-16 px-10 text-lg font-bold shadow-none hover:bg-secondary transition-all rounded-none border-2 border-primary">
                  <Link href="/learner/dashboard">
                    Enter the Portals <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <div className="flex items-center gap-8 px-6 py-2 bg-white rounded-none border-2 border-black">
                  <div className="flex flex-col text-center">
                    <span className="text-3xl font-bold text-black">12k+</span>
                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Mentees</span>
                  </div>
                  <div className="h-12 w-px bg-black" />
                  <div className="flex flex-col text-center">
                    <span className="text-3xl font-bold text-secondary">800+</span>
                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Masters</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <div className="h-8 w-8 rounded-none bg-black flex items-center justify-center">
                    <Landmark className="h-4 w-4 text-white" />
                  </div>
                  <span>Direct-from-Source Learning</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <div className="h-8 w-8 rounded-none bg-secondary flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span>Bypass the Internship Trap</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <div className="h-8 w-8 rounded-none bg-black flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span>Own Your Intellectual Legacy</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <div className="h-8 w-8 rounded-none bg-secondary flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <span>Private Wisdom Portals</span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-10">
              <HeroChat />
              
              <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-none shadow-none flex items-center gap-4 animate-bounce-slow border-4 border-black">
                <div className="h-12 w-12 rounded-none bg-secondary text-white flex items-center justify-center">
                  <BookOpenCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-black">Verified Master</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Lived Mastery Active</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-black py-24 border-y-4 border-secondary shadow-inner text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="font-headline text-4xl font-extrabold mb-8 italic tracking-tight">"The gatekeepers told you that you weren't ready. We're here to connect you with the person who has actually done the work."</h2>
            <p className="text-xl leading-relaxed text-white/80">
              In the University of Life, we reject the old saying "those who can't do, teach." Here, we believe that <strong>those who have done, can now teach.</strong> We are democratizing access to the library of lived human experience by helping masters own their legacy.
            </p>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-5xl font-black tracking-tighter uppercase italic">A Guild of Global Practitioners</h2>
              <p className="mt-6 text-lg text-muted-foreground font-medium">Connecting deep, lived wisdom with those who were denied a seat at the traditional table.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              <Card className="border-4 border-black shadow-none transition-all group bg-white p-4 rounded-none">
                <CardHeader>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-black text-white group-hover:bg-secondary transition-colors duration-300">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Wisdom Architects</CardTitle>
                  <CardDescription className="text-base mt-2 font-medium text-black/70">You've spent decades mastering your craft. Now, own your legacy and mentor the next generation on your terms.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="outline" className="w-full h-12 text-base font-black border-2 border-black rounded-none hover:bg-black hover:text-white">
                    <Link href="/teacher/dashboard">Open Creator Studio</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-black shadow-none transition-all group bg-white p-4 rounded-none">
                <CardHeader>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-secondary text-white group-hover:bg-black transition-colors duration-300">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Direct Students</CardTitle>
                  <CardDescription className="text-base mt-2 font-medium text-black/70">Bypass the institutions. Learn directly from the sources of wisdom and earn XP as you master their craft.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="outline" className="w-full h-12 text-base font-black border-2 border-black rounded-none hover:bg-black hover:text-white">
                    <Link href="/learner/dashboard">My Learning Portal</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-4 border-black shadow-none transition-all group bg-white p-4 rounded-none">
                <CardHeader>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-black text-white group-hover:bg-secondary transition-colors duration-300">
                    <Shield className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase">Campus Registry</CardTitle>
                  <CardDescription className="text-base mt-2 font-medium text-black/70">Manage your organization's wisdom ecosystem and track collective growth metrics across faculties.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="outline" className="w-full h-12 text-base font-black border-2 border-black rounded-none hover:bg-black hover:text-white">
                    <Link href="/admin/dashboard">Registry Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t-8 border-black py-16 text-center text-sm text-black bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-none bg-black text-white font-serif text-2xl font-black">
              U
            </div>
            <p className="max-w-md mx-auto font-black uppercase tracking-widest text-xs">The University of Life is a platform built to democratize access to lived mastery and empower the next generation of practitioners.</p>
            <p className="opacity-60 font-bold">© 2024 University of Life. All wisdom rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}