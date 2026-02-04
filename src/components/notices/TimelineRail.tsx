'use client';

import { format, isToday, isFuture, isPast } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimelineRailProps {
  dates: Date[];
  selectedDate: string | null;
  onDateClick: (date: string | null) => void;
}

export default function TimelineRail({ dates, selectedDate, onDateClick }: TimelineRailProps) {
  const sortedDates = [...dates].sort((a, b) => b.getTime() - a.getTime());
  
  // Get unique day-month pairs
  const uniqueDates = Array.from(new Set(sortedDates.map(d => format(d, 'yyyy-MM-dd'))))
    .slice(0, 10); // Show top 10 relevant dates

  return (
    <div className="sticky top-[220px] space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-2xl font-bold text-primary">Timeline</h3>
        <button 
          onClick={() => onDateClick(null)}
          className="text-xs font-bold uppercase tracking-wider text-foreground/40 hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="relative pl-8 border-l-2 border-primary/10 space-y-10">
        {uniqueDates.map((dateStr) => {
          const date = new Date(dateStr);
          const active = selectedDate === dateStr;
          const today = isToday(date);
          const future = isFuture(date);
          const past = isPast(date) && !today;

          return (
            <div 
              key={dateStr}
              className="relative cursor-pointer group"
              onClick={() => onDateClick(dateStr)}
            >
              {/* Dot */}
              <div className={cn(
                "absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-background transition-all duration-300 z-10",
                active ? "bg-primary scale-125 shadow-[0_0_15px_rgba(var(--primary),0.5)]" : "bg-primary/20",
                today && "bg-primary"
              )}>
                {today && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary rounded-full"
                  />
                )}
              </div>

              <div className={cn(
                "transition-all duration-300",
                active ? "translate-x-2" : "group-hover:translate-x-1",
                past ? "opacity-40" : "opacity-100",
                active ? "text-primary font-bold" : "text-foreground/60"
              )}>
                <div className="text-sm font-bold uppercase tracking-widest leading-none">
                  {format(date, 'MMM')}
                </div>
                <div className="text-2xl font-headline">
                  {format(date, 'dd')}
                </div>
                {today && <div className="text-[10px] font-black uppercase text-primary mt-1">Today</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
