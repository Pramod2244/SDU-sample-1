"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const quotes = [
  {
    quote: "The good physician treats the disease; the great physician treats the patient who has the disease.",
    author: "William Osler",
  },
  {
    quote: "To know even one life has breathed easier because you have lived. This is to have succeeded.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "Wherever the art of medicine is loved, there is also a love of humanity.",
    author: "Hippocrates",
  },
  {
    quote: "The aim of medicine is to prevent disease and prolong life; the ideal of medicine is to eliminate the need for a physician.",
    author: "William J. Mayo",
  }
];

const QuoteItem = ({ quote, author, scrollYProgress, index }: { quote: string; author: string; scrollYProgress: any; index: number }) => {
    const N = quotes.length;
    // Each item's "active" range is when the scroll progress is centered on it.
    const itemStart = index / N;
    const itemEnd = (index + 1) / N;
    
    // We create a smoother highlighting effect that is strongest when the item is in its "active" range.
    const highlightOpacity = useTransform(
        scrollYProgress,
        [itemStart - (1 / N) * 0.5, itemStart, itemEnd, itemEnd + (1 / N) * 0.5],
        [0.3, 1, 1, 0.3]
    );

    const scale = useTransform(
        scrollYProgress,
        [itemStart - (1 / N) * 0.5, itemStart, itemEnd, itemEnd + (1 / N) * 0.5],
        [0.95, 1, 1, 0.95]
    );

    return (
        <motion.div
            style={{ opacity: highlightOpacity, scale }}
            className="text-center"
        >
            <blockquote className="font-headline text-3xl md:text-5xl font-medium text-primary leading-tight">
                “{quote}”
            </blockquote>
            <p className="mt-6 text-xl text-foreground/70">— {author}</p>
        </motion.div>
    );
};


const Quotes = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  // The scroll progress is measured as the component scrolls through the center of the viewport.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  });

  return (
    <section ref={targetRef} className="bg-black py-20 lg:py-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col gap-24 md:gap-32">
            {quotes.map((item, index) => (
                <QuoteItem key={index} {...item} scrollYProgress={scrollYProgress} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Quotes;
