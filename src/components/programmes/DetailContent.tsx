"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { type Programme } from '@/lib/programmes-data';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const FeatureBlock = ({ feature, index }: { feature: any, index: number }) => {
  const image = PlaceHolderImages.find(img => img.id === feature.imageId);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-12 items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl ${isReversed ? 'md:order-2' : ''}`}>
        {image && (
          <Image
            src={image.imageUrl}
            alt={feature.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
      <div className={`${isReversed ? 'md:order-1' : ''}`}>
        <h3 className="font-headline text-3xl font-bold text-primary mb-4">{feature.title}</h3>
        <p className="text-lg text-foreground/80 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};


const DetailContent = ({ programme }: { programme: Programme }) => {
  return (
    <div className="py-20 lg:py-32 bg-background">
      {programme.sections.map((section, sectionIndex) => (
        <motion.section
          key={section.id}
          id={section.id}
          className="container mx-auto px-4 mb-24 last:mb-0 scroll-mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl">
            <h2 className="font-headline text-4xl font-bold text-primary mb-8">{section.title}</h2>
            <div className="prose prose-lg lg:prose-xl max-w-none text-foreground/80 prose-headings:text-primary prose-headings:font-headline">
              {section.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>

             {section.id === 'courses-offered' && programme.courses && (
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {programme.courses.map(course => (
                  <Card key={course.name} className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-2xl">{course.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{course.duration}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {section.id === 'career-opportunities' && programme.careerOutcomes && (
              <ul className="mt-8 space-y-4">
                {programme.careerOutcomes.map(outcome => (
                  <li key={outcome} className="flex items-center gap-3 text-lg">
                    <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
           {section.id === 'student-life' && programme.features && (
              <div className="mt-20 space-y-20">
                {programme.features.map((feature, index) => (
                  <FeatureBlock key={feature.title} feature={feature} index={index} />
                ))}
              </div>
            )}
        </motion.section>
      ))}
    </div>
  );
};

export default DetailContent;
