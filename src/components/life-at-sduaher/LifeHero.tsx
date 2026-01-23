"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useIsMobile } from "@/hooks/use-mobile";

const LifeHero = () => {
  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const heroBgImage = PlaceHolderImages.find((img) => img.id === "life-hero-mobile");

  return (
    <section ref={targetRef} className="relative h-screen w-full text-white">
      <div className="sticky top-0 h-full w-full overflow-hidden">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          {!isMobile ? (
            <video
              src="https://raw.githubusercontent.com/Pramod2244/hello-world/master/18088-288458760_small.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            heroBgImage && (
              <Image
                src={heroBgImage.imageUrl}
                alt={heroBgImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroBgImage.imageHint}
                priority
              />
            )
          )}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4"
      >
        <motion.h1
          className="font-headline text-5xl md:text-8xl font-bold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Life at SDUAHER
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Where learning extends beyond classrooms.
        </motion.p>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-8 w-8 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifeHero;
