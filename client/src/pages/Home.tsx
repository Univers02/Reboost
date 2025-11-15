import HeroCarousel from '@/components/HeroCarousel';
import Header from '@/components/Header';
import StatsSection from '@/components/premium/StatsSection';
import StorytellingSection from '@/components/premium/StorytellingSection';
import ExpertisesModern from '@/components/premium/ExpertisesModern';
import TimelineSection from '@/components/premium/TimelineSection';
import TestimonialsSlider from '@/components/premium/TestimonialsSlider';
import BankingSecurity from '@/components/premium/BankingSecurity';
import FinalCTASection from '@/components/premium/FinalCTASection';
import FooterPremium from '@/components/premium/FooterPremium';
import SEO from '@/components/SEO';
import { organizationSchema, websiteSchema } from '@/lib/seo-data';
import { getKeywordsByPage } from '@/lib/seo-keywords';
import { useTranslations } from '@/lib/i18n';

export default function Home() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t.seo.home.title}
        description={t.seo.home.description}
        keywords={getKeywordsByPage('home')}
        path="/"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <Header />
      
      {/* Hero section préservée */}
      <HeroCarousel />
      
      {/* Design Fintech 2025 Premium */}
      <StatsSection />
      <StorytellingSection />
      <ExpertisesModern />
      <TimelineSection />
      <TestimonialsSlider />
      <BankingSecurity />
      <FinalCTASection />
      
      <FooterPremium />
    </div>
  );
}
