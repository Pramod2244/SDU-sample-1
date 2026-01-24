"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type VideoHeroProps = {
  videoUrl: string;
  posterImageUrl?: string;
  title: string;
  subtitle: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
};

const VideoHero = ({
  videoUrl,
  posterImageUrl,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: VideoHeroProps) => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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
    <section ref={targetRef} className="relative h-[80vh] min-h-[600px] lg:h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <motion.div style={!isMobile ? { scale: videoScale } : {}} className="w-full h-full">
          {isMobile ? (
            posterImageUrl && <Image
              src={posterImageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterImageUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl md:text-7xl font-bold leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl"
          >
            {subtitle}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            {primaryCta && (
              <Button size="lg" asChild>
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black" asChild>
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {!isMobile && (
        <motion.button
          onClick={togglePlay}
          className="absolute bottom-8 right-8 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {isPlaying ? <Pause className="h-5 w-5 text-white fill-white" /> : <Play className="h-5 w-5 text-white fill-white" />}
        </motion.button>
      )}
    </section>
  );
};

export default VideoHero;
