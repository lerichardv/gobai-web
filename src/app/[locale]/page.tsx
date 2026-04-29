import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import AlliancesSection from '@/components/sections/AlliancesSection';
import DataSection from '@/components/sections/DataSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <AlliancesSection />
      <DataSection />
      <CallToActionSection />
    </main>
  );
}
