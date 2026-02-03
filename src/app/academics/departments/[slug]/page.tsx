'use client';

import { useParams, notFound } from 'next/navigation';
import { departmentsData } from '@/lib/departments-data';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, MapPin, Phone, Mail, GraduationCap, Microscope, Building2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'faculty', label: 'Faculty', icon: GraduationCap },
  { id: 'programs', label: 'Programs', icon: CheckCircle2 },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
  { id: 'research', label: 'Research', icon: Microscope },
  { id: 'contact', label: 'Contact', icon: MapPin },
];

export default function DepartmentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dept = departmentsData.find(d => d.slug === slug);
  const [activeSection, setActiveId] = useState('overview');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  if (!dept) return notFound();

  const heroImage = PlaceHolderImages.find(img => img.id === dept.heroImageId);
  const aboutImage = PlaceHolderImages.find(img => img.id === dept.aboutImageId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset calculation: Header (120px) + SubNav (approx 70px) + Buffer
      const yOffset = -200;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      {/* Dynamic Hero */}
      <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        {heroImage && (
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image 
              src={heroImage.imageUrl} 
              alt={dept.name} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </motion.div>
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/academics/departments">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80 gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" /> Back to Departments
            </Button>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-6xl md:text-8xl font-bold text-primary"
          >
            {dept.name}
          </motion.h1>
        </div>
      </section>

      {/* Sticky Internal Nav - Adjusted top to 120px to match Header height */}
      <nav className="sticky top-[120px] z-40 bg-white/80 backdrop-blur-xl border-y border-border hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "py-6 text-sm font-bold uppercase tracking-widest transition-all relative",
                  activeSection === item.id ? "text-primary" : "text-foreground/40 hover:text-primary"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* Overview */}
          <section id="overview" className="scroll-mt-[220px] grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-headline text-4xl font-bold text-primary">Overview</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {dept.overview}
              </p>
              <div className="grid gap-6">
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <h4 className="font-bold text-primary mb-2">Our Vision</h4>
                  <p className="text-foreground/70 italic">"{dept.vision}"</p>
                </div>
                <div className="p-6 bg-accent/5 rounded-2xl border border-border">
                  <h4 className="font-bold mb-2">Our Mission</h4>
                  <p className="text-foreground/70 italic">"{dept.mission}"</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              {aboutImage && <Image src={aboutImage.imageUrl} alt="About" fill className="object-cover" />}
            </div>
          </section>

          {/* Faculty */}
          <section id="faculty" className="scroll-mt-[220px] space-y-12">
            <h2 className="font-headline text-4xl font-bold text-primary">Faculty Members</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dept.faculty.map((f, i) => {
                const photo = PlaceHolderImages.find(img => img.id === f.photoId);
                return (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="p-6 bg-white rounded-2xl shadow-soft-lg border border-border flex flex-col items-center text-center"
                  >
                    <div className="relative h-32 w-32 rounded-full overflow-hidden mb-6 border-4 border-primary/10">
                      {photo && <Image src={photo.imageUrl} alt={f.name} fill className="object-cover" />}
                    </div>
                    <h4 className="font-bold text-xl text-primary mb-1">{f.name}</h4>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-3">{f.designation}</p>
                    <p className="text-xs text-foreground/60 italic">{f.qualification}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Programs */}
          <section id="programs" className="scroll-mt-[220px] space-y-12">
            <h2 className="font-headline text-4xl font-bold text-primary">Academic Programs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {dept.programs.map((p, i) => (
                <div key={i} className="p-8 bg-card border border-border rounded-3xl flex justify-between items-center group hover:border-primary transition-all">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">{p.type}</span>
                    <h4 className="text-xl font-bold">{p.name}</h4>
                  </div>
                  <CheckCircle2 className="text-primary h-6 w-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>

          {/* Infrastructure */}
          <section id="infrastructure" className="scroll-mt-[220px] space-y-12">
            <h2 className="font-headline text-4xl font-bold text-primary">Infrastructure & Facilities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {dept.infrastructure.map((inf, i) => {
                const img = PlaceHolderImages.find(p => p.id === inf.imageId);
                return (
                  <div key={i} className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                    {img && <Image src={img.imageUrl} alt={inf.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <h4 className="text-white font-headline text-2xl font-bold mb-2">{inf.title}</h4>
                      <p className="text-white/70 text-sm">{inf.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Research */}
          <section id="research" className="scroll-mt-[220px] space-y-12">
            <h2 className="font-headline text-4xl font-bold text-primary">Research & Publications</h2>
            <div className="space-y-4">
              {dept.research.map((r, i) => (
                <div key={i} className="flex gap-6 p-6 bg-accent/5 rounded-2xl hover:bg-primary/5 transition-colors">
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Microscope className="text-primary h-5 w-5" />
                  </div>
                  <p className="text-lg text-foreground/70">{r}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-[220px]">
            <div className="p-12 bg-primary rounded-[3rem] text-primary-foreground relative overflow-hidden">
              <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="font-headline text-4xl font-bold">Contact Department</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-center">
                      <Mail className="h-6 w-6 opacity-60" />
                      <span className="text-lg">{dept.contact.email}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Phone className="h-6 w-6 opacity-60" />
                      <span className="text-lg">{dept.contact.phone}</span>
                    </div>
                    <div className="flex gap-4 items-start">
                      <MapPin className="h-6 w-6 opacity-60 mt-1" />
                      <span className="text-lg">{dept.contact.location}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
                  <h4 className="font-bold text-xl mb-4">Office In-charge</h4>
                  <p className="text-white/80 text-lg mb-6">{dept.contact.person}</p>
                  <Button variant="secondary" className="w-full h-14 text-lg">Send Inquiry</Button>
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
