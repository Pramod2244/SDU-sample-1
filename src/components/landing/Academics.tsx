"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Microscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Icon } from "lucide-react";

const programs = {
  undergraduate: [
    { title: "MBBS", description: "Bachelor of Medicine, Bachelor of Surgery program." },
    { title: "B.Sc. Allied Health Sciences", description: "Courses in Medical Lab, Imaging Tech & more." },
  ],
  graduate: [
    { title: "MD/MS Programmes", description: "Postgraduate degrees in 21 specialities." },
    { title: "M.Sc. Medical Sciences", description: "Master's in Anatomy, Physiology, etc." },
    { title: "MPH", description: "Master of Public Health program." },
  ],
  research: [
    { title: "Ph.D. Programmes", description: "Doctoral research in various medical fields." },
    { title: "Fellowship Programmes", description: "Specialized training in clinical areas." },
    { title: "Post-Doctoral Fellowship", description: "Advanced research opportunities." },
  ],
};

const ProgramCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

interface TabInfo {
  value: keyof typeof programs;
  label: string;
  icon: Icon;
  data: { title: string; description: string }[];
}

const Academics = () => {
  const tabs: TabInfo[] = [
    { value: "undergraduate", label: "Undergraduate", icon: BookOpen, data: programs.undergraduate },
    { value: "graduate", label: "Graduate", icon: GraduationCap, data: programs.graduate },
    { value: "research", label: "PhD & Fellowships", icon: Microscope, data: programs.research },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="academics" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Programmes Offered
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            From undergraduate to doctoral levels, our programmes are designed to create the next generation of healthcare leaders.
          </p>
        </motion.div>

        <Tabs defaultValue="undergraduate" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-auto mb-10">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="py-3 text-base flex items-center gap-2">
                <tab.icon className="h-5 w-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {tab.data.map((program) => (
                  <ProgramCard key={program.title} {...program} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Academics;
