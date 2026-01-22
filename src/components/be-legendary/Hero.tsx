"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.6, 0.8, 0.4]);

  const heroBgImage = PlaceHolderImages.find((img) => img.id === 'be-legendary-hero-bg');

  return (
    <section ref={targetRef} className="relative h-screen w-full text-white">
      <div className="sticky top-0 h-full w-full">
          <div className="relative w-full h-full">
              {!isMobile ? (
                  <video
                      src="https://raw.githubusercontent.com/Pramod2244/hello-world/master/90933-629483642_small.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                  />
              ) : (
                  heroBgImage && <Image src={heroBgImage.imageUrl} alt={heroBgImage.description} fill className="object-cover" data-ai-hint={heroBgImage.imageHint} />
              )}
              <motion.div style={{opacity: videoOpacity}} className="absolute inset-0 bg-black" />
          </div>
      </div>
        
      <motion.div 
        style={{ opacity, scale }} 
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4"
      >
        <motion.h1 
          className="font-headline text-5xl md:text-8xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Be Legendary
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg md:text-2xl max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Shape the Future of Healthcare at SDUAHER
        </motion.p>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5}}
            className='flex flex-col items-center'
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-8 w-8 text-white" />
            </motion.div>
            <span className='mt-2 text-sm'>Scroll to Explore</span>
          </motion.div>
      </div>
    </section>
  );
};

export default Hero;
