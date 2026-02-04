
'use client';

import { motion } from 'framer-motion';
import { Megaphone, ArrowRight } from 'lucide-react';
import { type Notice } from '@/lib/notices-data';
import Link from 'next/link';

export default function PinnedMarquee({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) return null;

  return (
    <div className="bg-primary/5 border-y border-primary/10 overflow-hidden py-3 relative">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 shrink-0 mr-6">
          <Megaphone className="h-3 w-3" />
          Urgent
        </div>
        
        <div className="relative flex-grow overflow-hidden whitespace-nowrap group">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-flex gap-20"
          >
            {notices.map((notice) => (
              <Link 
                key={notice.id} 
                href={`#notice-${notice.id}`}
                className="flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                {notice.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
            {/* Duplicate for infinite effect */}
            {notices.map((notice) => (
              <Link 
                key={`${notice.id}-dup`} 
                href={`#notice-${notice.id}`}
                className="flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                {notice.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
