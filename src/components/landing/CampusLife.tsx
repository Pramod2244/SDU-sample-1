"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

const topics = [
  { id: "campus-life-housing", title: "Housing &amp; Dining", description: "Comfortable living and diverse culinary experiences.", imageHint: "student dormitory" },
  { id: "campus-life-clubs", title: "Student Clubs", description: "Connect with peers who share your passions.", imageHint: "student group" },
  { id: "campus-life-wellness", title: "Wellness &amp; Safety", description: "A supportive environment for your well-being.", imageHint: "university gym" },
  { id: "campus-life-community", title: "Community Engagement", description: "Make a positive impact on and off campus.", imageHint: "volunteers working" },
];

const CampusLife = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  return (
    <section id="campus-life" className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Vibrant Campus Life
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Life at SDUAHDR is more than just academics. It&apos;s about growth, community, and unforgettable experiences.
          </p>
        </motion.div>
      </div>
      
      <div ref={scrollRef} className="w-full cursor-grab">
        <motion.div
          drag="x"
          dragConstraints={scrollRef}
          className="flex gap-8 px-4 sm:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {topics.map((topic) => {
            const image = PlaceHolderImages.find((img) => img.id === topic.id);
            return (
              <motion.div key={topic.id} variants={itemVariants} className="min-w-[80vw] md:min-w-[400px]">
                <Card className="h-full overflow-hidden shadow-lg group">
                  <div className="relative h-64 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 80vw, 400px"
                        data-ai-hint={topic.imageHint}
                      />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-2xl font-semibold mb-2">{topic.title}</h3>
                    <p className="text-foreground/80">{topic.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CampusLife;
