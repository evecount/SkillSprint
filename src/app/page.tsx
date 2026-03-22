import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Sparkles, BookOpenCheck } from 'lucide-react';
import Image from 'next/image';
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
                  Empowering Educators & Retirees
                </Badge>
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-tight">
                  Your Knowledge is a <span className="text-primary italic">Legacy</span>.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Turn your life's mastery into bite-sized lessons. SkillSprint uses AI to help classical educators and retirees create engaging courses in minutes, not months.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg">
                  <Link href="/learner/dashboard">
                    Explore Lessons <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="flex items-center gap-6 px-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">15k+</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Learners</span>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-secondary">500+</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Expert Creators</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No tech skills required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI Content Assistant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Gamified Engagement</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Role-Based Portals</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
              
              <HeroChat />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="h-10 w-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Teacher Approved</p>
                  <p className="text-[10px] text-muted-foreground">Legacy Onboarding Active</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="bg-white/50 py-24 border-y">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold">A Unified Learning Ecosystem</h2>
              <p className="mt-4 text-muted-foreground">Whether you're creating, learning, or managing, we have a specialized studio waiting for you.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              <Card className="border-none shadow-md hover:shadow-xl transition-all group bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <CardTitle>Creators & Teachers</CardTitle>
                  <CardDescription>Use Captain Sprint to turn your wisdom into interactive modules and track your impact.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/teacher/dashboard">Enter Teacher Studio</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-xl transition-all group bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <CardTitle>Students & Learners</CardTitle>
                  <CardDescription>Bite-sized micro-learning with XP, streaks, and real-world skills in a gamified path.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/learner/dashboard">Go to My Courses</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-xl transition-all group bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background group-hover:scale-110 transition-transform">
                    <Shield className="h-7 w-7" />
                  </div>
                  <CardTitle>Admins & Leads</CardTitle>
                  <CardDescription>Full oversight of your organization's growth metrics, user management, and ROI tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/dashboard">Open Admin Panel</Link>
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
              <h2 className="font-headline text-3xl font-bold">Why SkillSprint?</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to upskill your organization.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Micro-Learning', desc: 'Bite-sized modules for fast consumption.', icon: Zap },
                { title: 'Gamified XP', desc: 'Engage learners with streaks and scores.', icon: TrendingUp },
                { title: 'AI Assistant', desc: 'Generate quizzes and content instantly.', icon: Sparkles },
                { title: 'Legacy Protection', icon: Shield, desc: 'Digitalize your unique knowledge for generations.' },
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
        <p>© 2024 SkillSprint Platform. Built for professional growth and knowledge legacy.</p>
      </footer>
    </div>
  );
}
