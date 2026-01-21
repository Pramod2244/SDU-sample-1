"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

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
