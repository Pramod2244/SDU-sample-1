"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const storyContent = [
  {
    title: "Forge Your Path",
    text: "At SDUAHER, you're not just a student; you're a future leader, an innovator, a pioneer. We provide the tools, you build the legacy.",
    image: PlaceHolderImages.find(img => img.id === 'legendary-story-1'),
  },
  {
    title: "Innovate with Purpose",
    text: "Engage in groundbreaking research that pushes boundaries and transforms lives. Your work here has a global impact.",
    image: PlaceHolderImages.find(img => img.id === 'legendary-story-2'),
  }
];

const StoryImage = ({ item, index, scrollYProgress }: { item: typeof storyContent[0], index: number, scrollYProgress: MotionValue<number> }) => {
  const N = storyContent.length;
  const opacity = useTransform(
    scrollYProgress,
    [(index - 0.5) / N, index / N, (index + 0.5) / N],
    [0, 1, 0]
  );

  return (
    item.image && (
      <motion.div style={{ opacity }} className="absolute inset-0">
        <Image src={item.image.imageUrl} alt={item.image.description} fill className="object-cover" data-ai-hint={item.image.imageHint} />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
    )
  );
};

const StoryText = ({ item, index, scrollYProgress }: { item: typeof storyContent[0], index: number, scrollYProgress: MotionValue<number> }) => {
  const N = storyContent.length;
  const opacity = useTransform(
    scrollYProgress,
    [(index - 0.5) / N, index / N, (index + 0.5) / N],
    [0, 1, 0]
  );
  const y = useTransform(scrollYProgress, [index / N, (index + 1) / N], ['2rem', '-2rem']);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute max-w-3xl mx-auto px-4"
    >
      <h2 className="font-headline text-5xl md:text-7xl font-bold">{item.title}</h2>
      <p className="mt-6 text-lg md:text-2xl text-white/80">{item.text}</p>
    </motion.div>
  );
};


const Story = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (isMobile === undefined) {
    return <div className="bg-black h-[200vh]" />;
  }

  if (isMobile) {
    return (
      <section className="bg-black text-white py-20 px-4">
        {storyContent.map((item, index) => (
          <div key={index} className="mb-16 last:mb-0 text-center">
             {item.image && (
                 <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
                    <Image src={item.image.imageUrl} alt={item.image.description} fill className="object-cover" data-ai-hint={item.image.imageHint} />
                </div>
            )}
            <h2 className="font-headline text-4xl font-bold mb-4">{item.title}</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">{item.text}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {storyContent.map((item, index) => (
          <StoryImage key={`image-${index}`} item={item} index={index} scrollYProgress={scrollYProgress} />
        ))}

        <div className="relative z-10 text-center text-white w-full h-full flex items-center justify-center">
            {storyContent.map((item, index) => (
              <StoryText key={`text-${index}`} item={item} index={index} scrollYProgress={scrollYProgress} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
