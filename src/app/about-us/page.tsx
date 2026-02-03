
'use client';

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowDown, CheckCircle2, MapPin, Phone, Mail, Award, Users, BookOpen, HeartPulse, ChevronRight, Quote } from 'lucide-react';
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

const FounderSection = () => {
  const founderPhoto = PlaceHolderImages.find(img => img.id === 'founder-photo');
  
  return (
    <section className="relative py-20 lg:py-40 bg-background overflow-hidden">
      {/* Heritage Texture Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: Founder Photo */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
              {founderPhoto && (
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="h-full w-full"
                >
                  <Image 
                    src={founderPhoto.imageUrl} 
                    alt="Late Sri Devaraj Urs" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    data-ai-hint="executive portrait"
                  />
                </motion.div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.div 
                className="absolute inset-0 border-2 border-primary/20 rounded-2xl m-4 pointer-events-none"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Right: Legacy Story */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-primary font-bold tracking-[0.2em] uppercase text-sm"
              >
                <div className="h-[1px] w-12 bg-primary" />
                Founder & Visionary
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-headline text-5xl md:text-7xl font-bold text-primary"
              >
                Sri Devaraj Urs
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative pl-8 border-l-4 border-primary/20"
            >
              <Quote className="absolute -left-6 -top-4 text-primary/10 h-12 w-12" />
              <p className="text-2xl italic font-headline text-foreground/80 leading-snug">
                "A vision rooted in service, education, and humanity. To empower the rural community with the light of knowledge and the care of healing."
              </p>
            </motion.div>

            <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Sri Devaraj Urs, the former Chief Minister of Karnataka, was a transformative leader whose life was dedicated to social justice and the upliftment of the underprivileged. His conviction that education and healthcare are the fundamental pillars of a progressive society led to the inception of this institution.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                Today, his legacy lives on through SDUAHER, which stands as a testament to his enduring commitment to excellence, integrity, and the service of mankind. We carry forward his mantle, ensuring that every student who passes through these halls is imbued with a spirit of leadership and a heart for service.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadershipTransition = () => {
  return (
    <div className="bg-background py-12 flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "80%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-[1px] bg-primary/20"
      />
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 text-sm uppercase tracking-[0.5em] text-primary/60 font-medium text-center"
      >
        Guided by Vision, Led by Collective Wisdom
      </motion.p>
    </div>
  );
};

const TrusteesSection = () => {
  const trustees = [
    { name: "Shri G.H. Nagaraja", title: "President", img: "trustee-1" },
    { name: "Shri J. Rajendra", title: "Vice-President", img: "trustee-2" },
    { name: "Shri K.G. Hanumantha Raju", title: "Secretary", img: "trustee-3" },
    { name: "Shri M. Chandra Reddy", title: "Treasurer", img: "trustee-4" },
    { name: "Dr. C.K. Ranjan", title: "Trustee Member", img: "trustee-5" },
    { name: "Shri R.L. Jalappa", title: "Honorary Patron", img: "trustee-6" },
    { name: "Smt. Shanti Devi", title: "Trustee Member", img: "trustee-7" },
    { name: "Shri V. Ramaswamy", title: "Trustee Member", img: "trustee-8" },
    { name: "Shri T. Muninarayana", title: "Trustee Member", img: "trustee-9" },
    { name: "Shri B.V. Muniyappa", title: "Trustee Member", img: "trustee-10" },
    { name: "Shri N. Lokesh", title: "Trustee Member", img: "trustee-11" },
    { name: "Shri S. Srinivasan", title: "Trustee Member", img: "trustee-12" },
  ];

  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.05);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <section className="py-20 lg:py-40 bg-primary/[0.02] relative overflow-hidden min-h-[900px]">
      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-5xl md:text-6xl font-bold text-primary"
          >
            The Circle of Leadership
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-6 text-xl text-foreground/60 max-w-2xl mx-auto"
          >
            Governed by a dedicated board of trustees committed to the founding principles of social justice and excellence.
          </motion.p>
        </div>

        {/* Orbit Design - Desktop */}
        <div className="relative hidden lg:flex items-center justify-center h-[700px] w-full max-w-6xl mx-auto">
          {/* Orbiting Lines */}
          <div className="absolute inset-0 border-2 border-primary/5 rounded-full scale-[0.8] pointer-events-none" />
          <div className="absolute inset-0 border-2 border-primary/5 rounded-full scale-[0.5] pointer-events-none" />
          
          <motion.div 
            ref={orbitRef}
            className="relative h-full w-full"
            style={{ rotate: rotation }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {trustees.map((t, i) => {
              const angle = (i * (360 / trustees.length));
              const radius = 350; // px
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              const imagePlaceholder = PlaceHolderImages.find(img => img.id === t.img);

              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ x, y }}
                >
                  <motion.div 
                    style={{ rotate: -rotation }} // Counter rotate to keep text upright
                    whileHover={{ scale: 1.1 }}
                    className="w-48 p-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-soft-lg cursor-pointer group transition-all"
                  >
                    <div className="relative h-20 w-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/10">
                      {imagePlaceholder && <Image src={imagePlaceholder.imageUrl} alt={t.name} fill className="object-cover" />}
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-sm text-primary leading-tight mb-1">{t.name}</h4>
                      <p className="text-[10px] uppercase tracking-wider text-foreground/50">{t.title}</p>
                    </div>
                    
                    {/* Hover Glow */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 bg-primary rounded-full flex flex-col items-center justify-center text-white text-center p-4 shadow-2xl z-20">
             <div className="text-xs uppercase tracking-[0.2em] mb-1">Board Of</div>
             <div className="font-headline text-xl font-bold">Trustees</div>
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute inset-0 border-8 border-white/10 rounded-full"
             />
          </div>
        </div>

        {/* Mobile: Grid / Carousel Alternative */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-4">
          {trustees.map((t, i) => {
            const imagePlaceholder = PlaceHolderImages.find(img => img.id === t.img);
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-white rounded-xl shadow-soft-sm border border-border"
              >
                 <div className="relative h-16 w-16 mx-auto mb-2 rounded-full overflow-hidden">
                   {imagePlaceholder && <Image src={imagePlaceholder.imageUrl} alt={t.name} fill className="object-cover" />}
                 </div>
                 <div className="text-center">
                    <h4 className="font-bold text-xs text-primary leading-tight">{t.name}</h4>
                    <p className="text-[8px] uppercase text-foreground/50">{t.title}</p>
                 </div>
              </motion.div>
            );
          })}
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
        
        {/* New Leadership Sections */}
        <FounderSection />
        <LeadershipTransition />
        <TrusteesSection />
        
        <WhyChooseUs />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
