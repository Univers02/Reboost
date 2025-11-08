import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/lib/i18n';

interface BalanceOverviewProps {
  currentBalance: number;
  activeLoansCount: number;
  totalBorrowed: number;
  availableCredit: number;
  lastUpdated: string;
}

export default function BalanceOverview({
  currentBalance,
  activeLoansCount,
  totalBorrowed,
  availableCredit,
  lastUpdated,
}: BalanceOverviewProps) {
  const t = useTranslations();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <Card className="dashboard-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-[#64748B]">{t.dashboard.currentBalance}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-3xl font-bold text-[#1E293B]" data-testid="text-current-balance">
            {formatCurrency(currentBalance)}
          </p>
          <p className="text-xs text-[#94A3B8] mt-1">{lastUpdated}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E2E8F0]">
          <div>
            <p className="text-xs text-[#64748B] mb-1">{t.dashboard.activeLoans}</p>
            <p className="text-2xl font-bold text-[#1E293B]" data-testid="text-active-loans">
              {activeLoansCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#64748B] mb-1">{t.dashboard.totalBorrowed}</p>
            <p className="text-2xl font-bold text-[#1E293B]" data-testid="text-total-borrowed">
              0
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
