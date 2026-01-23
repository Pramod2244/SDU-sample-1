"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      className="w-[90vw] md:w-[45vw] lg:w-[30vw] shrink-0"
      whileHover={{ scale: 1.02 }}
    >
      <Card className="h-full bg-card overflow-hidden group shadow-lg">
        <div className="relative h-72 w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
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
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.1, 1], ["5%", "-150%"]);
  
  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-full flex items-center z-10">
          <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
              >
                <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">Find Your Place.</h2>
                <p className="mt-4 text-xl text-foreground/70 max-w-2xl">
                  From the stage to the sports field, discover a community where you belong.
                </p>
              </motion.div>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-[5vw]">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
           <div className="w-[50vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalExperiences;
