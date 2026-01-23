"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const sections = [
  {
    superTitle: "ACADEMIC EXCELLENCE",
    title: "Premier Medical Education",
    description:
      "Offering comprehensive undergraduate, postgraduate, and super-specialty programs through our constituent Sri Devaraj Urs Medical College.",
    buttonText: "Explore Programs",
  },
  {
    superTitle: "INNOVATIVE RESEARCH",
    title: "Fostering Discovery",
    description:
      "Committed to advancing healthcare through cutting-edge research, state-of-the-art facilities, and a culture of inquiry and innovation.",
    buttonText: "Our Research",
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
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-16">
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
