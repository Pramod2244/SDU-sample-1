"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { type ImagePlaceholder } from '@/lib/placeholder-images';

type FeatureSplitSectionProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  image?: ImagePlaceholder;
  imageSide: 'left' | 'right';
};

const FeatureSplitSection = ({ leftContent, rightContent, image, imageSide }: FeatureSplitSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = (from: 'left' | 'right') => ({
    hidden: { opacity: 0, x: from === 'left' ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  });

  const Left = (
    <motion.div variants={itemVariants('left')}>
      {leftContent}
    </motion.div>
  );

  const Right = (
    <motion.div variants={itemVariants('right')}>
      {rightContent}
    </motion.div>
  );

  return (
    <motion.section
      className="py-20 lg:py-32 bg-card overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {imageSide === 'left' ? (
            <>
              {image && (
                <motion.div variants={itemVariants('left')} className="relative h-[30rem] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                </motion.div>
              )}
              {Right}
            </>
          ) : (
            <>
              {Left}
              {image ? (
                 <motion.div variants={itemVariants('right')} className="relative h-[30rem] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </motion.div>
              ) : Right }
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default FeatureSplitSection;
