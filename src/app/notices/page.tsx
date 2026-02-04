'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { noticesData, type NoticeCategory, type NoticePriority } from '@/lib/notices-data';
import NoticeCard from '@/components/notices/NoticeCard';
import TimelineRail from '@/components/notices/TimelineRail';
import PinnedMarquee from '@/components/notices/PinnedMarquee';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 5;

export default function NoticeBoardPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<NoticeCategory | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Important'>('All');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pinnedNotices = useMemo(() => noticesData.filter(n => n.isPinned), []);

  const filteredNotices = useMemo(() => {
    return noticesData.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) || 
                           notice.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || notice.category === category;
      const matchesPriority = priorityFilter === 'All' || notice.priority !== 'Normal';
      const matchesDate = !selectedDate || format(new Date(notice.publishDate), 'yyyy-MM-dd') === selectedDate;
      
      return matchesSearch && matchesCategory && matchesPriority && matchesDate;
    }).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [search, category, priorityFilter, selectedDate]);

  const paginatedNotices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNotices, currentPage]);

  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);

  const allNoticeDates = useMemo(() => {
    return noticesData.map(n => new Date(n.publishDate));
  }, []);

  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-white">
      <Header />
      
      <main className="pt-24">
        {/* Urgent Header */}
        <PinnedMarquee notices={pinnedNotices} />

        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-6"
              >
                <Filter className="h-3 w-3" />
                University Updates
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-headline text-5xl md:text-7xl font-bold text-primary mb-6"
              >
                Notice Board & <br />Announcements
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-foreground/60 leading-relaxed"
              >
                Official updates, important dates, circulars, and downloadable documents for students, faculty, and stakeholders.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Filtering Bar - Adjusted top to 120px to sit below Header */}
        <section className="sticky top-[120px] z-30 bg-white/80 backdrop-blur-xl border-y border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4 flex-grow max-w-2xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <Input 
                    placeholder="Search notices..." 
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 h-12 bg-background border-border/50 rounded-xl focus:ring-primary/20"
                  />
                </div>
                <Select value={category} onValueChange={(val: any) => {
                  setCategory(val);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-[180px] h-12 rounded-xl bg-background">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Exam">Examinations</SelectItem>
                    <SelectItem value="Admission">Admissions</SelectItem>
                    <SelectItem value="Event">Events</SelectItem>
                    <SelectItem value="Circular">Circulars</SelectItem>
                    <SelectItem value="Tender">Tenders</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="important-only" 
                    checked={priorityFilter === 'Important'}
                    onCheckedChange={(checked) => {
                      setPriorityFilter(checked ? 'Important' : 'All');
                      setCurrentPage(1);
                    }}
                  />
                  <Label htmlFor="important-only" className="font-bold text-sm cursor-pointer">Show Important Only</Label>
                </div>
                <div className="h-8 w-[1px] bg-border hidden md:block" />
                <div className="text-sm font-bold text-foreground/40">
                  Showing {filteredNotices.length} results
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left Timeline */}
              <aside className="hidden lg:block lg:col-span-3">
                <TimelineRail 
                  dates={allNoticeDates} 
                  selectedDate={selectedDate}
                  onDateClick={(date) => {
                    setSelectedDate(date);
                    setCurrentPage(1);
                  }}
                />
              </aside>

              {/* Right Notice List */}
              <div className="lg:col-span-9 space-y-8">
                <AnimatePresence mode="wait">
                  {paginatedNotices.length > 0 ? (
                    <motion.div 
                      key={currentPage + category + priorityFilter + search}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8"
                    >
                      {paginatedNotices.map((notice, idx) => (
                        <NoticeCard key={notice.id} notice={notice} index={idx} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 bg-primary/5 rounded-[3rem] border border-dashed border-primary/20"
                    >
                      <SlidersHorizontal className="h-12 w-12 text-primary/20 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-primary mb-2">No notices found</h3>
                      <p className="text-foreground/60">Try adjusting your filters or search terms.</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearch('');
                          setCategory('All');
                          setPriorityFilter('All');
                          setSelectedDate(null);
                        }}
                        className="mt-4"
                      >
                        Clear all filters
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-12">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="rounded-xl"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? 'default' : 'ghost'}
                          onClick={() => setCurrentPage(i + 1)}
                          className={cn(
                            "w-10 h-10 rounded-xl font-bold",
                            currentPage === i + 1 ? "bg-primary text-white" : "text-foreground/60"
                          )}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="rounded-xl"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
