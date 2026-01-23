"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";
import Link from "next/link";
import ValueCards from "./ValueCards";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const sections = [
  {
    superTitle: "ACADEMIC EXCELLENCE",
    title: "Premier Medical Education",
    description:
      "Offering comprehensive undergraduate, postgraduate, and super-specialty programs through our constituent Sri Devaraj Urs Medical College.",
    buttonText: "Explore Programs",
  },
  {
    superTitle: "INNOVATIVE RESEARCH",
    title: "Fostering Discovery",
    description:
      "Committed to advancing healthcare through cutting-edge research, state-of-the-art facilities, and a culture of inquiry and innovation.",
    buttonText: "Our Research",
  },
];


const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);


  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const heroBgImage = PlaceHolderImages.find((img) => img.id === 'hero-background-mobile');

  if (isMobile === undefined) {
    return <section className="relative min-h-screen bg-background" />;
  }

  if (isMobile) {
    return (
      <section className="relative flex flex-col text-white">
        {heroBgImage && (
          <Image
            src={heroBgImage.imageUrl}
            alt={heroBgImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroBgImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col flex-grow justify-start pt-24 pb-12 min-h-screen">
          <div className="flex-grow">
            <h1 className="font-headline text-5xl font-bold leading-tight">
              Excellence in
              <br />
              Education
              <br />
              & Medical
              <br />
              Research
            </h1>
            <div className="mt-6">
              <Link href="#about" className="text-lg inline-flex items-center gap-2 hover:underline">
                A Deemed to be University Accredited 'A' by NAAC
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-10 mt-12">
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
              >
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  {section.superTitle}
                </p>
                <h2 className="font-headline text-4xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  {section.description}
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {section.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col text-white">
      <video
        ref={videoRef}
        src="https://raw.githubusercontent.com/Pramod2244/hello-world/master/18088-288458760_small.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      <div className="flex-grow" />

      <motion.div
        className="relative z-10 container mx-auto px-4 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8">
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl md:text-7xl font-bold leading-tight"
          >
            Excellence in Education
            <br />
            & Medical Research
          </motion.h1>
          <motion.div variants={itemVariants} className="mt-6">
            <Link href="#about" className="text-lg inline-flex items-center gap-2 hover:underline">
              A Deemed to be University Accredited 'A' by NAAC
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
        
        <ValueCards />
      </motion.div>
      
      <motion.button
        onClick={togglePlay}
        className="absolute top-1/2 right-8 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors hidden md:block"
        aria-label={isPlaying ? "Pause video" : "Play video"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isPlaying ? <Pause className="h-6 w-6 text-white fill-white" /> : <Play className="h-6 w-6 text-white fill-white" />}
      </motion.button>
    </section>
  );
};

export default HeroSection;
