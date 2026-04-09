import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DataSection from '@/components/sections/DataSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <DataSection />
      <CallToActionSection />
    </main>
  );
}
