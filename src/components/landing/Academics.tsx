"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const programData = {
  undergraduate: [
    { title: 'MBBS', description: 'Comprehensive training for future medical leaders.', duration: '5.5 Years' },
    { title: 'B.Sc. Allied Health Sciences', description: 'Specialized courses in modern medical technologies.', duration: '4 Years' },
    { title: 'B.Sc. Nursing', description: 'Developing compassionate and skilled nursing professionals.', duration: '4 Years' },
  ],
  postgraduate: [
    { title: 'MD/MS Programmes', description: 'Advanced clinical and research training in 21 specialities.', duration: '3 Years' },
    { title: 'M.Sc. Medical Sciences', description: 'In-depth study in Anatomy, Physiology, and Biochemistry.', duration: '2 Years' },
    { title: 'Master of Public Health (MPH)', description: 'Training public health leaders for global challenges.', duration: '2 Years' },
  ],
  doctoral: [
    { title: 'Ph.D. Programmes', description: 'Cutting-edge research across various medical and health disciplines.', duration: '3-5 Years' },
    { title: 'Post-Doctoral Fellowships', description: 'Advanced research opportunities for Ph.D. holders.', duration: '2 Years' },
  ],
  diploma: [
    { title: 'Diploma in Anesthesia', description: 'Specialized training for anesthesia technicians.', duration: '2 Years' },
    { title: 'Diploma in Medical Lab Technology', description: 'Hands-on training in modern laboratory techniques.', duration: '2 Years' },
  ],
};

const categories: (keyof typeof programData)[] = ['undergraduate', 'postgraduate', 'doctoral', 'diploma'];

const categoryLabels = {
  undergraduate: 'Undergraduate',
  postgraduate: 'Postgraduate',
  doctoral: 'Doctoral',
  diploma: 'Diploma / Certificate'
}

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
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Academics = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof programData>('undergraduate');

  return (
    <section id="academics" className="py-20 lg:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Programmes Offered
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-2xl">
            Explore future-ready education at SDUAHER.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={cn(
                "rounded-full px-5 py-2 text-sm md:text-base transition-all duration-300",
                 activeCategory === category
                   ? "bg-primary text-primary-foreground shadow-lg"
                   : "bg-transparent border-border hover:bg-accent hover:border-accent"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>

        <motion.div
          key={activeCategory} // This key is crucial for re-triggering animations on category change
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {programData[activeCategory].map((program, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/80 shadow-soft-sm transition-all duration-300 hover:shadow-soft-lg hover:border-primary/50"
            >
              <div className="p-6 lg:p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-primary transition-colors duration-300">
                      {program.title}
                    </h3>
                    <span className="text-xs font-semibold bg-secondary text-secondary-foreground rounded-full px-3 py-1 whitespace-nowrap">
                      {program.duration}
                    </span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {program.description}
                  </p>
                </div>
                <Button variant="link" className="p-0 self-start font-semibold text-primary/80 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Academics;
