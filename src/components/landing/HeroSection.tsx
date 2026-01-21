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
    <section className="relative h-screen flex flex-col text-white">
      <video
        ref={videoRef}
        src="https://download-video-ak.vimeocdn.com/v3-1/playback/fd958212-899e-494c-9b06-fee33e8a5763/11c5e2b1?__token__=st=1769015247~exp=1769018847~acl=%2Fv3-1%2Fplayback%2Ffd958212-899e-494c-9b06-fee33e8a5763%2F11c5e2b1%2A~hmac=2206881cc3232a059c391ae89428e6356dd699552e65569abbd0f00dfbde0d4a&r=dXMtY2VudHJhbDE%3D"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />

      <motion.div
        className="relative z-10 flex-grow flex items-center container mx-auto px-4 text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl md:text-7xl font-bold leading-tight"
          >
            BE ON THE FOREFRONT.
            <br />
            BE UNSTOPPABLE.
          </motion.h1>
          <motion.div variants={itemVariants} className="mt-6">
            <Link href="#" className="text-lg inline-flex items-center gap-2 hover:underline">
              See what it means to Be Legendary
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="relative z-10 pb-12">
        <ValueCards />
      </div>
      
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
