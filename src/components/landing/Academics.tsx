"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Icon } from "lucide-react";

const programs = {
  undergraduate: [
    { title: "Computer Science", description: "Explore the world of algorithms and data." },
    { title: "Business Administration", description: "Lead and innovate in the corporate world." },
    { title: "Psychology", description: "Understand the human mind and behavior." },
    { title: "Environmental Science", description: "Address planetary challenges with science." },
    { title: "Digital Arts", description: "Create compelling visual experiences." },
    { title: "International Relations", description: "Navigate the complexities of global politics." },
  ],
  graduate: [
    { title: "Master of Data Science", description: "Harness data to drive decisions." },
    { title: "MBA", description: "Accelerate your leadership journey." },
    { title: "Ph.D. in Neuroscience", description: "Advance the frontiers of brain research." },
    { title: "M.A. in Public Policy", description: "Shape effective and equitable policies." },
  ],
  certificates: [
    { title: "Project Management", description: "Master the art of successful project delivery." },
    { title: "Cybersecurity", description: "Protect digital assets and infrastructure." },
    { title: "Digital Marketing", description: "Excel in the modern marketing landscape." },
    { title: "AI &amp; Machine Learning", description: "Build intelligent systems and solutions." },
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
    { value: "certificates", label: "Certificates", icon: Briefcase, data: programs.certificates },
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
            Explore Our Programs
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Find your path among our diverse range of undergraduate, graduate, and professional programs designed for real-world success.
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
