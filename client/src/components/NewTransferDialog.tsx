import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { getApiUrl } from '@/lib/queryClient';

interface NewTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewTransferDialog({ open, onOpenChange }: NewTransferDialogProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: '',
    recipient: '',
  });

  const createTransferMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(getApiUrl('/api/transfers'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to create transfer');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['/api/transfers'] });
      toast({
        title: 'Transfert initié',
        description: 'Votre demande de transfert a été créée avec succès.',
      });
      onOpenChange(false);
      setFormData({ amount: '', recipient: '' });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le transfert.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTransferMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.dashboard.transferFunds}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinataire</Label>
            <Input
              id="recipient"
              type="text"
              placeholder="Nom de l'entreprise ou du bénéficiaire"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Montant (€)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="50000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div className="bg-muted p-4 rounded-md text-sm">
            <p className="text-muted-foreground">
              Des frais de transfert de 25€ seront appliqués. Votre transfert sera traité dans les 2-3 jours ouvrables.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={createTransferMutation.isPending}>
              {createTransferMutation.isPending ? 'Création...' : 'Créer le transfert'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
