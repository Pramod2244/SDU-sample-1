
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
    summary: 'A comprehensive study on the genetic markers of common metabolic disorders in rural Karnataka.',
    category: 'Biomedical Research',
    imageId: 'research-project-1'
  },
  {
    id: 'p2',
    title: 'AI-Powered Early Cardiac Diagnosis',
    pi: 'Dr. Ben Carter',
    summary: 'Leveraging deep learning models to analyze echocardiograms for earlier detection of cardiomyopathy.',
    category: 'Innovation & Technology',
    imageId: 'hospital-clinical'
  },
  {
    id: 'p3',
    title: 'Community Maternal Health Resilience',
    pi: 'Dr. Chloe Martinez',
    summary: 'Evaluating the impact of mobile health interventions on prenatal care adherence.',
    category: 'Community Health',
    imageId: 'dept-community-medicine'
  }
];

export const journalsData: JournalIssue[] = [
  {
    id: 'j1',
    title: 'Research & Innovation Review',
    issueNo: 'Issue 2025',
    year: '2025',
    summary: 'An annual digest of breakthroughs in medical science and rural healthcare delivery.',
    coverImageId: 'journal-cover-1',
    pages: [
      {
        type: 'cover',
        title: 'Research & Innovation',
        content: 'SDUAHER • 2025 ANNUAL REVIEW'
      },
      {
        type: 'toc',
        title: 'Inside This Issue',
        content: '04. The Genomic Frontier\n06. Rural Health Innovation\n08. AI in Emergency Care\n10. Faculty Spotlight\n12. Clinical Excellence Milestones'
      },
      {
        type: 'article',
        title: 'The Genomic Frontier',
        content: 'Medical science is witnessing an unprecedented shift towards personalized care. Our latest research into genomic sequencing has revealed specific markers that allow for precise pharmacological intervention. By understanding the individual genetic code of every patient, we are moving away from traditional one-size-fits-all treatments towards a more effective, targeted approach that minimizes side effects and maximizes recovery rates.',
        pullQuote: 'The future of medicine lies in the code within us.',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80'
      },
      {
        type: 'article',
        title: 'Rural Health Innovation',
        content: 'Access to high-quality healthcare shouldn\'t be a privilege determined by geography. At SDUAHER, we are pioneering mobile diagnostic units equipped with satellite-linked imaging tools. These "clinics on wheels" allow our specialists to consult with rural patients in real-time, providing tertiary care standards to the most remote villages in Kolar. This initiative has already served over 50,000 residents this year.',
        pullQuote: 'Geography should not define the quality of your care.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
      },
      {
        type: 'innovation',
        title: 'AI in the Emergency Ward',
        content: 'Our Innovation & Technology wing has successfully piloted an AI triaging system that reduces emergency room wait times by 40%. By analyzing vital signs and patient history in real-time, the system prioritizes critical cases with 98% accuracy, ensuring that those in immediate need receive care without delay.',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
      },
      {
        type: 'faculty',
        title: 'Dean\'s Perspective',
        content: 'Dr. Prabhu E. discusses the importance of integrating research into the medical curriculum. "We are not just training doctors; we are training scientific thinkers who will lead the next century of healthcare."',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];
