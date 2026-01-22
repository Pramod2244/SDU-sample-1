"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Updated quotes based on the OCR from the image
const quotes = [
  {
    quote: "This place didn't just change my résumé, it changed my aim.",
    author: "Jordan M.",
    details: "Computer Science, '25",
  },
  {
    quote: "I found mentors who expect big things—and help me get there.",
    author: "Anika R.",
    details: "Mechanical Engineering, '26",
  },
  {
    quote: "Purpose isn't a slogan here. It's the work we do every day.",
    author: "Luis F.",
    details: "Public Policy, '24",
  },
  {
    quote: "Being in the city means what we learn moves—fast.",
    author: "Sam K.",
    details: "Marketing, '25",
  },
  {
    quote: "Community is why I came. Opportunity is why I stay.",
    author: "Maya T.",
    details: "Nursing, '26",
  }
];

const QuoteItem = ({ quote, author, details, scrollYProgress, index }: { quote: string; author: string; details: string; scrollYProgress: any; index: number }) => {
    const N = quotes.length;
    const itemStart = index / N;
    const itemEnd = (index + 1) / N;
    const sectionCenter = itemStart + (itemEnd - itemStart) / 2;

    // A more focused opacity transform
    const highlightOpacity = useTransform(
        scrollYProgress,
        [itemStart, sectionCenter, itemEnd],
        [0.5, 1, 0.5]
    );

    const scale = useTransform(
        scrollYProgress,
        [itemStart, sectionCenter, itemEnd],
        [0.95, 1, 0.95]
    );

    return (
        <motion.div
            style={{ opacity: highlightOpacity, scale }}
            className="text-center"
        >
            <blockquote className="text-3xl md:text-5xl font-bold leading-tight">
                {quote}
            </blockquote>
            <div className="mt-6">
              <p className="text-base font-semibold">{author}</p>
              <p className="text-base text-primary-foreground/70">{details}</p>
            </div>
        </motion.div>
    );
};


const Quotes = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  });

  return (
    <section ref={targetRef} className="bg-primary text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute -top-8 left-16 text-[20rem] font-headline opacity-10 -rotate-12 select-none z-0">“</div>
      <div className="absolute -bottom-24 right-16 text-[20rem] font-headline opacity-10 rotate-12 select-none z-0">”</div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="flex flex-col gap-16 md:gap-20">
            {quotes.map((item, index) => (
                <QuoteItem key={index} {...item} scrollYProgress={scrollYProgress} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Quotes;