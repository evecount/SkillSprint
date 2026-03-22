
"use client"

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Star,
  Check,
  Plus,
  Camera
} from 'lucide-react';
import { mockLearner } from '@/lib/mock-data';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function IdentityProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: mockLearner.name,
    bio: "I'm a moonlighting creative strategist ready to buy back my time by learning the tactical truth of civil engineering. Lived experience over paper credentials.",
    interests: ["Engineering", "Dark Romanticism", "Creative Strategy"],
    goals: ["Bypass Corporate Gatekeepers", "Acquire Lived Mastery"],
    isPublic: true,
    masteryDomain: "Advertising",
    years: 12
  });

  const handleSave = () => {
    toast({
      title: "Registry Updated",
      description: "Your professional truth is now synced with the SkillSprint archive.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-32 pt-24 md:pt-24">
      <Navbar role="learner" />
      
      <main className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-secondary tracking-tighter leading-none mb-1">My <span className="text-primary italic">Identity.</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">The Registry of Professional Lived Experience</p>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/50">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <section className="space-y-6">
          {/* Tinder-style Hero Card - More Compact */}
          <Card className="overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-white group">
            <div className="relative aspect-[4/5] w-full">
              <Image 
                src="https://picsum.photos/seed/skillsprint-identity/600/800" 
                alt={profile.name} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                data-ai-hint="professional portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                 <Badge className="bg-primary text-white border-none rounded-full px-3 py-1 font-black text-[8px] uppercase tracking-widest">
                  {profile.years}y Practitioner
                </Badge>
              </div>
              <Button size="icon" className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20">
                <Camera className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-8 left-6 right-6 text-white">
                <h2 className="text-3xl font-black tracking-tighter leading-none mb-1">{profile.name}, {profile.years + 15}</h2>
                <div className="flex items-center gap-2 opacity-60 text-[10px] font-black uppercase tracking-widest">
                  <Briefcase className="h-3 w-3" /> {profile.masteryDomain}
                </div>
              </div>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted/30 p-3 rounded-xl border border-black/5 text-center">
                   <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">XP</p>
                   <p className="text-lg font-black text-secondary">{mockLearner.totalXP}</p>
                </div>
                <div className="flex-1 bg-muted/30 p-3 rounded-xl border border-black/5 text-center">
                   <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Streak</p>
                   <p className="text-lg font-black text-primary flex items-center justify-center gap-1">
                    <Flame className="h-3.5 w-3.5 fill-current" /> {mockLearner.streak}
                  </p>
                </div>
                <div className="flex-1 bg-muted/30 p-3 rounded-xl border border-black/5 text-center">
                   <p className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Rank</p>
                   <p className="text-lg font-black text-secondary">Expert</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">My Truth (Bio)</Label>
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="min-h-[100px] rounded-2xl border border-muted/50 p-4 text-xs font-bold leading-relaxed bg-muted/10 italic"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">Practical Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((tag) => (
                    <Badge key={tag} className="bg-secondary text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      {tag} <Check className="h-2.5 w-2.5" />
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-full border-dashed px-3 h-7 text-[8px] font-black uppercase tracking-widest">
                    <Plus className="mr-1 h-2.5 w-2.5" /> Add Interest
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">Registry Goals</Label>
                <div className="space-y-2">
                  {profile.goals.map((goal, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-tight text-secondary">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-muted">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-0.5">
                    <p className="font-black text-secondary text-xs">Visible in Discovery Stack</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic">Allow swipes from others.</p>
                  </div>
                  <Switch 
                    checked={profile.isPublic}
                    onCheckedChange={(v) => setProfile({...profile, isPublic: v})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 rounded-xl border border-black font-black uppercase tracking-widest text-[9px]">
                    <LogOut className="mr-2 h-3.5 w-3.5" /> Resign
                  </Button>
                  <Button onClick={handleSave} className="h-12 rounded-xl bg-primary hover:bg-accent text-white font-black uppercase tracking-widest text-[9px] shadow-xl shadow-primary/20">
                    Sync Identity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
