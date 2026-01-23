"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const VideoBreak = () => {
  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], ['2rem', '0rem']);
  
  const mobileBg = PlaceHolderImages.find(img => img.id === 'video-break-mobile');

  return (
    <section ref={targetRef} className="relative h-[80vh] w-full text-white">
      <div className="sticky top-0 h-full w-full overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
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
             mobileBg && <Image src={mobileBg.imageUrl} alt={mobileBg.description} fill className="object-cover" data-ai-hint={mobileBg.imageHint} />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
            <motion.p 
              style={{ opacity, y }}
              className="font-headline text-3xl md:text-5xl max-w-4xl text-center px-4"
            >
              "Life here is vibrant, inclusive, and unforgettable."
            </motion.p>
        </div>
      </div>
    </section>
  );
};

export default VideoBreak;
