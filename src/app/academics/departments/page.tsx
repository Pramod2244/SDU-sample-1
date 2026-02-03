'use client';

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { departmentsData } from '@/lib/departments-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Microscope, HeartPulse, Brain, Thermometer, FlaskConical, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const icons: Record<string, any> = {
  anatomy: Microscope,
  physiology: HeartPulse,
  biochemistry: FlaskConical,
  pathology: Microscope,
  microbiology: FlaskConical,
  pharmacology: FlaskConical,
  'general-medicine': Stethoscope,
  'general-surgery': Stethoscope,
  psychiatry: Brain,
  pediatrics: Thermometer,
};

const DepartmentCard = ({ dept, index }: { dept: any; index: number }) => {
  const Icon = icons[dept.slug] || Stethoscope;
  const image = PlaceHolderImages.find(img => img.id === dept.heroImageId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/academics/departments/${dept.slug}`}>
        <Card className="group relative overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardContent className="p-8 flex flex-col h-full relative z-10">
            <div className="mb-6 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              <Icon className="h-6 w-6" />
            </div>
            
            <h3 className="font-headline text-2xl font-bold text-primary mb-3">{dept.name}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed mb-8 flex-grow">
              {dept.shortDescription}
            </p>
            
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
              View Department
              <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </CardContent>
          
          {/* Subtle Bottom Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </Card>
      </Link>
    </motion.div>
  );
};

export default function DepartmentsPage() {
  const bgTexture = PlaceHolderImages.find(img => img.id === 'page-background-texture');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      
      {/* Parallax Background Decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full border-[100px] border-primary/5 blur-3xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] aspect-square rounded-full border-[100px] border-primary/5 blur-3xl"
        />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl mb-20"
          >
            <h1 className="font-headline text-6xl md:text-8xl font-bold text-primary leading-none mb-6">
              Departments
            </h1>
            <p className="text-xl text-foreground/60 leading-relaxed max-w-xl">
              Excellence across 20+ specialized medical disciplines, blending clinical mastery with groundbreaking academic research.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departmentsData.map((dept, i) => (
              <DepartmentCard key={dept.slug} dept={dept} index={i} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
