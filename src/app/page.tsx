import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import ValueCards from '@/components/landing/ValueCards';
import Admissions from '@/components/landing/Admissions';
import Academics from '@/components/landing/Academics';
import CampusLife from '@/components/landing/CampusLife';
import NewsEvents from '@/components/landing/NewsEvents';
import About from '@/components/landing/About';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ValueCards />
        <Admissions />
        <Academics />
        <CampusLife />
        <NewsEvents />
        <About />
      </main>
      <Footer />
    </div>
  );
}
