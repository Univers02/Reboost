import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewLoanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewLoanDialog({ open, onOpenChange }: NewLoanDialogProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: '',
    interestRate: '',
    duration: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const amount = parseFloat(formData.amount);
    if (!formData.amount || amount <= 0) {
      newErrors.amount = 'Le montant doit être supérieur à 0';
    } else if (amount > 1000000) {
      newErrors.amount = 'Le montant ne peut pas dépasser 1 000 000 €';
    }

    const rate = parseFloat(formData.interestRate);
    if (!formData.interestRate || rate < 0) {
      newErrors.interestRate = 'Le taux doit être positif';
    } else if (rate > 20) {
      newErrors.interestRate = 'Le taux ne peut pas dépasser 20%';
    }

    const duration = parseInt(formData.duration);
    if (!formData.duration || duration <= 0) {
      newErrors.duration = 'La durée doit être supérieure à 0';
    } else if (duration > 360) {
      newErrors.duration = 'La durée ne peut pas dépasser 360 mois';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createLoanMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create loan');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['/api/loans'] });
      toast({
        title: 'Demande de prêt envoyée',
        description: 'Votre demande de prêt a été soumise avec succès.',
      });
      onOpenChange(false);
      setFormData({ amount: '', interestRate: '', duration: '' });
      setErrors({});
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la demande de prêt.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createLoanMutation.mutate(formData);
    }
  };

  const calculateMonthlyPayment = () => {
    const amount = parseFloat(formData.amount);
    const rate = parseFloat(formData.interestRate) / 100 / 12;
    const duration = parseInt(formData.duration);
    
    if (amount > 0 && rate >= 0 && duration > 0) {
      if (rate === 0) {
        return amount / duration;
      }
      return amount * (rate * Math.pow(1 + rate, duration)) / (Math.pow(1 + rate, duration) - 1);
    }
    return 0;
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.dashboard.newLoan}</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire pour soumettre une nouvelle demande de prêt
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant du prêt (€)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100000"
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
                setErrors({ ...errors, amount: '' });
              }}
              className={errors.amount ? 'border-destructive' : ''}
              data-testid="input-loan-amount"
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Taux d'intérêt annuel (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="3.5"
              value={formData.interestRate}
              onChange={(e) => {
                setFormData({ ...formData, interestRate: e.target.value });
                setErrors({ ...errors, interestRate: '' });
              }}
              className={errors.interestRate ? 'border-destructive' : ''}
              data-testid="input-loan-interest-rate"
            />
            {errors.interestRate && (
              <p className="text-sm text-destructive">{errors.interestRate}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Durée (mois)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="60"
              value={formData.duration}
              onChange={(e) => {
                setFormData({ ...formData, duration: e.target.value });
                setErrors({ ...errors, duration: '' });
              }}
              className={errors.duration ? 'border-destructive' : ''}
              data-testid="input-loan-duration"
            />
            {errors.duration && (
              <p className="text-sm text-destructive">{errors.duration}</p>
            )}
          </div>

          {monthlyPayment > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Mensualité estimée:</strong>{' '}
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(monthlyPayment)}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                onOpenChange(false);
                setFormData({ amount: '', interestRate: '', duration: '' });
                setErrors({});
              }}
              data-testid="button-cancel-loan"
            >
              Annuler
            </Button>
            <Button type="submit" disabled={createLoanMutation.isPending} data-testid="button-submit-loan">
              {createLoanMutation.isPending ? 'Envoi...' : 'Soumettre la demande'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
