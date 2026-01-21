"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Admissions = () => {
  const admissionsImage = PlaceHolderImages.find(
    (img) => img.id === "admissions-image"
  );
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const contentBlocks = [
    { title: "Undergraduate", description: "Begin your academic journey with us." },
    { title: "Graduate", description: "Advance your career and expertise." },
    { title: "International", description: "Join our global student community." },
    { title: "Financial Aid", description: "Explore scholarships and support options." },
  ];

  return (
    <section id="admissions" className="py-20 lg:py-32 bg-card overflow-hidden">
      <div
        ref={targetRef}
        className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="relative h-[600px] lg:h-full rounded-xl overflow-hidden shadow-2xl">
          {admissionsImage && (
            <motion.div style={{ y: imageY }} className="h-[130%] w-full">
              <Image
                src={admissionsImage.imageUrl}
                alt={admissionsImage.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={admissionsImage.imageHint}
              />
            </motion.div>
          )}
        </div>
        <motion.div style={{ y: contentY }} className="space-y-8">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Admissions &amp; Aid
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Your future starts here. Discover the application process, requirements, and financial aid opportunities available at SDUAHDR.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {contentBlocks.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                  <h3 className="font-headline text-2xl font-semibold mb-2">{block.title}</h3>
                  <p className="text-foreground/70">{block.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Learn How to Apply <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Admissions;
