"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const storyContent = [
  {
    title: "Forge Your Path",
    text: "At SDUAHER, you're not just a student; you're a future leader, an innovator, a pioneer. We provide the tools, you build the legacy."
  },
  {
    title: "Innovate with Purpose",
    text: "Engage in groundbreaking research that pushes boundaries and transforms lives. Your work here has a global impact."
  },
  {
    title: "Lead with Compassion",
    text: "Master the science of medicine and the art of care. We cultivate professionals who lead with both their head and their heart."
  },
  {
    title: "Join a Legacy of Excellence",
    text: "Become part of a community dedicated to excellence, service, and the relentless pursuit of knowledge."
  }
];

const Story = () => {
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
    offset: ['start start', 'end end']
  });

  if (isMobile) {
    return (
      <section className="bg-black text-white py-20 px-4">
        {storyContent.map((item, index) => (
          <div key={index} className="mb-16 last:mb-0 text-center">
            <h2 className="font-headline text-4xl font-bold mb-4">{item.title}</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">{item.text}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {storyContent.map((item, index) => {
          const start = index / storyContent.length;
          const end = (index + 1) / storyContent.length;
          const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
          const y = useTransform(scrollYProgress, [start, end], ['50px', '-50px']);
          
          return (
            <motion.div
              key={index}
              style={{ opacity, y }}
              className="absolute text-center text-white max-w-3xl mx-auto px-4"
            >
              <h2 className="font-headline text-5xl md:text-7xl font-bold">{item.title}</h2>
              <p className="mt-6 text-lg md:text-2xl text-white/80">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Story;
