import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import heroImage1 from '@assets/generated_images/Professional_business_handshake_hero_a876f666.png';
import heroImage2 from '@assets/stock_images/professional_busines_f5be1226.jpg';
import heroImage3 from '@assets/stock_images/modern_office_team_c_5fe4ebf4.jpg';
import heroImage4 from '@assets/stock_images/professional_busines_02179932.jpg';
import heroImage5 from '@assets/stock_images/modern_office_team_c_c1f316eb.jpg';
import { Link } from 'wouter';

const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];

export default function Hero() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(
    () =>
      t.hero.slides.map((slide, index) => ({
        ...slide,
        image: heroImages[index],
      })),
    [t.hero.slides]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-primary/30 to-black/60" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <p className="text-white/95 text-sm font-medium tracking-wide">
            {t.hero.trustIndicator}
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 sm:mb-8 transition-all duration-700 leading-[1.1] tracking-tight">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 sm:mb-10 max-w-4xl mx-auto transition-all duration-700 font-light leading-relaxed">
          {slides[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-12 sm:mb-16 px-2">
          <Link href="/loan-request" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover-elevate active-elevate-2 gap-2 w-full sm:w-auto text-base sm:text-lg px-8 py-6 shadow-2xl shadow-primary/30 font-semibold"
              data-testid="button-request-loan"
            >
              {t.hero.cta1}
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-white/15 text-white border-white/40 hover:bg-white/25 w-full sm:w-auto text-base sm:text-lg px-8 py-6 shadow-xl font-semibold"
              data-testid="button-my-account"
            >
              {t.hero.cta2}
            </Button>
          </Link>
        </div>

        <div className="flex gap-3 justify-center mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'bg-white w-12 shadow-lg shadow-white/30'
                  : 'bg-white/40 hover:bg-white/70 w-8'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
              data-testid={`slide-indicator-${index}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-9 w-9 text-white/70" />
      </div>
    </section>
  );
}
