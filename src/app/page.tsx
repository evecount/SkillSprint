
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar role="learner" />
      
      <main className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                Gamified B2B Micro-Learning
              </Badge>
              <h1 className="font-headline text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
                Accelerate Your Team's <span className="text-primary">Growth</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                SkillSprint provides bite-sized, engaging courses designed for the modern workforce. 
                Improve retention with gamified progression and AI-powered content creation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/learner/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="lg" className="h-12 px-6">
                    <Link href="/teacher/dashboard">Teacher Studio</Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="h-12 px-6">
                    <Link href="/admin/dashboard">Admin Panel</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/skillsprint1/1200/800" 
                alt="SkillSprint Platform" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-white/50 py-24">
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
                { title: 'Role Based', desc: 'Custom portals for Admins, Teachers, and Learners.', icon: Shield },
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
        <p>© 2024 SkillSprint Platform. Built for professional growth.</p>
      </footer>
    </div>
  );
}
