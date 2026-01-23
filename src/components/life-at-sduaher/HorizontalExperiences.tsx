"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    id: "horizontal-exp-1",
    title: "Clubs & Societies",
    description: "Connect with peers who share your passions, from academic societies to cultural clubs.",
    imageHint: "students collaborating",
  },
  {
    id: "horizontal-exp-2",
    title: "Sports & Recreation",
    description: "Stay active and competitive with our top-notch sports facilities and university teams.",
    imageHint: "university basketball",
  },
  {
    id: "horizontal-exp-3",
    title: "Cultural Events",
    description: "Celebrate diversity and talent through a vibrant calendar of festivals, performances, and art shows.",
    imageHint: "cultural festival",
  },
  {
    id: "horizontal-exp-4",
    title: "Leadership Programs",
    description: "Develop your leadership skills through workshops, mentorship, and student government.",
    imageHint: "student leader",
  },
  {
    id: "horizontal-exp-5",
    title: "Community Service",
    description: "Make a difference in the community with volunteer opportunities and social initiatives.",
    imageHint: "students volunteering",
  },
];

const ExperienceCard = ({
  id,
  title,
  description,
  imageHint,
}: {
  id: string;
  title: string;
  description: string;
  imageHint: string;
}) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return (
    <motion.div
      className="w-[80vw] md:w-[40vw] lg:w-[30vw] shrink-0"
      whileHover={{ y: -5 }}
    >
      <Card className="h-full bg-card overflow-hidden group shadow-lg border border-transparent hover:border-primary transition-all duration-300">
        <div className="relative h-72 w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={imageHint}
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
        </div>
        <CardContent className="p-6">
          <CardTitle className="font-headline text-2xl mb-2">{title}</CardTitle>
          <p className="text-foreground/80 mb-4">{description}</p>
          <div className="text-primary font-semibold inline-flex items-center">
            Learn More <ArrowUpRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HorizontalExperiences = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="bg-background py-20 lg:py-32 overflow-x-clip">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">Find Your Place.</h2>
          <p className="mt-4 text-xl text-foreground/70 max-w-2xl">
            From the stage to the sports field, discover a community where you belong. Drag to explore.
          </p>
        </motion.div>

        <motion.div 
          ref={scrollContainerRef} 
          className="w-full cursor-grab active:cursor-grabbing"
          variants={itemVariants}
        >
          <motion.div
            drag="x"
            dragConstraints={scrollContainerRef}
            className="flex gap-8"
          >
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HorizontalExperiences;
