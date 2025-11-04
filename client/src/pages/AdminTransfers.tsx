import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Ban } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminTransfers() {
  const { toast } = useToast();
  const { data: transfers, isLoading } = useQuery({
    queryKey: ["/api/admin/transfers"],
  });

  const updateTransferMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/transfers/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/transfers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Transfert mis à jour",
        description: "Le statut du transfert a été modifié avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le transfert",
        variant: "destructive",
      });
    },
  });

  const handleApprove = (transferId: string) => {
    updateTransferMutation.mutate({
      id: transferId,
      data: { status: "in-progress", approvedAt: new Date() },
    });
  };

  const handleSuspend = (transferId: string) => {
    updateTransferMutation.mutate({
      id: transferId,
      data: { status: "suspended", suspendedAt: new Date() },
    });
  };

  if (isLoading) {
    return (
      <div className="p-6" data-testid="loading-admin-transfers">
        <div className="h-8 w-64 bg-muted animate-pulse rounded mb-6" />
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-admin-transfers">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Gestion des Transferts</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Valider ou suspendre les demandes de transfert
        </p>
      </div>

      <Card data-testid="card-transfers-table">
        <CardHeader>
          <CardTitle>Tous les Transferts</CardTitle>
          <CardDescription>Liste complète des transferts de fonds</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Frais</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Codes</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(transfers) && transfers.map((transfer: any) => (
                <TableRow key={transfer.id} data-testid={`row-transfer-${transfer.id}`}>
                  <TableCell data-testid={`text-transfer-user-${transfer.id}`}>
                    <div>
                      <div className="font-medium">{transfer.userName}</div>
                      <div className="text-sm text-muted-foreground">{transfer.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium" data-testid={`text-transfer-recipient-${transfer.id}`}>
                    {transfer.recipient}
                  </TableCell>
                  <TableCell data-testid={`text-transfer-amount-${transfer.id}`}>
                    {parseFloat(transfer.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell data-testid={`text-transfer-fee-${transfer.id}`}>
                    {parseFloat(transfer.feeAmount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transfer.status === 'completed' ? 'default' :
                        transfer.status === 'in-progress' ? 'secondary' :
                        transfer.status === 'suspended' ? 'destructive' :
                        'outline'
                      }
                      data-testid={`badge-transfer-status-${transfer.id}`}
                    >
                      {transfer.status}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`text-transfer-progress-${transfer.id}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${transfer.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-sm">{transfer.progressPercent}%</span>
                    </div>
                  </TableCell>
                  <TableCell data-testid={`text-transfer-codes-${transfer.id}`}>
                    {transfer.codesValidated}/{transfer.requiredCodes}
                  </TableCell>
                  <TableCell data-testid={`text-transfer-date-${transfer.id}`}>
                    {new Date(transfer.createdAt).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {transfer.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(transfer.id)}
                          disabled={updateTransferMutation.isPending}
                          data-testid={`button-approve-${transfer.id}`}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                      )}
                      {(transfer.status === 'pending' || transfer.status === 'in-progress') && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleSuspend(transfer.id)}
                          disabled={updateTransferMutation.isPending}
                          data-testid={`button-suspend-${transfer.id}`}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspendre
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
