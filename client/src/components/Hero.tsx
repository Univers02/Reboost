import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calculator, Clock, Shield, TrendingUp } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import { Link } from 'wouter';

export default function Hero() {
  const t = useTranslations();
  const [loanAmount, setLoanAmount] = useState('50000');
  const [loanDuration, setLoanDuration] = useState('48');

  const calculateMonthlyPayment = () => {
    const amount = parseInt(loanAmount);
    const months = parseInt(loanDuration);
    const interestRate = 0.045;
    const monthlyRate = interestRate / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </div>
              <span className="text-sm font-medium">Plus de 15 000 clients satisfaits nous font confiance</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Réalisez vos projets avec{' '}
                <span className="block text-white">
                  Altus Finance Group
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 font-light max-w-xl leading-relaxed">
                Solutions de financement pour particuliers et professionnels - Taux compétitifs et processus transparent
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-start gap-2">
                <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Réponse en 24h</h3>
              </div>
              
              <div className="flex flex-col items-start gap-2">
                <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Offres Compétitives</h3>
              </div>
              
              <div className="flex flex-col items-start gap-2">
                <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Données Protégées</h3>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/loan-request">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-6 bg-white text-blue-600 hover:bg-white/90 shadow-2xl font-semibold"
                  data-testid="button-request-loan"
                >
                  Faire une demande
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 py-6 backdrop-blur-sm bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold"
                  data-testid="button-learn-more"
                >
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>

          <Card className="bg-white shadow-2xl border-0 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calculator className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Calculez votre budget
                  </h3>
                  <p className="text-sm text-gray-600">
                    Obtenez une estimation instantanée
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="loan-amount" className="text-sm font-semibold text-gray-900">
                    Montant du prêt
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">€</span>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="pl-10 h-14 text-lg font-semibold border-gray-300 focus:border-blue-500"
                      min="3000"
                      max="400000"
                      step="1000"
                      data-testid="input-loan-amount"
                    />
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="400000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    data-testid="slider-loan-amount"
                  />
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>€3,000</span>
                    <span>€400,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="loan-duration" className="text-sm font-semibold text-gray-900">
                    Durée (mois)
                  </Label>
                  <Select value={loanDuration} onValueChange={setLoanDuration}>
                    <SelectTrigger className="h-14 text-lg border-gray-300 focus:border-blue-500" data-testid="select-loan-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 mois</SelectItem>
                      <SelectItem value="24">24 mois</SelectItem>
                      <SelectItem value="36">36 mois</SelectItem>
                      <SelectItem value="48">48 mois</SelectItem>
                      <SelectItem value="60">60 mois</SelectItem>
                      <SelectItem value="72">72 mois</SelectItem>
                      <SelectItem value="84">84 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-blue-100">
                      Paiement mensuel
                    </span>
                    <div className="text-right">
                      <div className="text-4xl font-bold">
                        €{calculateMonthlyPayment()}
                      </div>
                      <div className="text-xs text-blue-100">
                        par mois
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/loan-request" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 h-14 text-lg font-semibold shadow-lg"
                    data-testid="button-apply-now"
                  >
                    Faire une demande
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-gray-500">
                  Demande gratuite - Sans engagement - Processus confidentiel
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
