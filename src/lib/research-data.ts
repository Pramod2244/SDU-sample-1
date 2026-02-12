
export type ResearchCategory = 'Clinical Research' | 'Community Health' | 'Biomedical Research' | 'Public Health' | 'Innovation & Technology';

export interface ResearchProject {
  id: string;
  title: string;
  pi: string;
  summary: string;
  category: ResearchCategory;
  imageId: string;
}

export interface JournalIssue {
  id: string;
  title: string;
  issueNo: string;
  year: string;
  summary: string;
  coverImageId: string;
  pages: JournalPage[];
}

export interface JournalPage {
  type: 'cover' | 'toc' | 'article' | 'faculty' | 'innovation';
  title: string;
  content: string;
  pullQuote?: string;
  image?: string;
}

export const researchCategories: ResearchCategory[] = [
  'Clinical Research',
  'Community Health',
  'Biomedical Research',
  'Public Health',
  'Innovation & Technology'
];

export const projectsData: ResearchProject[] = [
  {
    id: 'p1',
    title: 'Precision Genomics in Rural Populations',
    pi: 'Dr. Ananya Sharma',
    summary: 'A comprehensive study on the genetic markers of common metabolic disorders in rural Karnataka, aiming to develop personalized treatment protocols.',
    category: 'Biomedical Research',
    imageId: 'research-project-1'
  },
  {
    id: 'p2',
    title: 'AI-Powered Early Cardiac Diagnosis',
    pi: 'Dr. Ben Carter',
    summary: 'Leveraging deep learning models to analyze echocardiograms for earlier detection of cardiomyopathy in asymptomatic patients.',
    category: 'Innovation & Technology',
    imageId: 'hospital-clinical'
  },
  {
    id: 'p3',
    title: 'Community Maternal Health Resilience',
    pi: 'Dr. Chloe Martinez',
    summary: 'Evaluating the impact of mobile health interventions on prenatal care adherence in remote tribal settlements.',
    category: 'Community Health',
    imageId: 'dept-community-medicine'
  },
  {
    id: 'p4',
    title: 'Novel Bio-markers for Early Oncology',
    pi: 'Dr. David Chen',
    summary: 'Investigating saliva-based biomarkers for the non-invasive screening of oral squamous cell carcinoma.',
    category: 'Clinical Research',
    imageId: 'research-project-2'
  }
];

export const journalsData: JournalIssue[] = [
  {
    id: 'j1',
    title: 'SDUAHER Medical Review',
    issueNo: 'Vol. 12, No. 1',
    year: '2025',
    summary: 'A special edition focusing on post-pandemic healthcare resilience and the integration of AI in clinical practice.',
    coverImageId: 'journal-cover-1',
    pages: [
      {
        type: 'cover',
        title: 'Healthcare Resilience 2025',
        content: 'Special Issue: Future of Medicine'
      },
      {
        type: 'toc',
        title: 'Table of Contents',
        content: '1. Editorial: The Digital Shift\n2. Clinical Genomics: A New Era\n3. AI in Cardiology\n4. Faculty Spotlight: Dr. Prabhu E.\n5. Community Health Milestones'
      },
      {
        type: 'article',
        title: 'The Genomic Revolution',
        content: 'Medical science is witnessing an unprecedented shift towards personalized care. Our latest research into genomic sequencing has revealed specific markers that allow for precise pharmacological intervention. This article explores how these findings are being applied in the SDUMC teaching hospital.',
        pullQuote: 'The future of medicine is not just about healing, but about understanding the individual code of every patient.',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80'
      },
      {
        type: 'innovation',
        title: 'AI in the ER',
        content: 'Our Innovation & Technology wing has successfully piloted an AI triaging system that reduces emergency room wait times by 40%. By analyzing vital signs and patient history in real-time, the system prioritizes critical cases with 98% accuracy.',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
      },
      {
        type: 'faculty',
        title: 'Faculty Spotlight',
        content: 'Dr. Prabhu E. discusses the importance of integrating research into the undergraduate medical curriculum. "We are not just training doctors; we are training scientific thinkers who will lead the next century of healthcare."',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'j2',
    title: 'Innovation in Health',
    issueNo: 'Vol. 8, No. 4',
    year: '2024',
    summary: 'Focusing on community-driven healthcare models and rural health innovation.',
    coverImageId: 'journal-cover-2',
    pages: [
      {
        type: 'cover',
        title: 'Rural Health Innovation',
        content: 'Community & Care'
      },
      {
        type: 'article',
        title: 'Empowering Villages',
        content: 'How mobile diagnostic units are transforming the landscape of healthcare in Kolar district. Our outreach programs have reached over 50,000 residents in the last year.',
        pullQuote: 'Proximity should never be a barrier to quality healthcare.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];
