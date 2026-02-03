export type Faculty = {
  name: string;
  designation: string;
  qualification: string;
  photoId: string;
};

export type DepartmentProgram = {
  name: string;
  type: 'UG' | 'PG' | 'Super-specialty' | 'Fellowship';
};

export type Department = {
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  vision: string;
  mission: string;
  heroImageId: string;
  aboutImageId: string;
  faculty: Faculty[];
  programs: DepartmentProgram[];
  infrastructure: {
    title: string;
    description: string;
    imageId: string;
  }[];
  research: string[];
  contact: {
    person: string;
    email: string;
    phone: string;
    location: string;
  };
};

export const departmentsData: Department[] = [
  {
    slug: 'anatomy',
    name: 'Anatomy',
    shortDescription: 'The study of the structure of the human body and its parts.',
    overview: 'The Department of Anatomy at SDUMC is dedicated to providing a deep understanding of the human body through advanced cadaveric dissection, histology, and embryology studies. We bridge the gap between basic sciences and clinical practice.',
    vision: 'To be a global leader in anatomical education and morphological research.',
    mission: 'To impart high-quality anatomical knowledge using modern technology and traditional dissection techniques.',
    heroImageId: 'dept-anatomy',
    aboutImageId: 'dept-anatomy',
    faculty: [
      { name: 'Dr. Prabhu E.', designation: 'Professor & HOD', qualification: 'M.B.B.S., M.D.', photoId: 'bearer-principal' },
      { name: 'Dr. Sudha K.', designation: 'Associate Professor', qualification: 'M.B.B.S., M.D.', photoId: 'trustee-2' },
    ],
    programs: [
      { name: 'MBBS Anatomy Module', type: 'UG' },
      { name: 'MD Anatomy', type: 'PG' },
      { name: 'PhD in Morphological Sciences', type: 'Super-specialty' },
    ],
    infrastructure: [
      { title: 'Dissection Hall', description: 'State-of-the-art hall with advanced ventilation and storage.', imageId: 'dept-anatomy' },
      { title: 'Histology Lab', description: 'Equipped with high-definition microscopes and projection systems.', imageId: 'gallery-lab' },
    ],
    research: [
      { text: 'Anatomical variations in coronary arteries.', date: '2023' },
      { text: 'Morphometric study of the distal end of the femur.', date: '2022' },
    ].map(r => r.text),
    contact: {
      person: 'Dr. Prabhu E.',
      email: 'anatomy.office@sduaher.ac.in',
      phone: '+91 8152 243003 (Ext: 201)',
      location: 'Ground Floor, Basic Sciences Block, SDUMC',
    },
  },
  {
    slug: 'physiology',
    name: 'Physiology',
    shortDescription: 'Understanding the functions and mechanisms of living systems.',
    overview: 'The Department of Physiology focuses on the intricate mechanisms that allow the human body to function. From cellular processes to integrated organ systems, we explore the foundations of health and disease.',
    vision: 'Advancing the frontiers of physiological sciences through innovation and research.',
    mission: 'Fostering a deep understanding of functional biology in future medical professionals.',
    heroImageId: 'dept-physiology',
    aboutImageId: 'dept-physiology',
    faculty: [
      { name: 'Dr. Ramesh M.', designation: 'Professor & HOD', qualification: 'M.B.B.S., M.D.', photoId: 'bearer-medical-superintendent' },
    ],
    programs: [
      { name: 'MBBS Physiology Module', type: 'UG' },
      { name: 'MD Physiology', type: 'PG' },
    ],
    infrastructure: [
      { title: 'Hematology Lab', description: 'Advanced lab for blood analysis and physiological testing.', imageId: 'dept-physiology' },
    ],
    research: [
      { text: 'Impact of yoga on autonomic nervous system.', date: '2023' },
    ].map(r => r.text),
    contact: {
      person: 'Dr. Ramesh M.',
      email: 'physiology.office@sduaher.ac.in',
      phone: '+91 8152 243003 (Ext: 205)',
      location: 'First Floor, Basic Sciences Block, SDUMC',
    },
  },
  // Adding placeholders for all requested departments to show the grid
  ...['Biochemistry', 'Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine', 'Community Medicine', 'General Medicine', 'General Surgery', 'Pediatrics', 'Obstetrics & Gynaecology', 'Orthopaedics', 'Ophthalmology', 'ENT', 'Dermatology', 'Psychiatry', 'Radiology', 'Anaesthesiology', 'Emergency Medicine'].map(name => ({
    slug: name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-'),
    name,
    shortDescription: `Leading excellence in the field of ${name} through education and care.`,
    overview: `Detailed overview of the ${name} department and its contributions to medical science.`,
    vision: `To be a leader in ${name}.`,
    mission: `Excellence in ${name} education.`,
    heroImageId: `dept-${name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`,
    aboutImageId: 'gallery-lab',
    faculty: [],
    programs: [{ name: `MD in ${name}`, type: 'PG' as const }],
    infrastructure: [],
    research: [],
    contact: { person: 'Dept Office', email: 'office@sduaher.ac.in', phone: '+91', location: 'SDUMC Campus' }
  }))
] as Department[];
