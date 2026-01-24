export type Programme = {
  slug: string;
  title: string;
  subtitle: string;
  heroVideoUrl: string;
  heroImageUrl: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
  courses?: {
      name: string;
      duration: string;
  }[];
  careerOutcomes?: string[];
  features?: {
    title: string;
    description: string;
    imageId: string;
  }[];
};

export const programmesData: Programme[] = [
  {
    slug: 'medicine',
    title: 'School of Medicine & Health Sciences',
    subtitle: 'Industry-ready learning • Research-driven • Career-focused',
    heroVideoUrl: 'https://raw.githubusercontent.com/Pramod2244/hello-world/master/18088-288458760_small.mp4',
    heroImageUrl: 'hero-medicine',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `The School of Medicine & Health Sciences is the cornerstone of SDUAHER, dedicated to nurturing the next generation of medical leaders. Our curriculum integrates cutting-edge medical science with compassionate, patient-centered care. Students gain hands-on experience through our affiliated 1000-bed teaching hospital, working alongside world-class faculty who are leaders in their respective fields. We emphasize a research-driven approach, encouraging students to participate in groundbreaking studies that shape the future of healthcare.`,
      },
      {
        id: 'courses-offered',
        title: 'Courses Offered',
        content: 'We offer a comprehensive range of undergraduate and postgraduate medical courses designed to meet the highest global standards.',
      },
      {
        id: 'facilities',
        title: 'Facilities',
        content: 'Our school is equipped with state-of-the-art facilities, including advanced simulation labs, a digital library with access to thousands of journals, modern lecture halls, and specialized research centers. The attached hospital provides a rich clinical learning environment with diverse patient cases and advanced medical technology.',
      },
      {
        id: 'career-opportunities',
        title: 'Career Opportunities',
        content: 'Graduates from the School of Medicine are highly sought after by top hospitals and healthcare institutions worldwide. Our alumni have become leaders in clinical practice, medical research, public health, and healthcare administration.',
      },
      {
        id: 'student-life',
        title: 'Student Life',
        content: 'Beyond academics, the School of Medicine offers a vibrant campus life with numerous clubs, societies, and events. From medical innovation hackathons to community health camps, students have ample opportunities for personal and professional growth.'
      }
    ],
    courses: [
        { name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)', duration: '5.5 Years' },
        { name: 'MD in General Medicine', duration: '3 Years' },
        { name: 'MS in General Surgery', duration: '3 Years' },
        { name: 'MD in Pediatrics', duration: '3 Years' },
        { name: 'MS in Orthopedics', duration: '3 Years' },
    ],
    careerOutcomes: [
        'Clinical Practitioner in Multispecialty Hospitals',
        'Medical Research Scientist',
        'Public Health Specialist',
        'Healthcare Administrator',
        'Medical Faculty in Academic Institutions',
    ],
    features: [
        { title: 'Career Center', description: 'Our dedicated career center provides guidance, resources, and networking opportunities to help students launch successful careers.', imageId: 'feature-career-center' },
        { title: 'Mentorship Program', description: 'Students are paired with experienced faculty and alumni mentors who provide personalized guidance and support.', imageId: 'feature-mentorship' },
        { title: 'Clubs & Activities', description: 'Engage in a wide range of extracurricular activities, from medical societies to sports and cultural clubs.', imageId: 'feature-student-clubs' },
    ]
  },
  {
    slug: 'pharmacy',
    title: 'School of Pharmacy',
    subtitle: 'Innovating drug discovery • Patient-centric care • Global standards',
    heroVideoUrl: 'https://raw.githubusercontent.com/Pramod2244/hello-world/master/90933-629483642_small.mp4',
    heroImageUrl: 'hero-pharmacy',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: 'The School of Pharmacy at SDUAHER is at the forefront of pharmaceutical education and research. Our programs are designed to equip students with the knowledge and skills to excel in the dynamic pharmaceutical industry, from drug discovery and development to clinical pharmacy and patient care. We foster an environment of innovation, encouraging students to tackle complex challenges in medicine and healthcare.',
      },
       {
        id: 'courses-offered',
        title: 'Courses Offered',
        content: 'Our curriculum combines rigorous scientific training with practical, hands-on experience in our state-of-the-art laboratories.',
      },
      {
        id: 'facilities',
        title: 'Facilities',
        content: 'Students have access to modern laboratories for pharmacology, pharmaceutics, and medicinal chemistry, a dedicated drug information center, and extensive library resources. Our collaborations with leading pharmaceutical companies provide unique internship and research opportunities.',
      },
       {
        id: 'career-opportunities',
        title: 'Career Opportunities',
        content: 'Our graduates are prepared for diverse careers in the pharmaceutical industry, research institutions, hospitals, and regulatory agencies.',
      },
      {
        id: 'student-life',
        title: 'Student Life',
        content: 'Engage in a vibrant community with active student chapters of professional organizations, research symposiums, and community outreach programs focused on medication awareness and safety.'
      }
    ],
     courses: [
        { name: 'B.Pharm (Bachelor of Pharmacy)', duration: '4 Years' },
        { name: 'M.Pharm in Pharmaceutics', duration: '2 Years' },
        { name: 'M.Pharm in Pharmacology', duration: '2 Years' },
        { name: 'Pharm.D (Doctor of Pharmacy)', duration: '6 Years' },
    ],
    careerOutcomes: [
        'Research & Development Scientist',
        'Clinical Pharmacist in Hospitals',
        'Regulatory Affairs Specialist',
        'Quality Assurance Manager',
        'Medical Science Liaison',
    ],
     features: [
        { title: 'Career Center', description: 'Our dedicated career center provides guidance, resources, and networking opportunities to help students launch successful careers.', imageId: 'feature-career-center' },
        { title: 'Mentorship Program', description: 'Students are paired with experienced faculty and alumni mentors who provide personalized guidance and support.', imageId: 'feature-mentorship' },
        { title: 'Clubs & Activities', description: 'Engage in a wide range of extracurricular activities, from medical societies to sports and cultural clubs.', imageId: 'feature-student-clubs' },
    ]
  },
  {
    slug: 'nursing',
    title: 'School of Nursing',
    subtitle: 'Compassionate care • Clinical excellence • Leadership in nursing',
    heroVideoUrl: 'https://raw.githubusercontent.com/Pramod2244/hello-world/master/SDU%20(1).mp4',
    heroImageUrl: 'hero-nursing',
     sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: 'The School of Nursing is committed to developing compassionate, skilled, and ethical nursing professionals. Our programs emphasize evidence-based practice, critical thinking, and leadership. Students receive extensive clinical training in diverse settings, preparing them to provide high-quality care in a rapidly evolving healthcare landscape.',
      },
       {
        id: 'courses-offered',
        title: 'Courses Offered',
        content: 'From foundational undergraduate programs to advanced postgraduate specializations, our courses prepare nurses for leadership roles.',
      },
      {
        id: 'facilities',
        title: 'Facilities',
        content: 'Our high-fidelity simulation center allows students to practice clinical skills in a safe, controlled environment. Clinical rotations take place at our teaching hospital and various community health settings, providing a broad spectrum of experience.',
      },
       {
        id: 'career-opportunities',
        title: 'Career Opportunities',
        content: 'Graduates are well-prepared for roles as registered nurses, clinical nurse specialists, nurse educators, and healthcare administrators.',
      },
       {
        id: 'student-life',
        title: 'Student Life',
        content: 'Join a supportive community of peers and faculty, participate in student nurse associations, and contribute to community health initiatives.'
      }
    ],
    courses: [
        { name: 'B.Sc. in Nursing', duration: '4 Years' },
        { name: 'Post Basic B.Sc. in Nursing', duration: '2 Years' },
        { name: 'M.Sc. in Medical-Surgical Nursing', duration: '2 Years' },
        { name: 'M.Sc. in Pediatric Nursing', duration: '2 Years' },
    ],
    careerOutcomes: [
        'Registered Nurse (RN) in Hospitals',
        'Clinical Nurse Specialist',
        'Nurse Educator / Faculty',
        'Public Health Nurse',
        'Hospital Nurse Manager',
    ],
     features: [
        { title: 'Career Center', description: 'Our dedicated career center provides guidance, resources, and networking opportunities to help students launch successful careers.', imageId: 'feature-career-center' },
        { title: 'Mentorship Program', description: 'Students are paired with experienced faculty and alumni mentors who provide personalized guidance and support.', imageId: 'feature-mentorship' },
        { title: 'Clubs & Activities', description: 'Engage in a wide range of extracurricular activities, from medical societies to sports and cultural clubs.', imageId: 'feature-student-clubs' },
    ]
  },
  {
    slug: 'physiotherapy',
    title: 'School of Physiotherapy',
    subtitle: 'Restoring movement • Enhancing lives • Evidence-based practice',
    heroVideoUrl: 'https://raw.githubusercontent.com/Pramod2244/hello-world/master/18088-288458760_small.mp4',
    heroImageUrl: 'hero-physiotherapy',
     sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: 'The School of Physiotherapy is dedicated to educating professionals who can help individuals restore movement and improve their quality of life. Our curriculum is grounded in scientific principles and evidence-based practice, combining classroom learning with extensive clinical experience. Students learn to assess, diagnose, and treat a wide range of musculoskeletal, neurological, and cardiorespiratory conditions.',
      },
       {
        id: 'courses-offered',
        title: 'Courses Offered',
        content: 'Our comprehensive programs cover the full spectrum of physiotherapy practice.',
      },
       {
        id: 'facilities',
        title: 'Facilities',
        content: 'The school features advanced labs for biomechanics and exercise physiology, a fully equipped outpatient physiotherapy clinic, and opportunities for clinical practice in sports medicine, rehabilitation centers, and community settings.',
      },
       {
        id: 'career-opportunities',
        title: 'Career Opportunities',
        content: 'Graduates pursue successful careers in hospitals, private clinics, sports organizations, and rehabilitation centers.',
      },
      {
        id: 'student-life',
        title: 'Student Life',
        content: 'Students participate in sports medicine coverage for university teams, fitness and wellness camps, and professional development workshops.'
      }
    ],
     courses: [
        { name: 'Bachelor of Physiotherapy (BPT)', duration: '4.5 Years' },
        { name: 'Master of Physiotherapy in Orthopedics', duration: '2 Years' },
        { name: 'Master of Physiotherapy in Neurology', duration: '2 Years' },
    ],
    careerOutcomes: [
        'Clinical Physiotherapist',
        'Sports Physiotherapist',
        'Rehabilitation Specialist',
        'Academician / Researcher',
        'Ergonomics Consultant',
    ],
     features: [
        { title: 'Career Center', description: 'Our dedicated career center provides guidance, resources, and networking opportunities to help students launch successful careers.', imageId: 'feature-career-center' },
        { title: 'Mentorship Program', description: 'Students are paired with experienced faculty and alumni mentors who provide personalized guidance and support.', imageId: 'feature-mentorship' },
        { title: 'Clubs & Activities', description: 'Engage in a wide range of extracurricular activities, from medical societies to sports and cultural clubs.', imageId: 'feature-student-clubs' },
    ]
  }
];
