import Header from '@/components/Header';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';

export default function About() {
  const t = useTranslations();

  const stats = [
    { icon: Users, label: t.about.stats.clients, value: '10,000+' },
    { icon: TrendingUp, label: t.about.stats.loansProvided, value: '€500M+' },
    { icon: Award, label: t.about.stats.successRate, value: '98%' },
    { icon: Clock, label: t.about.stats.yearsExperience, value: '15+' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground">{t.about.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-transparent">
            <h2 className="text-3xl font-bold mb-6">{t.about.mission}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.about.missionText}
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
