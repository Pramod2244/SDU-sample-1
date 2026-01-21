"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const sections = [
  {
    superTitle: "HIGHER-POWERED LEARNING",
    title: "Whole Person Education",
    description:
      "At SDUAHDR University, we empower you to realize your full potential through an inclusive and holistic educational experience grounded in universal values.",
    buttonText: "Educational Approach",
  },
  {
    superTitle: "MEANINGFUL CAREERS",
    title: "Ready for the World",
    description:
      "Our education and deep ties to the best companies prepare you for success in your career and community—wherever life takes you.",
    buttonText: "Learn More",
  },
];

const ValueCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
        {sections.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {section.superTitle}
            </p>
            <h2 className="font-headline text-4xl font-bold mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {section.description}
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {section.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ValueCards;
