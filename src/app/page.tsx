import LandingHero from '@/components/LandingHero';
import LandingFeatures from '@/components/LandingFeatures';
import LandingHowItWorks from '@/components/LandingHowItWorks';
import LandingCTA from '@/components/LandingCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingCTA />
      <Footer />
    </>
  );
}
