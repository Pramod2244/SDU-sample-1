"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const NewsEvents = () => {
  const featuredNewsImage = PlaceHolderImages.find((img) => img.id === "news-featured");
  const event1Image = PlaceHolderImages.find((img) => img.id === "news-event1");
  const event2Image = PlaceHolderImages.find((img) => img.id === "news-event2");

  const events = [
    {
      date: "JUN 05",
      title: "World Environment Day",
      description: "Join us for a tree plantation drive on campus.",
      image: event1Image
    },
    {
      date: "JUN 21",
      title: "International Yoga Day",
      description: "A session on yoga and wellness for students and faculty.",
      image: event2Image
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="news"
      className="py-20 lg:py-32 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            News &amp; Events
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Stay up-to-date with the latest happenings and exciting events at SDUAHER.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div variants={itemVariants}>
            <h3 className="font-headline text-3xl font-semibold mb-6">Featured News</h3>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              {featuredNewsImage && (
                <div className="relative h-80 w-full">
                  <Image
                    src={featuredNewsImage.imageUrl}
                    alt={featuredNewsImage.description}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={featuredNewsImage.imageHint}
                  />
                </div>
              )}
              <CardContent className="p-6">
                <Badge variant="default" className="mb-2 bg-primary">Rankings</Badge>
                <h4 className="font-headline text-2xl font-bold mb-2">SDUAHER Ranked 97th in NIRF 2023 University Rankings</h4>
                <p className="text-foreground/80">
                  SDUAHER has secured the 97th rank among universities in India in the National Institutional Ranking Framework (NIRF) 2023, a testament to our academic excellence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-headline text-3xl font-semibold mb-6">Upcoming Events</h3>
            {events.map((event, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="flex items-center gap-4 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground p-4 rounded-md w-24 text-center">
                    <Calendar className="h-6 w-6 mb-1"/>
                    <span className="font-bold text-lg">{event.date}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline text-xl font-semibold">{event.title}</h4>
                    <p className="text-sm text-foreground/70">{event.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsEvents;
