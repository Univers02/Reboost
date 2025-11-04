import Header from '@/components/Header';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { FileText, Search, CheckCircle, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function HowItWorks() {
  const t = useTranslations();

  const steps = [
    {
      icon: FileText,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      step: '01',
    },
    {
      icon: Search,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      step: '02',
    },
    {
      icon: CheckCircle,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      step: '03',
    },
    {
      icon: Banknote,
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Desc,
      step: '04',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.howItWorks.title}</h1>
            <p className="text-xl text-muted-foreground">{t.howItWorks.subtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="p-8 relative">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                      {step.step}
                    </div>
                    <Icon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Link href="/dashboard">
                <Button size="lg">{t.hero.cta1}</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
