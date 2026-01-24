"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { programmesData } from '@/lib/programmes-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const ProgrammeLinksGrid = () => {
  return (
    <motion.section
      id="programmes-grid"
      className="py-20 lg:py-32 bg-background scroll-mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="max-w-3xl mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Our Schools & Colleges
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Explore the diverse range of schools and colleges at SDUAHER, each a center of excellence in its field.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {programmesData.map((programme) => (
            <motion.div key={programme.slug} variants={itemVariants}>
              <Link href={`/academics/programmes/${programme.slug}`} className="group inline-block py-2">
                <div className="flex items-center gap-3">
                  <span className="font-headline text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {programme.title}
                  </span>
                  <ArrowRight className="h-5 w-5 text-foreground/60 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-primary" />
                </div>
                <div className="relative mt-1 h-[2px] bg-border overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full bg-primary transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProgrammeLinksGrid;
