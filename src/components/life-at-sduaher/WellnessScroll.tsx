"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const wellnessContent = [
  {
    id: "wellness-1",
    title: "Wellness & Mental Health",
    description: "Your well-being is our priority. Access confidential counseling, wellness workshops, and resources designed to support your mental and emotional health throughout your academic journey.",
    imageHint: "student counseling",
  },
  {
    id: "wellness-2",
    title: "Safety & Security",
    description: "Feel safe and secure on a campus protected by 24/7 security, emergency blue light systems, and a dedicated team committed to creating a safe environment for all.",
    imageHint: "campus security",
  },
  {
    id: "wellness-3",
    title: "Spiritual & Community Life",
    description: "Explore your faith and connect with others through various student-led spiritual groups, interfaith dialogues, and community service initiatives that foster a sense of purpose and belonging.",
    imageHint: "students community",
  },
];

const WellnessScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  scrollYProgress.on("change", (latest) => {
    const newIndex = Math.min(
      wellnessContent.length - 1,
      Math.floor(latest * wellnessContent.length)
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background py-20 lg:py-32">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 space-y-12">
              {wellnessContent.map((item, index) => (
                <div key={item.id} className="min-h-[25vh] flex flex-col justify-center">
                  <motion.div
                    animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">{item.title}</h2>
                    <p className="mt-4 text-lg text-foreground/80 leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="relative h-[70vh] hidden lg:block">
              {wellnessContent.map((item, index) => {
                 const image = PlaceHolderImages.find((img) => img.id === item.id);
                 return image ? (
                    <motion.div
                      key={item.id}
                      className="absolute inset-0"
                      animate={{ opacity: activeIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover rounded-xl shadow-2xl"
                        data-ai-hint={item.imageHint}
                      />
                    </motion.div>
                 ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessScroll;
