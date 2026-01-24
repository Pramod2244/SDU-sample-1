"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const featuredNews = {
  category: "Research",
  title: "SDUAHER AI Lab Develops Breakthrough Diagnostic Tool",
  preview: "Our new AI-powered imaging analysis tool promises to detect diseases earlier and more accurately than ever before.",
  image: PlaceHolderImages.find((img) => img.id === "news-featured-reimagined"),
  href: "#",
};

const upcomingEvents = [
  {
    date: "JUL 15",
    title: "Global Health Symposium 2024",
    location: "Virtual & On-Campus",
    href: "#",
  },
  {
    date: "AUG 01",
    title: "InnovateMed Hackathon",
    location: "Innovation Hub",
    href: "#",
  },
  {
    date: "SEP 05",
    title: "Annual University Convocation",
    location: "University Auditorium",
    href: "#",
  },
];

const NewsEvents = () => {
  const leftColVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const rightColContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.2 } },
  };
  
  const rightColItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="news" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="flex items-center gap-3 font-headline text-4xl md:text-5xl font-bold text-primary">
            News & Events
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-2xl">
            Stay informed with the latest updates and happenings from SDUAHER.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Featured News */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={leftColVariants}
          >
            <Link href={featuredNews.href} className="group block overflow-hidden rounded-2xl bg-background border border-border shadow-soft-sm hover:shadow-soft-lg transition-all duration-300">
              {featuredNews.image && (
                <div className="relative aspect-video">
                  <Image
                    src={featuredNews.image.imageUrl}
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={featuredNews.image.imageHint}
                  />
                </div>
              )}
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">{featuredNews.category}</Badge>
                <h3 className="font-headline text-2xl lg:text-3xl font-bold text-foreground mb-3 leading-tight">
                  {featuredNews.title}
                </h3>
                <p className="text-base text-foreground/70 mb-5">
                  {featuredNews.preview}
                </p>
                <div className="font-semibold text-primary inline-flex items-center group-hover:underline">
                  Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={rightColContainerVariants}
          >
            {upcomingEvents.map((event, index) => (
              <motion.div key={index} variants={rightColItemVariants}>
                <Link href={event.href} className="group flex items-start gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-background">
                  <div className="flex flex-col items-center justify-center text-center font-bold">
                    <span className="text-sm text-primary">{event.date.substring(0, 3)}</span>
                    <span className="text-3xl font-headline text-foreground">{event.date.substring(4)}</span>
                  </div>
                  <div className="relative flex-1 border-l border-border pl-4">
                     {/* Animated border on hover */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 h-0 w-[2px] bg-primary transition-all duration-300 group-hover:h-1/2" />
                    
                    <h4 className="font-semibold text-lg leading-snug text-foreground mb-1 group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-foreground/60 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {event.location}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
             <motion.div variants={rightColItemVariants} className="pt-2">
                <Button variant="outline" className="w-full">
                    View All Events <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
