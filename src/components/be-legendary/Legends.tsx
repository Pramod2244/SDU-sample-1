"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const legends = [
  {
    name: 'Dr. Ananya Sharma',
    title: 'Pioneering Cardiologist, Class of ‘98',
    summary: 'Revolutionized non-invasive cardiac imaging techniques, saving thousands of lives worldwide.',
    story: 'Dr. Ananya Sharma’s journey from a small town to becoming a world-renowned cardiologist is a testament to her unwavering dedication. After graduating from SDUAHER, she pursued advanced research in cardiac imaging. Her groundbreaking work on 4D ultrasound technology has made early detection of heart disease more accessible and accurate, particularly in underserved communities. Today, she leads the cardiology department at a leading global research hospital and mentors the next generation of medical innovators, many of whom are also SDUAHER alumni.',
    image: PlaceHolderImages.find(img => img.id === 'legend-1'),
  },
  {
    name: 'Dr. Ben Carter',
    title: 'Leading Neurosurgeon & Researcher, Class of ‘05',
    summary: 'Developed a breakthrough surgical procedure for treating complex brain tumors.',
    story: 'Dr. Ben Carter is a name synonymous with excellence in neurosurgery. His time at SDUAHER instilled in him a passion for tackling the most challenging medical problems. He is globally recognized for developing the "Carter Method," a minimally invasive technique for removing deep-seated brain tumors, which has significantly reduced recovery times and improved patient outcomes. Dr. Carter frequently returns to SDUAHER as a guest lecturer, inspiring students to push the boundaries of what is possible in medicine.',
    image: PlaceHolderImages.find(img => img.id === 'legend-2'),
  },
  {
    name: 'Dr. Chloe Martinez',
    title: 'Global Health Advocate, Class of ‘12',
    summary: 'Established a network of mobile clinics providing essential healthcare in remote regions of Africa.',
    story: 'Dr. Chloe Martinez embodies the spirit of service that SDUAHER champions. After witnessing healthcare disparities during a student exchange program, she dedicated her career to global public health. She founded "HealthReach," a non-profit organization that operates a fleet of mobile clinics delivering primary care, vaccinations, and health education to communities with no other access to medical services. Her work has impacted over a million people and has earned her international accolades, including the prestigious Global Humanitarian Award.',
    image: PlaceHolderImages.find(img => img.id === 'legend-3'),
  },
  {
    name: 'Dr. David Chen',
    title: 'Oncology Innovator, Class of ‘02',
    summary: 'Pioneered a new targeted gene therapy for rare forms of cancer.',
    story: 'Dr. David Chen has dedicated his career to fighting cancer. At SDUAHER, he was known for his insatiable curiosity and brilliant mind. His postdoctoral research led to the development of a revolutionary gene therapy that targets specific cancer cells, leaving healthy cells unharmed. This breakthrough has offered hope to patients with previously untreatable cancers and has established Dr. Chen as a leader in the field of oncology.',
    image: PlaceHolderImages.find(img => img.id === 'legend-1'),
  },
  {
    name: 'Dr. Emily White',
    title: 'Pediatric Specialist, Class of ‘15',
    summary: 'Champion for children\'s mental health and early developmental screening.',
    story: 'Dr. Emily White has transformed pediatric care in her community. Recognizing the critical need for early mental health intervention, she established a comprehensive screening program within her practice. Her holistic approach, which integrates mental and physical health, has become a model for pediatricians nationwide. Dr. White credits her time at SDUAHER for teaching her the importance of compassionate, patient-centered care.',
    image: PlaceHolderImages.find(img => img.id === 'legend-3'),
  },
];

const Legends = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3 }
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };
  
  return (
    <section className="bg-background py-20 lg:py-32">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12 lg:mb-20">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">
            Our Legends
          </h2>
          <p className="mt-6 text-xl text-foreground/70 max-w-3xl mx-auto">
            Meet the trailblazers and innovators who started their journey at SDUAHER and went on to change the world.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative px-8"
          variants={itemVariants}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-8">
              {legends.map((legend, index) => (
                <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="bg-card border-border h-full flex flex-col group cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-2">
                          <CardHeader>
                            {legend.image && (
                              <div className="relative h-80 rounded-t-lg overflow-hidden mb-4">
                                <Image
                                  src={legend.image.imageUrl}
                                  alt={legend.name}
                                  fill
                                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                  data-ai-hint={legend.image.imageHint}
                                />
                              </div>
                            )}
                            <CardTitle className="font-headline text-3xl text-primary">{legend.name}</CardTitle>
                            <p className="text-base text-foreground/60">{legend.title}</p>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-foreground/80">{legend.summary}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="text-lg text-primary font-semibold inline-flex items-center">
                              Read Their Story <ArrowUpRight className="ml-2 h-5 w-5" />
                            </div>
                          </CardFooter>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border text-foreground max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="font-headline text-4xl text-primary mb-2">{legend.name}</DialogTitle>
                          <DialogDescription className="text-foreground/60 text-lg">
                            {legend.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 text-foreground/80 leading-relaxed text-base max-h-[60vh] overflow-y-auto pr-4">
                          {legend.story}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Legends;
