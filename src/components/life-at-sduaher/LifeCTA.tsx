"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const LifeCTA = () => {
  const isMobile = useIsMobile();
  const mobileBg = PlaceHolderImages.find(img => img.id === 'cta-bg-mobile');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="relative h-[80vh] w-full text-white">
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile ? (
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-university-students-throwing-their-hats-in-the-air-4264-large.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          mobileBg && <Image src={mobileBg.imageUrl} alt={mobileBg.description} fill className="object-cover" data-ai-hint={mobileBg.imageHint} />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="font-headline text-5xl md:text-8xl font-bold"
          variants={itemVariants}
        >
          Experience Life at SDUAHER
        </motion.h2>
        <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
        >
          <Button size="lg" asChild>
            <Link href="/#admissions">Apply Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
            Visit Campus
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LifeCTA;
