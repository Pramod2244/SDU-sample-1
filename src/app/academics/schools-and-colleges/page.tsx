import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const schools = [
  {
    name: 'College of Arts & Sciences',
    description: 'Fostering critical thinking and creative expression across the humanities, social sciences, and natural sciences.',
    imageId: 'college-arts-sciences',
  },
  {
    name: 'Albers School of Business and Economics',
    description: 'Developing ethical business leaders with a global mindset to make a positive impact on society.',
    imageId: 'college-business',
  },
  {
    name: 'College of Nursing',
    description: 'Preparing compassionate and skilled healthcare professionals to serve diverse communities.',
    imageId: 'college-nursing',
  },
  {
    name: 'College of Education',
    description: 'Empowering educators and leaders to create equitable and effective learning environments.',
    imageId: 'college-education',
  },
  {
    name: 'College of Science and Engineering',
    description: 'Driving innovation and discovery through rigorous research and hands-on learning in STEM fields.',
    imageId: 'college-engineering',
  },
];


const SchoolsAndCollegesPage = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'schools-colleges-hero');
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
      <div className="flex flex-col min-h-screen bg-background/95">
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
                SCHOOLS AND COLLEGES
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                Explore seven schools and colleges with academically challenging programs that change your life—and the world—for the better.
              </p>
              <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                Admissions & Aid
              </Button>
            </div>
          </section>

          {/* Schools Grid Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-12">
                Our Schools and Colleges
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {schools.map((school) => {
                  const schoolImage = PlaceHolderImages.find(img => img.id === school.imageId);
                  return (
                    <Card key={school.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                       {schoolImage && (
                          <div className="relative h-48 w-full">
                              <Image
                                  src={schoolImage.imageUrl}
                                  alt={school.name}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={schoolImage.imageHint}
                              />
                          </div>
                      )}
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl">{school.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <p className="text-foreground/80 mb-4 flex-grow">{school.description}</p>
                        <Link href="#" className="font-semibold text-primary hover:underline inline-flex items-center">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SchoolsAndCollegesPage;
