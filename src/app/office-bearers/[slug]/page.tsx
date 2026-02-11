
'use client';

import { useParams, notFound } from 'next/navigation';
import { officeBearersData } from '@/lib/office-bearers-data';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Award, GraduationCap, Briefcase, Target, ShieldCheck } from 'lucide-react';

const ProfileHero = ({ bearer }: { bearer: any }) => {
  const photo = PlaceHolderImages.find(img => img.id === bearer.photoId);
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-soft-lg group">
                {photo && (
                  <Image 
                    src={photo.imageUrl} 
                    alt={bearer.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    data-ai-hint={photo.imageHint}
                  />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-widest uppercase text-sm block">Office Bearer</span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary leading-tight">
                {bearer.name}
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto lg:mx-0" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80">
                {bearer.designation}
              </h2>
              <p className="text-xl text-foreground/60 italic">
                {bearer.qualifications}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MessageSection = ({ bearer }: { bearer: any }) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="relative overflow-hidden border-none shadow-soft-lg bg-white/50 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <CardContent className="p-10 md:p-16">
              <Quote className="absolute top-10 right-10 h-20 w-20 text-primary/5 -z-10" />
              <h3 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8">
                Message from the {bearer.designation}
              </h3>
              <div className="space-y-6 text-lg md:text-xl text-foreground/70 leading-relaxed italic">
                {bearer.message.split('\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-primary/10 flex items-center gap-4">
                <div className="font-bold text-primary">{bearer.name}</div>
                <div className="h-4 w-[1px] bg-primary/20" />
                <div className="text-foreground/50 text-sm uppercase tracking-widest">{bearer.designation}, SDUMC</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

const JourneySection = ({ bearer }: { bearer: any }) => {
  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Biography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-10">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h3 className="font-headline text-3xl font-bold">Academic & Biography</h3>
            </div>
            <div className="space-y-6">
              {bearer.biography.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-soft-sm border border-primary/5 hover:border-primary/20 transition-all">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-lg text-foreground/70">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-10">
              <Briefcase className="h-8 w-8 text-primary" />
              <h3 className="font-headline text-3xl font-bold">Professional Experience</h3>
            </div>
            <div className="space-y-6">
              {bearer.experience.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-soft-sm border border-primary/5 hover:border-primary/20 transition-all">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-lg text-foreground/70">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AchievementsVision = ({ bearer }: { bearer: any }) => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 bg-primary text-primary-foreground rounded-[3rem] shadow-2xl relative"
          >
            <Target className="absolute -top-10 -right-10 h-40 w-40 text-white/5" />
            <h3 className="font-headline text-3xl font-bold mb-8 flex items-center gap-4">
              <Target className="h-8 w-8" /> Our Vision
            </h3>
            <p className="text-xl md:text-2xl italic leading-relaxed font-headline">
              "{bearer.vision}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <h3 className="font-headline text-3xl font-bold">Key Achievements</h3>
            </div>
            <div className="grid gap-6">
              {bearer.achievements.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-accent/5 rounded-2xl group hover:bg-primary/5 transition-all">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function OfficeBearerPage() {
  const params = useParams();
  const slug = params.slug as string;
  const bearer = officeBearersData.find(b => b.slug === slug);

  if (!bearer) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <Header transparent={false} />
      <main>
        <ProfileHero bearer={bearer} />
        <MessageSection bearer={bearer} />
        <JourneySection bearer={bearer} />
        <AchievementsVision bearer={bearer} />
      </main>
      <Footer />
    </div>
  );
}
