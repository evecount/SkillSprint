import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Sparkles, BookOpenCheck, Landmark, GraduationCap } from 'lucide-react';
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
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 text-sm font-semibold tracking-wide">
                  Those who have done, can now teach.
                </Badge>
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-[1.1]">
                  Your Wisdom is a <span className="text-primary italic relative">Legacy<span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10"></span></span>.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  The University of Life is where mastery bypasses the gatekeepers. We help practitioners—from veteran ad execs to master engineers—build private portals to mentor the next generation directly.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-5 pt-2">
                <Button asChild size="lg" className="h-16 px-10 text-lg font-bold shadow-2xl hover:translate-y-[-2px] transition-all">
                  <Link href="/learner/dashboard">
                    Enter the Portals <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <div className="flex items-center gap-8 px-6 py-2 bg-white/50 backdrop-blur-sm rounded-2xl border">
                  <div className="flex flex-col text-center">
                    <span className="text-3xl font-bold text-primary">12k+</span>
                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Mentees</span>
                  </div>
                  <div className="h-12 w-px bg-border/60" />
                  <div className="flex flex-col text-center">
                    <span className="text-3xl font-bold text-secondary">800+</span>
                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Masters</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Landmark className="h-4 w-4 text-primary" />
                  </div>
                  <span>Direct-from-Source Learning</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Bypass the Internship Trap</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Own Your Intellectual Legacy</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-secondary" />
                  </div>
                  <span>Private Wisdom Portals</span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-10">
              <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />
              
              <HeroChat />
              
              <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce-slow border-2 border-primary/5">
                <div className="h-12 w-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center">
                  <BookOpenCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Verified Master</p>
                  <p className="text-xs text-muted-foreground font-medium">Lived Mastery Active</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-white py-24 border-y shadow-inner">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="font-headline text-4xl font-extrabold mb-8 italic text-foreground tracking-tight">"The gatekeepers told you that you weren't ready. We're here to connect you with the person who has actually done the work."</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              In the University of Life, we reject the old saying "those who can't do, teach." Here, we believe that <strong>those who have done, can now teach.</strong> We are democratizing access to the library of lived human experience by helping masters own their legacy.
            </p>
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-4xl font-bold tracking-tight">A Guild of Global Practitioners</h2>
              <p className="mt-6 text-lg text-muted-foreground">Connecting deep, lived wisdom with those who were denied a seat at the traditional table.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all group bg-white p-4">
                <CardHeader>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">Wisdom Architects</CardTitle>
                  <CardDescription className="text-base mt-2">You've spent decades mastering your craft. Now, own your legacy and mentor the next generation on your terms.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="outline" className="w-full h-12 text-base font-semibold border-primary/20 hover:bg-primary/5">
                    <Link href="/teacher/dashboard">Open Creator Studio</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl hover:shadow-2xl transition-all group bg-white p-4">
                <CardHeader>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-secondary text-secondary-foreground group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">Direct Students</CardTitle>
                  <CardDescription className="text-base mt-2">Bypass the institutions. Learn directly from the sources of wisdom and earn XP as you master their craft.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="outline" className="w-full h-12 text-base font-semibold border-secondary/20 hover:bg-secondary/5">
                    <Link href="/learner/dashboard">My Learning Portal</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl hover:shadow-2xl transition-all group bg-white p-4">
                <CardHeader>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-foreground text-background group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Shield className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">Campus Registry</CardTitle>
                  <CardDescription className="text-base mt-2">Manage your organization's wisdom ecosystem and track collective growth metrics across faculties.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="outline" className="w-full h-12 text-base font-semibold border-foreground/20 hover:bg-foreground/5">
                    <Link href="/admin/dashboard">Registry Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-16 text-center text-sm text-muted-foreground bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif text-xl font-bold">
              U
            </div>
            <p className="max-w-md mx-auto font-medium">The University of Life is a platform built to democratize access to lived mastery and empower the next generation of practitioners.</p>
            <p className="opacity-60">© 2024 University of Life. All wisdom rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}