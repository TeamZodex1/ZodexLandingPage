import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '@components/HeroSection';
import ServicesSection from '@components/ServicesSection';
import FounderSection from '@components/FounderSection';
import PortfolioSection from '@components/PortfolioSection';
import ContactSection from '@components/ContactSection';
import { servicesData, websiteProjects, appProjects } from '@data/initialData';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo && location.state.scrollTo !== 'portfolio') {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.state]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection services={servicesData} />
      <FounderSection />
      <PortfolioSection websiteProjects={websiteProjects} appProjects={appProjects} />
      <ContactSection />
    </main>
  );
}