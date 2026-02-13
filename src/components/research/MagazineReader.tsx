
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
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const totalPages = issue.pages.length;
  // Total spreads
  const maxSpreadIndex = isMobile ? totalPages - 1 : Math.ceil(totalPages / 2) - 1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Lock scroll and remove scrollbar
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
  }, [currentPage, maxSpreadIndex, onClose, resetControlsTimeout]);

  const handleNext = () => {
    if (currentPage < maxSpreadIndex) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const PageContent = ({ index, side }: { index: number; side?: 'left' | 'right' }) => {
    const page = issue.pages[index];
    if (!page) return <div className="h-full bg-[#F7F5EF]" />;

    return (
      <div className={cn(
        "h-full p-8 md:p-12 lg:p-16 flex flex-col bg-[#F7F5EF] relative shadow-inner overflow-hidden select-none transition-all",
        side === 'left' ? "rounded-l-sm" : "rounded-r-sm"
      )}>
        {/* Spine Shadow */}
        <div className={cn(
          "absolute top-0 bottom-0 w-24 pointer-events-none z-10",
          side === 'left' ? "right-0 bg-gradient-to-l from-black/[0.03] to-transparent" : "left-0 bg-gradient-to-r from-black/[0.03] to-transparent"
        )} />

        {page.type === 'cover' && (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-20 h-0.5 bg-primary opacity-30" />
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary leading-tight">{page.title}</h1>
            <p className="text-sm md:text-base uppercase tracking-[0.4em] font-medium opacity-50">{page.content}</p>
            <div className="w-20 h-0.5 bg-primary opacity-30" />
          </div>
        )}

        {page.type === 'toc' && (
          <div className="space-y-12">
            <h2 className="font-headline text-4xl font-bold border-b border-primary/10 pb-4">Inside This Issue</h2>
            <div className="space-y-6 text-xl leading-relaxed whitespace-pre-line font-medium opacity-70">
              {page.content}
            </div>
          </div>
        )}

        {page.type === 'article' && (
          <div className="space-y-8">
            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary leading-tight">{page.title}</h2>
            {page.image && (
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                <Image src={page.image} alt={page.title} fill className="object-cover" />
              </div>
            )}
            {page.pullQuote && (
              <blockquote className="text-2xl italic font-headline text-primary border-l-4 border-primary/20 pl-6 py-2 bg-primary/[0.01] my-4">
                "{page.pullQuote}"
              </blockquote>
            )}
            <p className="text-lg leading-relaxed text-foreground/80 first-letter:text-7xl first-letter:font-headline first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary first-letter:leading-[0.8]">
              {page.content}
            </p>
          </div>
        )}

        {page.type === 'innovation' && (
          <div className="space-y-8 bg-primary/[0.02] p-8 rounded-lg border border-primary/5 h-full">
            <span className="inline-block px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">Innovation</span>
            <h2 className="font-headline text-4xl font-bold">{page.title}</h2>
            <div className="relative aspect-square rounded-sm overflow-hidden shadow-md max-h-[300px]">
              {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
            </div>
            <p className="text-lg leading-relaxed opacity-70 font-medium">{page.content}</p>
          </div>
        )}

        {page.type === 'faculty' && (
          <div className="flex-grow flex flex-col items-center justify-center space-y-10">
             <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-xl">
                {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
             </div>
             <div className="text-center">
                <h2 className="font-headline text-3xl font-bold mb-3">{page.title}</h2>
                <div className="w-12 h-0.5 bg-primary mx-auto mb-8 opacity-20" />
                <p className="text-xl italic leading-relaxed max-w-md mx-auto text-foreground/60 font-medium">
                  {page.content}
                </p>
             </div>
          </div>
        )}

        <div className="mt-auto pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
          <span>{issue.title}</span>
          <span>{index + 1}</span>
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
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 z-0 bg-[#F7F5EF]/10 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Close Button */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 right-8 z-50"
          >
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="text-white hover:bg-white/10 h-12 w-12 rounded-full backdrop-blur-md"
            >
              <X className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Frame */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative grid h-full w-full max-w-[1400px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] rounded-sm perspective-1000",
              isMobile ? "grid-cols-1 max-w-[500px]" : "grid-cols-2"
            )}
          >
            {/* Center Spine */}
            {!isMobile && (
              <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-black/[0.08] z-20" />
            )}
            
            {isMobile ? (
              <PageContent index={currentPage} />
            ) : (
              <>
                <PageContent index={currentPage * 2} side="left" />
                <PageContent index={currentPage * 2 + 1} side="right" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Hotspots for flipping */}
        <div className="absolute inset-0 flex z-30 pointer-events-none">
          <div className="w-1/2 h-full pointer-events-auto cursor-w-resize group" onClick={handlePrev}>
            <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-16 w-16 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white">
                <ChevronLeft className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full pointer-events-auto cursor-e-resize group" onClick={handleNext}>
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-16 w-16 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white">
                <ChevronRight className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Control Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-6"
          >
            <div className="bg-black/40 backdrop-blur-2xl rounded-full px-8 py-4 border border-white/10 shadow-2xl text-center">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                <span>Spread {currentPage + 1} / {maxSpreadIndex + 1}</span>
                <span className="text-white/80">{issue.year} Review</span>
              </div>
              <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ width: `${((currentPage + 1) / (maxSpreadIndex + 1)) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
