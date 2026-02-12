
'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalPages = issue.pages.length;
  const maxPage = isMobile ? totalPages - 1 : Math.ceil(totalPages / 2) - 1;

  const handleNext = () => {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const PageContent = ({ index }: { index: number }) => {
    const page = issue.pages[index];
    if (!page) return <div className="h-full bg-[#fdfaf1]/50" />;

    return (
      <div className={cn(
        "h-full p-8 md:p-12 lg:p-16 flex flex-col bg-[#fdfaf1] relative shadow-inner overflow-y-auto",
        "before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')] before:opacity-30 before:pointer-events-none"
      )}>
        {page.type === 'cover' && (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-24 h-1 bg-primary" />
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">{page.title}</h1>
            <p className="text-xl md:text-2xl uppercase tracking-[0.3em] font-medium opacity-60">{page.content}</p>
            <div className="w-24 h-1 bg-primary" />
          </div>
        )}

        {page.type === 'toc' && (
          <div className="space-y-12">
            <h2 className="font-headline text-4xl font-bold border-b-2 border-primary/20 pb-4">{page.title}</h2>
            <div className="space-y-6 text-xl leading-relaxed whitespace-pre-line">
              {page.content}
            </div>
          </div>
        )}

        {page.type === 'article' && (
          <div className="space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight">{page.title}</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
            </div>
            {page.pullQuote && (
              <blockquote className="text-2xl italic font-headline text-primary border-l-4 border-primary pl-6 py-4 bg-primary/5">
                "{page.pullQuote}"
              </blockquote>
            )}
            <p className="text-lg leading-relaxed text-foreground/80 first-letter:text-6xl first-letter:font-headline first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
              {page.content}
            </p>
          </div>
        )}

        {page.type === 'innovation' && (
          <div className="space-y-8 bg-primary/5 p-8 rounded-2xl border border-primary/10">
            <span className="inline-block px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">Innovation</span>
            <h2 className="font-headline text-4xl font-bold">{page.title}</h2>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
            </div>
            <p className="text-lg leading-relaxed opacity-80">{page.content}</p>
          </div>
        )}

        {page.type === 'faculty' && (
          <div className="flex-grow flex flex-col items-center justify-center space-y-8">
             <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-xl">
                {page.image && <Image src={page.image} alt={page.title} fill className="object-cover" />}
             </div>
             <div className="text-center">
                <h2 className="font-headline text-3xl font-bold mb-2">{page.title}</h2>
                <div className="w-12 h-1 bg-primary mx-auto mb-6" />
                <p className="text-lg italic leading-relaxed max-w-md mx-auto text-foreground/70">
                  {page.content}
                </p>
             </div>
          </div>
        )}

        <div className="mt-auto pt-8 flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-40">
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
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Controls Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-4 text-white">
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10 gap-2">
            <X className="h-5 w-5" /> Close Reader
          </Button>
          <div className="h-6 w-[1px] bg-white/20 hidden md:block" />
          <div className="hidden md:block">
            <h3 className="font-bold text-lg">{issue.title}</h3>
            <p className="text-xs opacity-60 uppercase tracking-widest">{issue.issueNo} • {issue.year}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsZoomed(!isZoomed)} 
            className="text-white hover:bg-white/10"
          >
            {isZoomed ? <Minimize2 /> : <Maximize2 />}
          </Button>
        </div>
      </div>

      {/* Magazine Container */}
      <div className={cn(
        "relative w-full h-full flex items-center justify-center transition-all duration-500",
        isZoomed ? "scale-110" : "scale-90"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: -45 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative grid h-[85vh] w-full max-w-[1400px] bg-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden",
              isMobile ? "grid-cols-1 max-w-[500px]" : "grid-cols-2"
            )}
          >
            {/* Center Spine */}
            {!isMobile && <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-black/10 z-10 blur-[1px]" />}
            
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

        {/* Floating Navigation Arrows */}
        <div className="absolute left-10 hidden lg:block">
          <Button 
            disabled={currentPage === 0}
            onClick={handlePrev}
            size="icon" 
            variant="ghost" 
            className="h-16 w-16 rounded-full text-white bg-white/10 hover:bg-white/20 disabled:opacity-20"
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>
        </div>
        <div className="absolute right-10 hidden lg:block">
          <Button 
            disabled={currentPage === maxPage}
            onClick={handleNext}
            size="icon" 
            variant="ghost" 
            className="h-16 w-16 rounded-full text-white bg-white/10 hover:bg-white/20 disabled:opacity-20"
          >
            <ChevronRight className="h-10 w-10" />
          </Button>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-6 text-center text-white/60">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
          <span>Page {isMobile ? currentPage + 1 : currentPage * 2 + 1} of {totalPages}</span>
          <span className="text-white">{Math.round(((isMobile ? currentPage + 1 : (currentPage + 1) * 2) / totalPages) * 100)}% Read</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            animate={{ width: `${((isMobile ? currentPage + 1 : (currentPage + 1) * 2) / totalPages) * 100}%` }}
          />
        </div>
        
        {/* Mobile Nav */}
        <div className="flex lg:hidden justify-center gap-12 mt-8">
          <Button disabled={currentPage === 0} onClick={handlePrev} variant="ghost" className="text-white">
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button disabled={currentPage === maxPage} onClick={handleNext} variant="ghost" className="text-white">
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
