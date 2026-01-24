"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, HeartPulse, Lightbulb, ArrowRight } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Users, text: "Clubs & Communities" },
  { icon: HeartPulse, text: "Sports & Wellness" },
  { icon: Lightbulb, text: "Innovation & Leadership" },
];

const CampusLife = () => {
  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const poster = PlaceHolderImages.find(p => p.id === 'campus-life-bg-video-poster');

  const contentVariants = {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  const highlightsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="campus-life"
      ref={targetRef}
      className="relative h-[80vh] min-h-[700px] lg:h-screen w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          poster && <Image
            src={poster.imageUrl}
            alt={poster.description}
            data-ai-hint={poster.imageHint}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <motion.video
            style={{ scale: backgroundScale }}
            src="https://raw.githubusercontent.com/Pramod2244/hello-world/master/18088-288458760_small.mp4"
            poster={poster?.imageUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={contentVariants}
        >
          <h2 className="font-headline text-5xl md:text-7xl font-bold">
            Life at SDUAHER
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            A campus experience built for ambition, culture and connection.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={highlightsContainerVariants}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3"
              variants={highlightItemVariants}
            >
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <span className="font-semibold text-base">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button size="lg" asChild className="bg-white/90 text-black hover:bg-white font-semibold group transition-all duration-300">
            <Link href="/life-at-sduaher">
              Explore Campus Life
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CampusLife;
