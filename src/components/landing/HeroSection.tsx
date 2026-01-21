"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
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

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <video
        src="https://download-video-ak.vimeocdn.com/v3-1/playback/fd958212-899e-494c-9b06-fee33e8a5763/11c5e2b1?__token__=st=1769015247~exp=1769018847~acl=%2Fv3-1%2Fplayback%2Ffd958212-899e-494c-9b06-fee33e8a5763%2F11c5e2b1%2A~hmac=2206881cc3232a059c391ae89428e6356dd699552e65569abbd0f00dfbde0d4a&r=dXMtY2VudHJhbDE%3D"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />
      <motion.div
        className="relative z-10 text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="font-headline text-5xl md:text-7xl font-bold"
        >
          Shape Your Future at SDUAHDR
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto font-light"
        >
          Education driven by purpose, innovation, and global impact.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">Apply Now</Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
            Explore Programs
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute bottom-10"
      >
        <ArrowDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
