"use client";

import { motion } from "framer-motion";
import { Book, Target, Globe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Book,
    title: "Whole-Person Education",
    description: "Fostering intellectual, personal, and spiritual growth to develop well-rounded individuals.",
  },
  {
    icon: Target,
    title: "Career-Focused Learning",
    description: "Integrating practical experience and career preparation into every academic program.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Cultivating global awareness and intercultural competence for a connected world.",
  },
];

const ValueCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className="py-20 lg:py-32 bg-card">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="text-center h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary text-primary-foreground p-4 rounded-full mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ValueCards;
