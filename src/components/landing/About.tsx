"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

const About = () => {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="about"
      className="py-20 lg:py-32 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            {aboutImage && (
              <Card className="overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </Card>
            )}
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              About SDUAHDR
            </h2>

            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="font-headline text-2xl font-semibold mb-2">
                  Mission &amp; Vision
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To cultivate a community of lifelong learners, critical
                  thinkers, and compassionate leaders who are prepared to address
                  the challenges of a complex and interconnected world.
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="font-headline text-2xl font-semibold mb-2">
                  Our Values
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Excellence, integrity, and social responsibility form the
                  cornerstone of our educational philosophy, guiding our pursuit
                  of knowledge and service to humanity.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="border-l-4 border-primary pl-6 py-4 bg-background rounded-r-lg"
            >
              <blockquote className="text-xl italic text-foreground">
                "An investment in knowledge pays the best interest."
              </blockquote>
              <p className="mt-2 text-right font-semibold">- Our Founder</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-headline text-2xl font-semibold mb-2">A Brief History</h3>
              <p className="text-foreground/80 leading-relaxed">
                Founded on the principles of academic rigor and community
                engagement, SDUAHDR has grown from a small college into a
                leading research university, consistently pushing the boundaries
                of innovation and discovery.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
