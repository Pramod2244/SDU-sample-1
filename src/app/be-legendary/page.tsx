
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/be-legendary/Hero';
import Story from '@/components/be-legendary/Story';
import MoreContent from '@/components/be-legendary/MoreContent';

export default function BeLegendaryPage() {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <Hero />
        <Story />
        <MoreContent />
      </main>
      <Footer />
    </div>
  );
}
