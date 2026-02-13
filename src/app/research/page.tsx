
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  projectsData, 
  researchCategories, 
  journalsData, 
  type ResearchCategory,
  type JournalIssue
} from '@/lib/research-data';
import MagazineReader from '@/components/research/MagazineReader';
import { 
  ArrowDown, 
  Beaker, 
  BookOpen, 
  Globe, 
  Trophy, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

const ImpactCounter = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const targetValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = targetValue / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= targetValue) {
            setCount(targetValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetValue]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-8 bg-white shadow-soft-lg rounded-3xl border border-primary/5 group hover:border-primary/20 transition-all"
    >
      <div className="h-16 w-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        <Icon className="h-8 w-8" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{count}{value.includes('+') ? '+' : ''}</div>
      <div className="text-sm font-bold uppercase tracking-widest text-foreground/40 text-center">{label}</div>
    </motion.div>
  );
};

export default function ResearchCenterPage() {
  const [activeCategory, setActiveCategory] = useState<ResearchCategory | 'All'>('All');
  const [selectedJournal, setSelectedJournal] = useState<JournalIssue | null>(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const filteredProjects = projectsData.filter(p => activeCategory === 'All' || p.category === activeCategory);

  const heroImage = PlaceHolderImages.find(img => img.id === 'research-hero-bg');

  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-white">
      <Header transparent={true} />
      
      <AnimatePresence>
        {selectedJournal && (
          <MagazineReader 
            issue={selectedJournal} 
            onClose={() => setSelectedJournal(null)} 
          />
        )}
      </AnimatePresence>

      <main>
        {/* Section 1: Cinematic Hero */}
        <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description} 
                fill 
                className="object-cover opacity-70"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-[0.3em] border border-white/10">
                Innovation Hub
              </span>
              <h1 className="font-headline text-6xl md:text-9xl font-bold text-white leading-tight">
                Research & <br />Innovation
              </h1>
              <p className="text-xl md:text-3xl text-white/80 font-medium max-w-3xl mx-auto">
                Advancing Medicine Through Discovery, <br className="hidden md:block" /> Data & Dedication
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown className="h-8 w-8" />
            </motion.div>
          </div>
        </section>

        {/* Section 2: Impact Counters */}
        <section className="py-20 -mt-20 relative z-20 container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <ImpactCounter value="120+" label="Research Projects" icon={Beaker} />
            <ImpactCounter value="850+" label="Published Papers" icon={BookOpen} />
            <ImpactCounter value="25+" label="Funded Collaborations" icon={Globe} />
            <ImpactCounter value="12+" label="Innovation Awards" icon={Trophy} />
          </div>
        </section>

        {/* Section 3 & 4: Research Explorer */}
        <section id="projects" className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-primary">Ongoing Discovery</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Explore our diverse portfolio of medical research across specialized disciplines.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <Button 
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('All')}
                className="rounded-full px-8"
              >
                All Projects
              </Button>
              {researchCategories.map(cat => (
                <Button 
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-8"
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => {
                  const projectImage = PlaceHolderImages.find(img => img.id === project.imageId);
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl bg-white border border-border/50 shadow-soft-lg hover:shadow-2xl transition-all h-[400px] cursor-pointer"
                    >
                      {projectImage && (
                        <Image 
                          src={projectImage.imageUrl} 
                          alt={project.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          data-ai-hint={projectImage.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <span className="text-primary-foreground/60 text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                        <h3 className="font-headline text-2xl font-bold mb-4 leading-tight">{project.title}</h3>
                        <div className="flex items-center gap-2 mb-4 opacity-80">
                          <span className="text-xs font-medium">PI: {project.pi}</span>
                        </div>
                        <Button variant="secondary" size="sm" className="rounded-full px-6 gap-2 group/btn">
                          View Details <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section 8: Published Journals */}
        <section id="journals" className="py-20 lg:py-40 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Library & Publications</span>
              <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">Academic Journals</h2>
              <p className="text-xl text-foreground/60 leading-relaxed italic">"Documenting the milestones of medical science, one issue at a time."</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              {journalsData.map((journal) => {
                const coverImage = PlaceHolderImages.find(img => img.id === journal.coverImageId);
                return (
                  <motion.div
                    key={journal.id}
                    whileHover={{ y: -15 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedJournal(journal)}
                  >
                    <div className="relative aspect-[3/4] rounded-sm shadow-2xl transition-all duration-500 overflow-hidden bg-white">
                      {coverImage && (
                        <Image 
                          src={coverImage.imageUrl} 
                          alt={journal.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          data-ai-hint={coverImage.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-white/90 backdrop-blur-xl text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl">
                            <Maximize2 className="h-5 w-5" /> Open Magazine
                         </div>
                      </div>
                    </div>
                    <div className="mt-8 text-center space-y-2">
                      <h3 className="font-headline text-3xl font-bold text-primary">{journal.title}</h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">{journal.issueNo}</p>
                      <p className="text-base text-foreground/60 max-w-sm mx-auto">{journal.summary}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
