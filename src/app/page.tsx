import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Sparkles, BookOpenCheck, Landmark } from 'lucide-react';
import { HeroChat } from '@/components/home/HeroChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-1">
                  Democratizing Access to Mastery
                </Badge>
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-tight">
                  Your Wisdom is a <span className="text-primary italic">Legacy</span>.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The University of Life is a guild where practitioners and masters—from retired ad execs to veteran engineers—democratize access to their life's work. Build your own private learning portal and mentor the next generation directly.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg">
                  <Link href="/learner/dashboard">
                    Enter the Portals <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="flex items-center gap-6 px-4">
                  <div className="flex flex-col text-center">
                    <span className="text-2xl font-bold text-primary">12k+</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Global Students</span>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="flex flex-col text-center">
                    <span className="text-2xl font-bold text-secondary">800+</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Wisdom Masters</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Landmark className="h-4 w-4 text-primary" />
                  <span>Direct-from-Source</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No Gatekeepers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full Financial Control</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Private Enrollment</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
              
              <HeroChat />
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="h-10 w-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Verified Master</p>
                  <p className="text-[10px] text-muted-foreground">Legacy Architect Active</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="bg-white/50 py-24 border-y">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold">A Guild of Global Practitioners</h2>
              <p className="mt-4 text-muted-foreground">Connecting deep, lived wisdom with those who were never given an internship or a seat at the table.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              <Card className="border-none shadow-md hover:shadow-xl transition-all group bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <CardTitle>Wisdom Architects</CardTitle>
                  <CardDescription>Turn your career experience into interactive legacy portals. Mentor the next generation on your terms.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/teacher/dashboard">Open Creator Studio</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-xl transition-all group bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground group-hover:scale-110 transition-transform">
                    <Landmark className="h-7 w-7" />
                  </div>
                  <CardTitle>Direct Students</CardTitle>
                  <CardDescription>Bypass the institutions. Learn directly from the sources of wisdom and earn XP as you master their craft.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/learner/dashboard">My Learning Portal</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-xl transition-all group bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background group-hover:scale-110 transition-transform">
                    <Shield className="h-7 w-7" />
                  </div>
                  <CardTitle>Campus Registry</CardTitle>
                  <CardDescription>Manage your organization's wisdom ecosystem and track collective growth metrics across faculties.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/dashboard">Registry Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="font-headline text-3xl font-bold">Why the University of Life?</h2>
              <p className="mt-4 text-muted-foreground">Building the bridges of knowledge beyond institutional walls.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Lived Wisdom', desc: 'Direct access to masters, not just theory.', icon: BookOpenCheck },
                { title: 'Gamified Growth', desc: 'Engage with streaks and mastery scores.', icon: TrendingUp },
                { title: 'Proctor AI', desc: 'Proctor helps you architect your legacy.', icon: Sparkles },
                { title: 'Full Ownership', icon: Shield, desc: 'Complete control over your audience, price, and schedule.' },
              ].map((f, i) => (
                <Card key={i} className="border-none shadow-sm transition-transform hover:-translate-y-1 bg-white">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{f.title}</CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 text-center text-sm text-muted-foreground bg-white">
        <p>© 2024 University of Life. Built to democratize access to wisdom and protect legacy mastery.</p>
      </footer>
    </div>
  );
}
