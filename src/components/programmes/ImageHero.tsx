"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ImageHeroProps = {
  title: string;
  subtitle: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
};

const ImageHero = ({ title, subtitle, imageUrl, ctaText, ctaLink }: ImageHeroProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section ref={targetRef} className="relative h-[70vh] min-h-[520px] md:h-[70vh] w-full overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        {imageUrl && (
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 md:px-16 lg:px-24 pb-16">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="font-extrabold text-5xl md:text-7xl uppercase"
            style={{ lineHeight: '1.1' }}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg md:text-xl text-white/90"
          >
            {subtitle}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <Button size="lg" asChild>
              <Link href={ctaLink}>{ctaText} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageHero;
