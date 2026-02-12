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
  Search, 
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
            {/* Fallback Image */}
            <Image 
              src={PlaceHolderImages.find(img => img.id === 'research-hero-bg')?.imageUrl || 'https://images.unsplash.com/photo-1579154341569-342c6b3e3aa8?auto=format&fit=crop&q=80&w=1920'} 
              alt="Research Hero" 
              fill 
              className="object-cover"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-background" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-[0.3em] border border-white/10">
                SDUAHER • Innovation Hub
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
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-primary">Ongoing Research</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Explore our diverse portfolio of medical discovery across specialized disciplines.</p>
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

            <div className="grid md:grid-cols-2 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-border/50 shadow-soft-lg hover:shadow-2xl transition-all h-[500px] cursor-pointer"
                  >
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === project.imageId)?.imageUrl || 'https://images.unsplash.com/photo-1579154341569-342c6b3e3aa8?auto=format&fit=crop&q=80&w=1080'} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                      <span className="text-primary-foreground/60 text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                      <h3 className="font-headline text-3xl font-bold mb-4">{project.title}</h3>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-full border-2 border-white/20 overflow-hidden relative">
                           <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80" alt="PI" fill className="object-cover" />
                        </div>
                        <span className="text-sm font-medium opacity-80">PI: {project.pi}</span>
                      </div>
                      <Button variant="secondary" className="rounded-full px-8 gap-2 group/btn">
                        Learn More <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section 5: Labs Gallery (Horizontal Scroll) */}
        <section className="py-20 lg:py-40 bg-accent text-white overflow-hidden">
          <div className="container mx-auto px-4 mb-16 flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="font-headline text-4xl md:text-6xl font-bold">Research Labs</h2>
              <p className="text-white/60 text-lg max-w-xl">World-class infrastructure equipped with high-precision diagnostic and analytical tools.</p>
            </div>
          </div>

          <div className="flex gap-8 overflow-x-auto px-4 pb-12 no-scrollbar snap-x snap-mandatory">
            {[
              { id: 'lab-facility-1', title: 'Molecular Biology', count: '01' },
              { id: 'lab-facility-2', title: 'Genomics Unit', count: '02' },
              { id: 'gallery-lab', title: 'Clinical Simulation', count: '03' },
              { id: 'dept-biochemistry', title: 'Biochemistry', count: '04' }
            ].map((lab, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[600px] aspect-[4/3] relative rounded-[3rem] overflow-hidden snap-center group">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === lab.id)?.imageUrl || 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1080'} 
                  alt={lab.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-8 right-8 text-6xl font-headline font-bold opacity-20">{lab.count}</div>
                <div className="absolute bottom-10 left-10">
                  <h4 className="text-3xl font-headline font-bold mb-2">{lab.title}</h4>
                  <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-widest text-xs">
                    View Lab Details <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Published Journals (Magazine Style) */}
        <section id="journals" className="py-20 lg:py-40 bg-[#fdfaf1]/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Library & Publications</span>
              <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">Academic Journals</h2>
              <p className="text-xl text-foreground/60 leading-relaxed italic">"Documenting the milestones of medical science, one issue at a time."</p>
            </div>

            <div className="grid md:grid-cols-2 gap-20 max-w-6xl mx-auto">
              {journalsData.map((journal) => (
                <motion.div
                  key={journal.id}
                  whileHover={{ y: -20 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedJournal(journal)}
                >
                  <div className="relative aspect-[3/4] rounded-lg shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden bg-white">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === journal.coverImageId)?.imageUrl || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800'} 
                      alt={journal.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="bg-white/90 backdrop-blur-xl text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl">
                          <Maximize2 className="h-5 w-5" /> Open Magazine
                       </div>
                    </div>
                  </div>
                  <div className="mt-10 text-center space-y-2">
                    <h3 className="font-headline text-3xl font-bold text-primary">{journal.title}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">{journal.issueNo} • {journal.year}</p>
                    <p className="text-lg text-foreground/60 max-w-sm mx-auto">{journal.summary}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Funding & Partners */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-center font-bold uppercase tracking-[0.3em] text-foreground/30 text-sm mb-16">Supported By & Collaborating With</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all">
              {[
                'National Medical Commission',
                'ICMR',
                'World Health Organization',
                'Department of Science & Technology',
                'SDU Educational Trust'
              ].map((partner, i) => (
                <div key={i} className="text-xl font-headline font-bold text-primary group-hover:opacity-100 transition-opacity">{partner}</div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}