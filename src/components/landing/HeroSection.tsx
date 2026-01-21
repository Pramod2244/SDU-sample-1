"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";
import Link from "next/link";
import ValueCards from "./ValueCards";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

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

  return (
    <section className="relative h-screen flex flex-col justify-end text-white">
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

      <motion.div
        className="relative z-10 container mx-auto px-4 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-16">
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
        className="absolute top-1/2 right-8 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors"
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
