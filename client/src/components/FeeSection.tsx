import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n';
import { Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Fee {
  id: string;
  feeType: string;
  reason: string;
  amount: number;
  createdAt: string | null;
  category: 'loan' | 'transfer' | 'account';
}

interface FeeSectionProps {
  fees: Fee[];
}

export default function FeeSection({ fees }: FeeSectionProps) {
  const t = useTranslations();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    loan: true,
    transfer: true,
    account: true,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const categorizedFees = {
    loan: fees.filter((f) => f.category === 'loan'),
    transfer: fees.filter((f) => f.category === 'transfer'),
    account: fees.filter((f) => f.category === 'account'),
  };

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);

  const categoryLabels = {
    loan: t.fee.loanFees,
    transfer: t.fee.transferFees,
    account: t.fee.accountFees,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl">{t.dashboard.fees}</CardTitle>
        <Button variant="outline" size="sm" data-testid="button-download-statement">
          <Download className="h-4 w-4 mr-2" />
          {t.fee.downloadStatement}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {(['loan', 'transfer', 'account'] as const).map((category) => {
          if (categorizedFees[category].length === 0) return null;

          return (
            <Collapsible
              key={category}
              open={openCategories[category]}
              onOpenChange={(open) =>
                setOpenCategories((prev) => ({ ...prev, [category]: open }))
              }
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover-elevate px-3 rounded-md">
                <span className="font-semibold">{categoryLabels[category]}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openCategories[category] ? 'transform rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pt-2">
                {categorizedFees[category].map((fee) => (
                  <div
                    key={fee.id}
                    className="flex justify-between items-start border rounded-md p-3 text-sm"
                    data-testid={`fee-${fee.id}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{fee.feeType}</p>
                      <p className="text-muted-foreground text-xs">{fee.reason}</p>
                      <p className="text-muted-foreground text-xs mt-1">{fee.createdAt}</p>
                    </div>
                    <p className="font-mono font-semibold">{formatCurrency(fee.amount)}</p>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-mono font-bold" data-testid="text-total-fees">
            {formatCurrency(totalFees)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
