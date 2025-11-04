import Header from '@/components/Header';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { TrendingUp, CreditCard, Wrench, FileText } from 'lucide-react';

export default function Products() {
  const t = useTranslations();

  const products = [
    {
      icon: TrendingUp,
      title: t.products.termLoans,
      description: t.products.termLoansDesc,
      features: ['1-7 years', '€10,000 - €500,000', '3.5% - 8.5% APR'],
    },
    {
      icon: CreditCard,
      title: t.products.lineOfCredit,
      description: t.products.lineOfCreditDesc,
      features: ['Revolving', '€5,000 - €100,000', '4.0% - 9.0% APR'],
    },
    {
      icon: Wrench,
      title: t.products.equipmentFinancing,
      description: t.products.equipmentFinancingDesc,
      features: ['2-5 years', '€20,000 - €300,000', '3.9% - 7.5% APR'],
    },
    {
      icon: FileText,
      title: t.products.invoiceFactoring,
      description: t.products.invoiceFactoringDesc,
      features: ['30-90 days', '€5,000 - €250,000', '1-3% fee'],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.products.title}</h1>
            <p className="text-xl text-muted-foreground">{t.products.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Card key={index} className="p-8">
                  <Icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard" className="block">
                    <Button className="w-full">{t.hero.cta1}</Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
