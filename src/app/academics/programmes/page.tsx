import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import VideoHero from '@/components/programmes/VideoHero';
import ProgrammeLinksGrid from '@/components/programmes/ProgrammeLinksGrid';
import FeatureSplitSection from '@/components/programmes/FeatureSplitSection';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ProgrammesListingPage = () => {
  const featureImage = PlaceHolderImages.find(img => img.id === 'programmes-feature');
  
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <VideoHero
          videoUrl="https://raw.githubusercontent.com/Pramod2244/hello-world/master/SDU%20(1).mp4"
          posterImageUrl={PlaceHolderImages.find(img => img.id === 'programmes-hero-poster')?.imageUrl}
          title="Programmes Offered"
          subtitle="Discover future-focused learning opportunities at SDUAHER."
          primaryCta={{ text: 'Explore Programmes', href: '#programmes-grid' }}
          secondaryCta={{ text: 'Download Brochure', href: '#' }}
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
