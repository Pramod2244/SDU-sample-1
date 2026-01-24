import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import ImageHero from '@/components/programmes/ImageHero';
import ProgrammeLinksGrid from '@/components/programmes/ProgrammeLinksGrid';
import FeatureSplitSection from '@/components/programmes/FeatureSplitSection';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ProgrammesListingPage = () => {
  const featureImage = PlaceHolderImages.find(img => img.id === 'programmes-feature');
  const heroImage = PlaceHolderImages.find(img => img.id === 'programmes-hero-poster');
  
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <ImageHero
          title="Programmes Offered"
          subtitle="Explore SDUAHER’s diverse programs designed to transform your future."
          imageUrl={heroImage?.imageUrl}
          ctaText="Explore Programmes"
          ctaLink="#programmes-grid"
        />
        <ProgrammeLinksGrid />
        <FeatureSplitSection
           leftContent={
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight">
                ACADEMIC EXCELLENCE THAT TRANSFORMS YOUR FUTURE
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                SDUAHER is dedicated to providing an environment where academic rigor meets real-world application. Our curriculum is designed in collaboration with industry leaders to ensure you graduate with the skills and knowledge demanded by today's global landscape.
              </p>
            </div>
          }
          rightContent={
            <Card className="bg-card p-8 shadow-soft-lg border-border/50">
              <h3 className="font-headline text-3xl mb-4">Our Programmes</h3>
              <p className="text-lg text-foreground/70 mb-6">
                Explore 100+ career-ready programmes across 9 distinct schools of study, from undergraduate to doctoral levels.
              </p>
              <Button size="lg">Learn More</Button>
            </Card>
          }
          image={featureImage}
          imageSide="right"
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammesListingPage;
