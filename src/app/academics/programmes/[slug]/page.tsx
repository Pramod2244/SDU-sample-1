
import { programmesData } from '@/lib/programmes-data';
import VideoHero from '@/components/programmes/VideoHero';
import ProgrammeDetailLayout from '@/components/programmes/ProgrammeDetailLayout';
import { notFound } from 'next/navigation';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';


export async function generateStaticParams() {
  return programmesData.map((programme) => ({
    slug: programme.slug,
  }));
}

type ProgrammeDetailPageProps = {
  params: {
    slug: string;
  };
};

const ProgrammeDetailPage = ({ params }: ProgrammeDetailPageProps) => {
  const programme = programmesData.find((p) => p.slug === params.slug);

  if (!programme) {
    notFound();
  }

  const navLinks = programme.sections.map(section => ({
    label: section.title,
    href: `#${section.id}`
  }));

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <VideoHero
          videoUrl={programme.heroVideoUrl}
          posterImageUrl={programme.heroImageUrl}
          title={programme.title}
          subtitle={programme.subtitle}
          primaryCta={{ text: 'Explore Courses', href: `#courses-offered` }}
        />
        <ProgrammeDetailLayout navLinks={navLinks} programme={programme} />
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammeDetailPage;
