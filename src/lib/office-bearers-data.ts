
export type OfficeBearer = {
  slug: string;
  name: string;
  designation: string;
  qualifications: string;
  photoId: string;
  message: string;
  biography: string[];
  experience: string[];
  achievements: string[];
  vision: string;
};

export const officeBearersData: OfficeBearer[] = [
  {
    slug: 'principal',
    name: 'Dr. Prabhu E.',
    designation: 'Principal',
    qualifications: 'M.B.B.S., M.D. (Anatomy)',
    photoId: 'bearer-principal',
    message: 'It is my distinct honor to lead Sri Devaraj Urs Medical College, an institution with a legacy of nearly four decades of academic excellence and service to humanity. Our mission is to transform young medical aspirants into competent, compassionate, and ethical healers. We blend traditional values with modern scientific rigor to ensure our students are ready for global challenges.',
    biography: [
      'Joined SDUMC in 1995 with a passion for medical education.',
      'Over 25 years of teaching and administrative experience in higher medical education.',
      'Specialized in advanced gross anatomy and neuroanatomy.',
      'Instrumental in implementing the latest NMC curriculum at the institution.'
    ],
    experience: [
      'Professor & Head of Anatomy for over 10 years.',
      'Dean of Academic Affairs (2015-2020).',
      'Chief Coordinator for NAAC and NABH accreditation processes.',
      'Published 40+ research papers in indexed national and international journals.'
    ],
    achievements: [
      'Recipient of the Best Teacher Award in 2018.',
      'Member of the National Medical Commission (NMC) inspection team.',
      'Fellow of the International Medical Sciences Academy (IMSA).'
    ],
    vision: 'To establish SDUMC as a premier global destination for medical research and patient-centric education, producing leaders who redefine healthcare standards.'
  },
  {
    slug: 'vice-principal',
    name: 'Dr. Shakuntala S.',
    designation: 'Vice Principal',
    qualifications: 'M.B.B.S., M.S. (General Surgery)',
    photoId: 'bearer-vice-principal',
    message: 'Academic excellence is the cornerstone of SDUAHER. As Vice Principal, my focus is on ensuring that our teaching-learning methodologies are innovative, student-centric, and research-oriented. We strive to provide a nurturing environment where every student can achieve their full potential and contribute meaningfully to the medical field.',
    biography: [
      'Dedicated surgical educator with over 20 years of clinical and teaching experience.',
      'Pioneer in implementing simulation-based training for surgical residents.',
      'Active member of the Association of Surgeons of India.'
    ],
    experience: [
      'Professor of General Surgery since 2012.',
      'Coordinator for Clinical Skills Laboratory.',
      'Led multiple community health surgical camps in rural Kolar.',
      'Recipient of several state-level honors for surgical excellence.'
    ],
    achievements: [
      'Published groundbreaking research on minimally invasive surgical techniques.',
      'Invited speaker at several international surgical conferences.',
      'Mentor to over 50 post-graduate surgical students.'
    ],
    vision: 'Our vision is to bridge the gap between theoretical knowledge and clinical mastery through cutting-edge simulation and mentorship programs.'
  },
  {
    slug: 'medical-superintendent',
    name: 'Dr. Ravishankar M.',
    designation: 'Medical Superintendent',
    qualifications: 'M.B.B.S., M.D. (General Medicine)',
    photoId: 'bearer-medical-superintendent',
    message: 'R.L. Jalappa Hospital is more than just a medical facility; it is a center of hope and healing for thousands in our region. As Medical Superintendent, my priority is to deliver affordable, evidence-based, and high-quality healthcare while providing our students with the best possible clinical training platform.',
    biography: [
      'Expert physician with a focus on internal medicine and geriatric care.',
      'Over 22 years of experience in hospital administration and clinical practice.',
      'Known for implementing patient safety protocols and quality improvement initiatives.'
    ],
    experience: [
      'Medical Superintendent since 2019.',
      'Former Head of Internal Medicine.',
      'Played a crucial role in the development of the tertiary care super-specialty wings.',
      'Awarded for exceptional leadership during public health crises.'
    ],
    achievements: [
      'Successfully led the hospital through multiple accreditation cycles.',
      'Modernized the Outpatient and Emergency departments.',
      'Author of a textbook on Hospital Administration for Medical Students.'
    ],
    vision: 'To build a healthcare ecosystem that is digitally advanced, patient-first, and serves as a model for rural tertiary care centers across India.'
  }
];
