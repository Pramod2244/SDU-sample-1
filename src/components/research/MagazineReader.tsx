'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { JournalIssue } from '@/lib/research-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MagazineReaderProps {
  issue: JournalIssue;
  onClose: () => void;
}

export default function MagazineReader({ issue, onClose }: MagazineReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const totalPages = issue.pages.length;
  const maxPage = isMobile ? totalPages - 1 : Math.ceil(totalPages / 2) - 1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
      resetControlsTimeout();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', resetControlsTimeout);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', resetControlsTimeout);
    };
  }, [currentPage, maxPage, onClose, resetControlsTimeout]);

  const handleNext = () => {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const PageContent = ({ index }: { index: number }) => {
    const page = issue.pages[index];
    if (!page) return <div className="h-full bg-[#F8F6F1]" />;

    return (
      <div className={cn(
        "h-full p-10 md:p-16 lg:p-20 flex flex-col bg-[#F8F6F1] relative shadow-inner overflow-hidden select-none",
        "before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')] before:opacity-20 before:pointer-events-none"
      )}>
        {/* Spine Shadow */}
        <div className={cn(
          "absolute top-0 bottom-0 w-32 pointer-events-none z-10",
          index % 2 === 0 ? "right-0 bg-gradient-to-l from-black/5 to-transparent" : "left-0 bg-gradient-to-r from-black/5 to-transparent"
        )} />

        {page.type === 'cover' && (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-1 bg-primary" 
            />
            <h1 className="font-headline text-6xl md:text-8xl font-bold text-primary leading-tight">{page.title}</h1>
            <p className="text-xl md:text-2xl uppercase tracking-[0.4em] font-medium opacity-60">{page.content}</p>
            <div className="w-32 h-1 bg-primary" />
          </div>
        )}

        {page.type === 'toc' && (
          <div className="space-y-16">
            <h2 className="font-headline text-5xl font-bold border-b-2 border-primary/10 pb-6">{page.title}</h2>
            <div className="space-y-8 text-2xl leading-relaxed whitespace-pre-line font-medium opacity-80">
              {page.content}
            </div>
          </div>
        )}

        {page.type === 'article' && (
          <div className="space-y-10">
            <h2 className="font-headline text-5xl lg:text-6xl font-bold text-primary leading-tight">{page.title}</h2>
            {page.image && (
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                <Image src={page.image} alt={page.title} fill className="object-cover" />
              </div>
            )}
            {page.pullQuote && (
              <blockquote className="text-3xl italic font-headline text-primary border-l-8 border-primary/20 pl-8 py-6 bg-primary/[0.02]">
                "{page.pullQuote}"
              </blockquote>
            )}
            <p className="text-xl leading-relaxed text-foreground/80 first-letter:text-8xl first-letter:font-headline first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-primary first-letter:leading-[0.8]">
              {page.content}
            </p>
          </div>
        )}

        {page.type === 'innovation' && (
          <div className="space-y-10 bg-primary/[0.03] p-12 rounded-3xl border border-primary/5 h-full">
            <span className="inline-block px-6 py-2 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-full">Innovation Focus</span>
            <h2 className="font-headline text-5xl font-bold">{page.title}</h2>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
            </div>
            <p className="text-xl leading-relaxed opacity-80 font-medium">{page.content}</p>
          </div>
        )}

        {page.type === 'faculty' && (
          <div className="flex-grow flex flex-col items-center justify-center space-y-12">
             <div className="relative w-64 h-64 rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
                {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
             </div>
             <div className="text-center">
                <h2 className="font-headline text-4xl font-bold mb-4">{page.title}</h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-10" />
                <p className="text-2xl italic leading-relaxed max-w-xl mx-auto text-foreground/70 font-medium">
                  {page.content}
                </p>
             </div>
          </div>
        )}

        <div className="mt-auto pt-10 flex justify-between items-center text-sm font-black uppercase tracking-[0.2em] opacity-30">
          <span>{issue.title}</span>
          <span>Page {index + 1}</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src={PlaceHolderImages.find(img => img.id === issue.coverImageId)?.imageUrl || ''} 
          alt="background" 
          fill 
          className="object-cover opacity-20 blur-3xl scale-110" 
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Top Header - Auto Hiding */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none"
          >
            <div className="flex items-center gap-6 pointer-events-auto">
              <Button 
                variant="ghost" 
                onClick={onClose} 
                className="text-white hover:bg-white/10 gap-3 px-6 h-12 rounded-full border border-white/10 backdrop-blur-md"
              >
                <X className="h-5 w-5" /> <span className="font-bold uppercase tracking-widest text-xs">Close Reader</span>
              </Button>
              <div className="hidden md:block text-white/80">
                <h3 className="font-headline text-2xl font-bold">{issue.title}</h3>
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-50">{issue.issueNo} • {issue.year}</p>
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsZoomed(!isZoomed)} 
              className="text-white hover:bg-white/10 h-12 w-12 rounded-full backdrop-blur-md pointer-events-auto"
            >
              {isZoomed ? <Minimize2 /> : <Maximize2 />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magazine Content Area */}
      <div className={cn(
        "relative w-full h-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isZoomed ? "scale-105" : "scale-[0.85]"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.95, rotateY: 15, x: 50 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateY: -15, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative grid h-[90vh] w-full max-w-[1600px] bg-[#F8F6F1] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] overflow-hidden perspective-1000",
              isMobile ? "grid-cols-1 max-w-[550px]" : "grid-cols-2"
            )}
          >
            {/* Center Spine Element */}
            {!isMobile && (
              <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-black/15 z-20 blur-[1px] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" />
            )}
            
            {isMobile ? (
              <PageContent index={currentPage} />
            ) : (
              <>
                <PageContent index={currentPage * 2} />
                <PageContent index={currentPage * 2 + 1} />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Hotspots */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-30 group"
          onClick={handlePrev}
        >
          <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white">
              <ChevronLeft className="h-10 w-10" />
            </div>
          </div>
        </div>
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-30 group"
          onClick={handleNext}
        >
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white">
              <ChevronRight className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar - Auto Hiding */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-lg px-8 text-center z-50"
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">
                <span>Page {isMobile ? currentPage + 1 : currentPage * 2 + 1} / {totalPages}</span>
                <span className="text-white">{Math.round(((isMobile ? currentPage + 1 : (currentPage + 1) * 2) / totalPages) * 100)}% EXPLORED</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ width: `${((isMobile ? currentPage + 1 : (currentPage + 1) * 2) / totalPages) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>
              
              {/* Quick Jump Dot Nav */}
              <div className="flex justify-center gap-3 mt-6">
                {Array.from({ length: maxPage + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={cn(
                      "h-1.5 transition-all duration-500 rounded-full",
                      currentPage === i ? "w-8 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Vignette */}
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_200px_rgba(0,0,0,0.6)]" />
    </motion.div>
  );
}