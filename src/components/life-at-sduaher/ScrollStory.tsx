"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useIsMobile } from "@/hooks/use-mobile";

const storyContent = [
  {
    title: "A Campus That Breathes Energy",
    image: PlaceHolderImages.find((img) => img.id === "scroll-story-1"),
  },
  {
    title: "Students Who Create Impact",
    image: PlaceHolderImages.find((img) => img.id === "scroll-story-2"),
  },
  {
    title: "Moments That Shape You",
    image: PlaceHolderImages.find((img) => img.id === "scroll-story-3"),
  },
];

const StoryImage = ({
  item,
  index,
  scrollYProgress,
}: {
  item: typeof storyContent[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const N = storyContent.length;
  const opacity = useTransform(
    scrollYProgress,
    [(index - 0.8) / N, index / N, (index + 0.8) / N],
    [0, 1, 0]
  );

  return (
    item.image && (
      <motion.div style={{ opacity }} className="absolute inset-0">
        <Image
          src={item.image.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          data-ai-hint={item.image.imageHint}
        />
        <div className="absolute inset-0 bg-black/40 bg-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-grain.png')] opacity-5" />
      </motion.div>
    )
  );
};

const StoryText = ({
  item,
  index,
  scrollYProgress,
}: {
  item: typeof storyContent[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const N = storyContent.length;
  const opacity = useTransform(
    scrollYProgress,
    [(index - 0.5) / N, index / N, (index + 0.5) / N],
    [0, 1, 0]
  );
  const y = useTransform(scrollYProgress, [(index - 0.5) / N, index / N], ["2rem", "0rem"]);

  return (
    <motion.div style={{ opacity, y }} className="absolute max-w-4xl mx-auto px-4 text-center">
      <h2 className="font-headline text-5xl md:text-7xl font-bold">{item.title}</h2>
    </motion.div>
  );
};


const ScrollStory = () => {
  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  if (isMobile) {
    return (
      <section className="bg-black text-white py-20 px-4">
        {storyContent.map((item, index) => (
          <div key={index} className="mb-16 last:mb-0 text-center">
            {item.image && (
              <div className="relative h-80 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={item.image.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  data-ai-hint={item.image.imageHint}
                />
              </div>
            )}
            <h2 className="font-headline text-4xl font-bold mb-4">{item.title}</h2>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {storyContent.map((item, index) => (
          <StoryImage
            key={`image-${index}`}
            item={item}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="relative z-10 text-white w-full h-full flex items-center justify-center">
          {storyContent.map((item, index) => (
            <StoryText
              key={`text-${index}`}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollStory;
