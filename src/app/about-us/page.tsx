
'use client';

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowDown, CheckCircle2, MapPin, Phone, Mail, Award, Users, BookOpen, HeartPulse } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// --- Sub-components ---

const TypewriterSub = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const StatCounter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{count}{suffix}</div>
      <div className="text-sm md:text-base text-white/70 uppercase tracking-widest">{label}</div>
    </div>
  );
};

// --- Page Sections ---

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'about-hero-bg');
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={targetRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-5xl md:text-8xl font-bold text-white leading-tight"
        >
          Sri Devaraj Urs <br className="hidden md:block" /> Medical College
        </motion.h1>
        <motion.p 
          className="mt-6 text-xl md:text-3xl text-white/90 font-medium h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <TypewriterSub text="Excellence in Medical Education Since 1986" />
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.5 }}
           className="mt-10"
        >
          <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-primary hover:bg-primary/90">
             Discover Our Legacy
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-10 w-10 text-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

const InstitutionOverview = () => {
  const img1 = PlaceHolderImages.find(img => img.id === 'institution-collage-1');
  const img2 = PlaceHolderImages.find(img => img.id === 'institution-collage-2');

  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              {img1 && <Image src={img1.imageUrl} alt={img1.description} fill className="object-cover" />}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-10 -right-10 w-2/3 aspect-square rounded-3xl overflow-hidden shadow-2xl z-20 border-8 border-background hidden md:block"
            >
              {img2 && <Image src={img2.imageUrl} alt={img2.description} fill className="object-cover" />}
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-4xl md:text-5xl font-bold text-primary"
            >
              About the Institution
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-foreground/80 leading-relaxed"
            >
              Located in the scenic surroundings of Tamaka, Kolar, Karnataka, Sri Devaraj Urs Medical College (SDUMC) was established in 1986 under the visionary leadership of the Sri Devaraj Urs Educational Trust. Named after the former Chief Minister of Karnataka, Sri Devaraj Urs, the institution has become a beacon of academic excellence and healthcare innovation.
            </motion.p>
            <div className="grid gap-6">
              {[
                "Recognised by National Medical Commission (NMC)",
                "Constituent College of SDUAHER (Deemed-to-be-University)",
                "Accredited 'A' Grade by NAAC",
                "Advanced Clinical Training with 1000+ Bed Hospital",
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-1 bg-primary/10 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VisionMission = () => {
  return (
    <section id="vision" className="py-20 lg:py-32 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 bg-white rounded-[2rem] shadow-soft-lg border border-primary/10"
          >
            <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-8">
               <BookOpen className="text-white" />
            </div>
            <h3 className="font-headline text-3xl font-bold text-primary mb-6">Our Vision</h3>
            <p className="text-xl text-foreground/70 leading-relaxed italic">
              "To be a transformative institution blending modern medical science with human-centered care, producing competent healthcare professionals who lead with compassion and ethical integrity."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 md:p-16 bg-primary text-primary-foreground rounded-[2rem] shadow-soft-lg"
          >
            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center mb-8 text-primary">
               <HeartPulse />
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6">Our Mission</h3>
            <ul className="space-y-4 text-lg text-primary-foreground/80">
              <li>• Provide world-class medical education and hands-on research training.</li>
              <li>• Deliver affordable, evidence-based healthcare to rural communities.</li>
              <li>• Foster a culture of ethical practice and social responsibility.</li>
              <li>• Continuous innovation in teaching-learning methodologies.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const points = [
    { title: "Holistic Medical Training", icon: Award, desc: "A curriculum that integrates basic science with clinical application." },
    { title: "Experienced Faculty", icon: Users, desc: "Learn from internationally recognized physicians and researchers." },
    { title: "Advanced Research Centers", icon: BookOpen, desc: "Access to cutting-edge labs focused on molecular medicine and genomics." },
    { title: "Clinical Exposure", icon: HeartPulse, desc: "Hands-on experience at the R.L. Jalappa Hospital with high patient volume." }
  ];

  return (
    <section id="why-sdumc" className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-20">Why Choose SDUMC?</h2>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/10 hidden md:block" />
          
          <div className="space-y-24">
            {points.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end">
                   <div className={`p-8 bg-card rounded-3xl shadow-soft-lg border border-border w-full max-w-sm ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                      <p.icon className="h-10 w-10 text-primary mb-4" />
                      <h4 className="text-xl font-bold mb-2">{p.title}</h4>
                      <p className="text-foreground/70">{p.desc}</p>
                   </div>
                </div>
                {/* Dot */}
                <div className="h-6 w-6 rounded-full bg-primary border-4 border-background z-10 hidden md:block" />
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const images = [
    { id: 'gallery-panoramic', span: 'col-span-2 row-span-2' },
    { id: 'gallery-lab', span: 'col-span-1 row-span-1' },
    { id: 'dept-anatomy', span: 'col-span-1 row-span-1' },
    { id: 'institution-collage-2', span: 'col-span-1 row-span-2' },
    { id: 'hospital-clinical', span: 'col-span-1 row-span-1' },
  ];

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-accent text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-4">Campus Gallery</h2>
          <p className="text-white/60 text-lg">A glimpse into our world-class infrastructure and life.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[600px] md:h-[800px]">
          {images.map((img, i) => {
            const imageData = PlaceHolderImages.find(p => p.id === img.id);
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-3xl cursor-pointer ${img.span}`}
              >
                {imageData && <Image src={imageData.imageUrl} alt={imageData.description} fill className="object-cover transition-transform duration-700 hover:scale-110" />}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const mapImg = PlaceHolderImages.find(img => img.id === 'map-placeholder');
  
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Get in Touch</h2>
              <p className="text-lg text-foreground/70">Our dedicated team is here to answer your academic and clinical queries.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                   <h4 className="font-bold text-xl mb-1">Campus Address</h4>
                   <p className="text-foreground/70 text-lg">Tamaka, Kolar - 563103, <br />Karnataka, India.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                   <h4 className="font-bold text-xl mb-1">Contact Numbers</h4>
                   <p className="text-foreground/70 text-lg">+91 8152 210604 <br /> +91 8152 243003</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                   <h4 className="font-bold text-xl mb-1">Email Support</h4>
                   <p className="text-foreground/70 text-lg">admissions@sduaher.ac.in <br /> office.sdumc@sduaher.ac.in</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="rounded-full px-12 py-7 text-lg shadow-xl shadow-primary/20">
              Apply Now
            </Button>
          </div>

          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            {mapImg && <Image src={mapImg.imageUrl} alt="Map" fill className="object-cover opacity-50 bg-accent/10" />}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            
            {/* Pulsing Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute h-16 w-16 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
               />
               <motion.div 
                 className="relative h-8 w-8 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
               >
                 <MapPin className="text-white h-4 w-4" />
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />
      <main>
        <HeroSection />
        
        {/* Counter Strip */}
        <section className="bg-accent py-12 relative z-20 -mt-20 border-y border-white/10 overflow-hidden">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCounter end={1986} label="Established" />
                <StatCounter end={150} suffix="+" label="MBBS Seats" />
                <StatCounter end={100} suffix="+" label="Expert Faculty" />
                <StatCounter end={100} suffix="+" label="Acre Campus" />
             </div>
          </div>
        </section>

        <InstitutionOverview />
        <VisionMission />
        <WhyChooseUs />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
