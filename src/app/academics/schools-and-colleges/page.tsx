import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const departments = [
  { name: 'Anatomy', imageId: 'dept-anatomy', imageHint: 'anatomy lab' },
  { name: 'Physiology', imageId: 'dept-physiology', imageHint: 'physiology lab' },
  { name: 'Biochemistry', imageId: 'dept-biochemistry', imageHint: 'biochemistry lab' },
  { name: 'Pathology', imageId: 'dept-pathology', imageHint: 'pathology lab' },
  { name: 'Microbiology', imageId: 'dept-microbiology', imageHint: 'microbiology lab' },
  { name: 'Pharmacology', imageId: 'dept-pharmacology', imageHint: 'pharmacology lab' },
  { name: 'General Medicine', imageId: 'dept-general-medicine', imageHint: 'doctor patient' },
  { name: 'General Surgery', imageId: 'dept-general-surgery', imageHint: 'operating room' },
  { name: 'Pediatrics', imageId: 'dept-pediatrics', imageHint: 'pediatrician child' },
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
                Sri Devaraj Urs Medical College
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                A constituent college of SDUAHER, offering excellence in medical education, research, and healthcare since 1986.
              </p>
              <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                College Website
              </Button>
            </div>
          </section>

          {/* Departments Grid Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-12">
                Our Departments
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept) => {
                  const deptImage = PlaceHolderImages.find(img => img.id === dept.imageId);
                  return (
                    <Card key={dept.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card/80 backdrop-blur-sm border-white/20">
                       {deptImage && (
                          <div className="relative h-48 w-full">
                              <Image
                                  src={deptImage.imageUrl}
                                  alt={dept.name}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={deptImage.imageHint}
                              />
                          </div>
                      )}
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl">{dept.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <p className="text-foreground/80 mb-4 flex-grow">Explore the department of {dept.name}, its faculty, research, and academic programs.</p>
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
