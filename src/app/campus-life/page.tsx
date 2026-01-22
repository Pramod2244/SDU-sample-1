import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CampusLifeSection from '@/components/landing/CampusLife';

const CampusLifePage = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'campus-life-hero');
  const bgImage = PlaceHolderImages.find((img) => img.id === 'page-background-texture');

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: bgImage ? `url(${bgImage.imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[60vh] flex items-center justify-center text-white">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
              <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight">
                Life at SDUAHER
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                Your education extends beyond the classroom with opportunities to explore all parts of your life—and have plenty of fun along the way.
              </p>
            </div>
          </section>

          {/* Content Section */}
          <CampusLifeSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CampusLifePage;
