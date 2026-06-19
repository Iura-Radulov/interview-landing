import LandingHero from '@/components/LandingHero';
import LandingFeatures from '@/components/LandingFeatures';
import HeroBackgroundImageSection from '@/components/HeroBackgroundImageSection';
import LandingHowItWorks from '@/components/LandingHowItWorks';
import LandingCTA from '@/components/LandingCTA';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, webApplicationSchema, breadcrumbSchema } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={webApplicationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
        ])}
      />
      <LandingHero />
      <LandingFeatures />
      <HeroBackgroundImageSection />
      <LandingHowItWorks />
      <LandingCTA />
      <Footer />
    </>
  );
}
