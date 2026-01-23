"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CityParallax = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  const textVariant = (from: 'left' | 'right') => ({
    hidden: { opacity: 0, x: from === 'left' ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  });

  const image = PlaceHolderImages.find(img => img.id === 'city-parallax-bg');

  return (
    <section
      ref={targetRef}
      className="relative h-screen bg-black text-white overflow-hidden"
    >
      {image && (
          <motion.div className="absolute inset-0" style={{ y }}>
              <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
              />
          </motion.div>
      )}
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={textVariant('left')}
            >
              <h2 className="font-headline text-5xl md:text-7xl font-bold">
                More Than a Campus,
                <br />
                A Gateway to Kolar.
              </h2>
            </motion.div>
             <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={textVariant('right')}
              className="space-y-6"
            >
                <p className="text-xl text-white/80 leading-relaxed">
                  Our strong ties with Kolar provide unmatched opportunities for internships, cultural exposure, and real-world experience, connecting your education to the heartbeat of the industry.
                </p>
                <Button variant="outline" size="lg" className="text-white border-white bg-transparent hover:bg-white hover:text-black">
                  Explore Kolar Connections <ArrowRight className="ml-2"/>
                </Button>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CityParallax;
