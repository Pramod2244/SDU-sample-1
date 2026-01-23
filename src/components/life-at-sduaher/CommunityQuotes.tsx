"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const quotes = [
  {
    quote: "I didn't just find friends here; I found my second family. The sense of community is something I'll carry with me forever.",
    author: "Priya S., Class of '24",
    image: PlaceHolderImages.find(img => img.id === "community-quote-1")
  },
  {
    quote: "The support from faculty and peers is incredible. Everyone wants you to succeed. It's a culture of lifting each other up.",
    author: "David L., Class of '25",
    image: PlaceHolderImages.find(img => img.id === "community-quote-2")
  },
];

const CommunityQuotes = () => {
    const quoteVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: 'easeOut'
            }
        })
    }

    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        }
    }

  return (
    <section className="bg-card py-20 lg:py-32">
      <div className="container mx-auto px-4">
         <motion.div 
            className="text-center mb-16"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{ once: true }}
            transition={{duration: 0.8}}
        >
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">
            A Place to Belong.
          </h2>
        </motion.div>

        <div className="space-y-20">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={quoteVariants}
            >
              <div className={`relative h-96 lg:h-[60vh] rounded-xl overflow-hidden shadow-2xl ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                {q.image && (
                    <Image
                        src={q.image.imageUrl}
                        alt={q.author}
                        fill
                        className="object-cover"
                        data-ai-hint={q.image.imageHint}
                    />
                )}
              </div>
              <blockquote className={`relative ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <motion.p 
                    className="text-2xl md:text-4xl font-headline leading-tight italic text-foreground"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.8 }}
                     transition={{ staggerChildren: 0.05 }}
                >
                  {q.quote.split(" ").map((word, wi) => (
                      <motion.span key={wi} className="inline-block" variants={wordVariants}>
                          {word}&nbsp;
                      </motion.span>
                  ))}
                </motion.p>
                <cite className="block mt-6 text-lg font-semibold text-primary not-italic">
                  - {q.author}
                </cite>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityQuotes;
