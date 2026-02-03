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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/academics/departments/${dept.slug}`}>
        <Card className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardContent className="p-8 flex flex-col h-full relative z-10">
            <div className="mb-6 h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              <Icon className="h-7 w-7" />
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
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      
      {/* Dynamic Futuristic Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large moving glow blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[50%] aspect-square rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[5%] w-[50%] aspect-square rounded-full bg-primary/10 blur-[120px]"
        />
        
        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
      </div>

      <main className="relative z-10 pt-40 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl mb-24"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
            >
              Academic Excellence
            </motion.span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold text-primary leading-none mb-8">
              Departments
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-2xl">
              Excellence across 20+ specialized medical disciplines, blending clinical mastery with groundbreaking academic research.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
