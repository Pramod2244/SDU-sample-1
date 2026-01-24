
import { programmesData } from '@/lib/programmes-data';
import ImageHero from '@/components/programmes/ImageHero';
import ProgrammeDetailLayout from '@/components/programmes/ProgrammeDetailLayout';
import { notFound } from 'next/navigation';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';


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

  const heroImage = PlaceHolderImages.find(img => img.id === programme.heroImageUrl);

  const navLinks = programme.sections.map(section => ({
    label: section.title,
    href: `#${section.id}`
  }));

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <ImageHero
          imageUrl={heroImage?.imageUrl}
          title={programme.title}
          subtitle={programme.subtitle}
          ctaText="Explore Courses"
          ctaLink="#courses-offered"
        />
        <ProgrammeDetailLayout navLinks={navLinks} programme={programme} />
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammeDetailPage;
