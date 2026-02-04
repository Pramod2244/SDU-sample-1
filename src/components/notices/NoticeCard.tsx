
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FileText, 
  FileImage, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';
import { type Notice } from '@/lib/notices-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const priorityStyles = {
  Urgent: "border-red-500/30 bg-red-500/[0.02] shadow-[0_0_20px_-5px_rgba(239,68,68,0.1)]",
  Important: "border-amber-500/30 bg-amber-500/[0.02] shadow-[0_0_20px_-5px_rgba(245,158,11,0.1)]",
  Normal: "border-border bg-card shadow-soft-sm"
};

const categoryColors = {
  Exam: "bg-blue-100 text-blue-700",
  Admission: "bg-purple-100 text-purple-700",
  Event: "bg-green-100 text-green-700",
  Circular: "bg-amber-100 text-amber-700",
  Tender: "bg-slate-100 text-slate-700",
  General: "bg-rose-100 text-rose-700"
};

export default function NoticeCard({ notice, index }: { notice: Notice; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      id={`notice-${notice.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative rounded-2xl border transition-all duration-300 overflow-hidden group",
        priorityStyles[notice.priority]
      )}
    >
      {/* Top Accent for Important/Urgent */}
      {(notice.priority === 'Urgent' || notice.priority === 'Important') && (
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1",
          notice.priority === 'Urgent' ? "bg-red-500" : "bg-amber-500"
        )} />
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Badge className={cn("px-3 py-1 rounded-lg border-none font-bold", categoryColors[notice.category])}>
              {notice.category}
            </Badge>
            {notice.priority !== 'Normal' && (
              <div className={cn(
                "flex items-center gap-1.5 text-xs font-black uppercase tracking-wider",
                notice.priority === 'Urgent' ? "text-red-600" : "text-amber-600"
              )}>
                <AlertCircle className="h-3 w-3" />
                {notice.priority}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-foreground/40 text-xs font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Published: {format(new Date(notice.publishDate), 'MMM dd, yyyy')}
            </span>
          </div>
        </div>

        <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight group-hover:text-primary/80 transition-colors">
          {notice.title}
        </h3>

        <p className="text-foreground/70 text-lg leading-relaxed mb-6">
          {notice.shortDescription}
        </p>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-8 border-t border-border mt-6">
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line mb-8">
                  {notice.fullDescription}
                </p>

                {notice.attachments.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary/60">Attachments</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {notice.attachments.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors group/file">
                          <div className="flex items-center gap-3">
                            {file.type === 'image' ? <FileImage className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
                            <span className="text-sm font-bold text-foreground/80">{file.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white rounded-lg transition-colors text-primary/60 hover:text-primary">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg transition-colors text-primary/60 hover:text-primary">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-6">
            {notice.importantDate && (
              <div className="flex items-center gap-2 text-primary">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase opacity-50 leading-none">Important Date</div>
                  <div className="font-bold">{format(new Date(notice.importantDate), 'MMM dd, yyyy')}</div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-3 transition-all"
          >
            {isExpanded ? 'Collapse' : 'Read More'}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
