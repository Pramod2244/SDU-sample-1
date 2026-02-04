
export type NoticeCategory = 'Exam' | 'Admission' | 'Event' | 'Circular' | 'Tender' | 'General';
export type NoticePriority = 'Normal' | 'Important' | 'Urgent';

export interface NoticeAttachment {
  type: 'pdf' | 'doc' | 'image';
  label: string;
  url: string;
}

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  priority: NoticePriority;
  shortDescription: string;
  fullDescription: string;
  publishDate: string;
  importantDate?: string;
  isPinned: boolean;
  attachments: NoticeAttachment[];
}

export const noticesData: Notice[] = [
  {
    id: '1',
    title: 'MBBS Supplementary Examination Schedule - Oct 2024',
    category: 'Exam',
    priority: 'Urgent',
    shortDescription: 'The detailed timetable for the upcoming MBBS supplementary examinations is now available for download.',
    fullDescription: 'Students appearing for the supplementary exams are requested to check their eligibility and download the hall tickets starting from Oct 1st. Examinations will commence from Oct 15th across all designated centers. Standard COVID-19 safety protocols must be followed during the exams.',
    publishDate: new Date().toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    isPinned: true,
    attachments: [
      { type: 'pdf', label: 'Exam Timetable.pdf', url: '#' },
      { type: 'pdf', label: 'Instructions.pdf', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'Admission Open for Post Graduate Medical Courses 2024-25',
    category: 'Admission',
    priority: 'Important',
    shortDescription: 'Applications are invited for MD/MS programs across 21 specialties for the academic year 2024-25.',
    fullDescription: 'Prospective candidates can apply online through the official admission portal. Eligibility criteria follow NEET-PG 2024 rankings. Scholarship opportunities are available for meritorious candidates and those from underprivileged backgrounds.',
    publishDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 15).toISOString(),
    isPinned: true,
    attachments: [
      { type: 'pdf', label: 'PG Prospectus.pdf', url: '#' },
      { type: 'image', label: 'Seat Matrix.jpg', url: '#' }
    ]
  },
  {
    id: '3',
    title: 'Workshop on Advanced Laparoscopic Surgery Techniques',
    category: 'Event',
    priority: 'Normal',
    shortDescription: 'A two-day hands-on workshop for surgical residents and practitioners.',
    fullDescription: 'Join international experts for a comprehensive workshop featuring live surgical demonstrations and simulation training. Registration is limited to 50 participants on a first-come, first-served basis.',
    publishDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 10).toISOString(),
    isPinned: false,
    attachments: [
      { type: 'pdf', label: 'Workshop Schedule.pdf', url: '#' }
    ]
  },
  {
    id: '4',
    title: 'Tender Notice: Equipment for Molecular Biology Lab',
    category: 'Tender',
    priority: 'Normal',
    shortDescription: 'Sealed tenders are invited for the supply and installation of high-precision lab equipment.',
    fullDescription: 'Reputed manufacturers and authorized dealers can submit technical and financial bids. Detailed specifications and terms are available in the tender document. The pre-bid meeting is scheduled for next Monday.',
    publishDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 20).toISOString(),
    isPinned: false,
    attachments: [
      { type: 'doc', label: 'Tender_Document_MB_04.docx', url: '#' }
    ]
  },
  {
    id: '5',
    title: 'University Holiday Announcement: Gandhi Jayanti',
    category: 'General',
    priority: 'Normal',
    shortDescription: 'The university and hospital outpatient departments will remain closed on October 2nd.',
    fullDescription: 'On the occasion of Gandhi Jayanti, all academic blocks and administrative offices will be closed. Emergency services at R.L. Jalappa Hospital will remain fully functional 24/7.',
    publishDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    importantDate: '2024-10-02T00:00:00.000Z',
    isPinned: false,
    attachments: []
  },
  {
    id: '6',
    title: 'Circular: Revised Library Timings during Exam Period',
    category: 'Circular',
    priority: 'Normal',
    shortDescription: 'The central library will now remain open until midnight for student convenience.',
    fullDescription: 'Starting from next week, the reading rooms will be accessible from 8:00 AM to 12:00 AM. Please ensure you carry your university ID card for entry.',
    publishDate: new Date(Date.now() - 86400000 * 12).toISOString(),
    isPinned: false,
    attachments: []
  },
  {
    id: '7',
    title: 'Health Camp at Devarayasamudra Village',
    category: 'Event',
    priority: 'Normal',
    shortDescription: 'Community outreach program by the Department of Community Medicine.',
    fullDescription: 'We are organizing a free health screening camp focusing on maternal and child health. Medical students and interns are encouraged to volunteer.',
    publishDate: new Date(Date.now() - 86400000 * 15).toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 25).toISOString(),
    isPinned: false,
    attachments: []
  },
  {
    id: '8',
    title: 'Notice for Convocation Gown Collection',
    category: 'General',
    priority: 'Important',
    shortDescription: 'Graduating students can collect their convocation gowns from the admin office.',
    fullDescription: 'Ensure you have cleared all dues before gown collection. Gowns must be returned within 48 hours after the convocation ceremony.',
    publishDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    isPinned: false,
    attachments: [
      { type: 'pdf', label: 'Gown_Collection_Procedure.pdf', url: '#' }
    ]
  },
  {
    id: '9',
    title: 'Internal Assessment Results - 2nd Year MBBS',
    category: 'Exam',
    priority: 'Normal',
    shortDescription: 'Results for the first internal assessment have been published.',
    fullDescription: 'Students can check their individual scores on the student portal or the department notice board. Any discrepancies should be reported to the HOD within 3 days.',
    publishDate: new Date(Date.now() - 86400000 * 20).toISOString(),
    isPinned: false,
    attachments: []
  },
  {
    id: '10',
    title: 'Hostel Maintenance Notice: Block A & B',
    category: 'General',
    priority: 'Normal',
    shortDescription: 'Scheduled water supply interruption for maintenance work.',
    fullDescription: 'The maintenance department will be cleaning the overhead tanks. Water supply will be interrupted between 10 AM and 4 PM this Sunday.',
    publishDate: new Date(Date.now() - 86400000 * 4).toISOString(),
    isPinned: false,
    attachments: []
  },
  {
    id: '11',
    title: 'Invitation for Research Paper Submissions: SDUAHER Journal',
    category: 'General',
    priority: 'Normal',
    shortDescription: 'Call for papers for the quarterly University Medical Journal.',
    fullDescription: 'We invite original research, case reports, and reviews for the upcoming winter edition. Please follow the ICJME guidelines for submission.',
    publishDate: new Date(Date.now() - 86400000 * 25).toISOString(),
    importantDate: new Date(Date.now() + 86400000 * 45).toISOString(),
    isPinned: false,
    attachments: [
      { type: 'pdf', label: 'Submission Guidelines.pdf', url: '#' }
    ]
  },
  {
    id: '12',
    title: 'Emergency: Blood Donation Drive',
    category: 'Event',
    priority: 'Urgent',
    shortDescription: 'R.L. Jalappa Blood Bank requires O negative and AB negative units.',
    fullDescription: 'We are facing a shortage of rare blood groups. Donors are requested to visit the blood bank between 9 AM and 6 PM. Every drop counts.',
    publishDate: new Date().toISOString(),
    isPinned: true,
    attachments: []
  }
];
