"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';
import DetailContent from './DetailContent';
import { type Programme } from '@/lib/programmes-data';

type StickySideNavProps = {
  navLinks: { label: string; href: string }[];
  activeId: string;
};

const StickySideNav = ({ navLinks, activeId }: StickySideNavProps) => {
  return (
    <div className="sticky top-28 h-screen">
      <nav className="flex flex-col space-y-1 border-l-2 border-border">
        {navLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            className={cn(
              "relative block pl-6 py-2 text-lg font-medium transition-colors",
              activeId === link.href.substring(1)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            animate={{
              color: activeId === link.href.substring(1) ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
            }}
          >
            {activeId === link.href.substring(1) && (
              <motion.div
                layoutId="activeSectionHighlight"
                className="absolute -left-[2px] top-0 h-full w-[2px] bg-primary"
              />
            )}
            {link.label}
          </motion.a>
        ))}
      </nav>
    </div>
  );
};


type ProgrammeDetailLayoutProps = {
  navLinks: { label: string; href: string }[];
  programme: Programme;
};

const ProgrammeDetailLayout = ({ navLinks, programme }: ProgrammeDetailLayoutProps) => {
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );

    const contentNode = contentRef.current;
    if (contentNode) {
      const sections = contentNode.querySelectorAll('section[id]');
      sections.forEach((section) => {
        observer.observe(section);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [programme]);


  return (
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="hidden lg:block lg:col-span-3">
          <StickySideNav navLinks={navLinks} activeId={activeId} />
        </div>
        <div ref={contentRef} className="lg:col-span-9">
          <DetailContent programme={programme} />
        </div>
      </div>
    </div>
  );
};

export default ProgrammeDetailLayout;
