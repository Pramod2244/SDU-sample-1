import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import LifeHero from '@/components/life-at-sduaher/LifeHero';
import ScrollStory from '@/components/life-at-sduaher/ScrollStory';
import HorizontalExperiences from '@/components/life-at-sduaher/HorizontalExperiences';
import VideoBreak from '@/components/life-at-sduaher/VideoBreak';
import WellnessScroll from '@/components/life-at-sduaher/WellnessScroll';
import CityParallax from '@/components/life-at-sduaher/CityParallax';
import CommunityQuotes from '@/components/life-at-sduaher/CommunityQuotes';
import LifeCTA from '@/components/life-at-sduaher/LifeCTA';

export default function LifeAtSduaherPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <LifeHero />
        <ScrollStory />
        <HorizontalExperiences />
        <VideoBreak />
        <WellnessScroll />
        <CityParallax />
        <CommunityQuotes />
        <LifeCTA />
      </main>
      <Footer />
    </div>
  );
}
