"use client";

import { useRef, useState, useLayoutEffect } from "react";
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
    <div
      className="w-[80vw] md:w-[40vw] lg:w-[30vw] shrink-0"
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
    </div>
  );
};


const HorizontalExperiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [carouselEnd, setCarouselEnd] = useState(0);

  useLayoutEffect(() => {
    const onResize = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        setCarouselEnd(scrollWidth - clientWidth);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0.1, 0.85], [0, -carouselEnd]);
  
  // Fade out the text as scrolling starts
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div style={{ opacity: textOpacity }} className="container mx-auto px-4 mb-12">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">Find Your Place.</h2>
          <p className="mt-4 text-xl text-foreground/70 max-w-2xl">
            From the stage to the sports field, discover a community where you belong.
          </p>
        </motion.div>

        <motion.div ref={carouselRef} style={{ x }} className="flex gap-8 pl-8 md:pl-16 lg:pl-32">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalExperiences;
