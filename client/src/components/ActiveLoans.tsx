import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  nextPaymentDate: string | null;
  totalRepaid: number;
}

interface ActiveLoansProps {
  loans: Loan[];
}

export default function ActiveLoans({ loans }: ActiveLoansProps) {
  const t = useTranslations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const displayedLoans = loans.slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl">{t.dashboard.activeLoans}</CardTitle>
        {loans.length > 3 && (
          <Button variant="ghost" size="sm" data-testid="button-view-all-loans">
            {t.loan.viewAll}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedLoans.map((loan) => {
          const progress = (loan.totalRepaid / loan.amount) * 100;
          return (
            <div
              key={loan.id}
              className="border rounded-md p-4 space-y-3 hover-elevate cursor-pointer"
              data-testid={`card-loan-${loan.id}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{t.loan.amount}</p>
                  <p className="text-2xl font-mono font-semibold">{formatCurrency(loan.amount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t.loan.interestRate}</p>
                  <p className="text-lg font-semibold">{loan.interestRate}%</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{t.loan.nextPayment}</span>
                  <span>{loan.nextPaymentDate}</span>
                </div>
                <Progress value={progress} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
