import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTranslations } from "@/lib/i18n";
import hero1 from "@assets/generated_images/Luxury_banking_office_interior_c438e2ad.png";
import hero2 from "@assets/generated_images/Executive_boardroom_financial_institution_69d8133b.png";
import hero3 from "@assets/generated_images/Financial_district_skyline_premium_61766895.png";

const slideImages = [hero1, hero2, hero3];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [, setLocation] = useLocation();
  const t = useTranslations();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % Math.min(t.hero.slides.length, slideImages.length));
    }, 6000);
    return () => clearInterval(timer);
  }, [t.hero.slides.length]);

  const currentSlides = t.hero.slides.slice(0, slideImages.length);

  return (
    <div className="relative h-[500px] md:h-[550px] w-full overflow-hidden">
      {/* Slides */}
      {currentSlides.map((_, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all ease-out
            ${i === index 
              ? "opacity-100 scale-100 translate-x-0 duration-1000" 
              : "opacity-0 scale-105 translate-x-8 duration-[2000ms]"
            }
          `}
        >
          <img
            src={slideImages[i]}
            alt={`Hero ${i + 1}`}
            className="h-full w-full object-cover"
          />

          {/* Gradient overlay - Premium banking colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f3b]/85 to-[#4b3bff]/45"></div>
        </div>
      ))}

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-24 text-white max-w-5xl z-10">
        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] animate-fade-in"
          data-testid="text-hero-title"
        >
          {t.hero.slides[index]?.title}
        </h1>

        <p 
          className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl animate-fade-in delay-300 leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          {t.hero.slides[index]?.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in delay-500">
          <button
            onClick={() => setLocation("/loan-request")}
            className="px-6 sm:px-7 py-3 rounded-lg bg-[#005DFF] font-semibold text-base shadow-lg
              hover:bg-[#0052E0] hover:shadow-[0_0_20px_rgba(0,93,255,0.4)]
              transition-all duration-300 transform hover:scale-105"
            data-testid="button-apply-loan"
          >
            {t.hero.cta1}
          </button>

          <button
            onClick={() => setLocation("/how-it-works")}
            className="px-6 sm:px-7 py-3 rounded-lg border-2 border-white/40 font-semibold text-base backdrop-blur-sm
              hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            data-testid="button-learn-more"
          >
            {t.hero.learnMore}
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {currentSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-500
              ${i === index 
                ? "w-12 bg-white" 
                : "w-2 bg-white/40 hover:bg-white/60"
              }
            `}
            aria-label={`Go to slide ${i + 1}`}
            data-testid={`indicator-slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
