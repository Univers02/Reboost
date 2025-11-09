import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Ban } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/lib/i18n";

export default function AdminTransfers() {
  const t = useTranslations();
  const { toast } = useToast();
  const { data: transfers, isLoading } = useQuery({
    queryKey: ["/api/admin/transfers"],
  });

  const updateTransferMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest("PATCH", `/api/admin/transfers/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/transfers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: t.admin.transfers.transferUpdated,
        description: t.admin.transfers.transferUpdatedDesc,
      });
    },
    onError: () => {
      toast({
        title: t.admin.common.messages.error,
        description: t.admin.common.messages.cannotUpdate,
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
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">{t.admin.transfers.title}</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          {t.admin.transfers.description}
        </p>
      </div>

      <Card data-testid="card-transfers-table">
        <CardHeader>
          <CardTitle>{t.admin.transfers.allTransfers}</CardTitle>
          <CardDescription>{t.admin.transfers.allTransfersDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.admin.common.labels.user}</TableHead>
                <TableHead>{t.admin.common.labels.recipient}</TableHead>
                <TableHead>{t.admin.common.labels.amount}</TableHead>
                <TableHead>{t.admin.common.labels.fees}</TableHead>
                <TableHead>{t.admin.common.labels.status}</TableHead>
                <TableHead>{t.admin.common.labels.progress}</TableHead>
                <TableHead>{t.admin.common.labels.codes}</TableHead>
                <TableHead>{t.admin.common.labels.date}</TableHead>
                <TableHead className="text-right">{t.admin.common.labels.actions}</TableHead>
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
                      {transfer.status === 'completed' ? t.admin.common.status.completed :
                       transfer.status === 'in-progress' ? t.admin.common.status.inProgress :
                       transfer.status === 'suspended' ? t.admin.common.status.suspended :
                       t.admin.common.status.pending}
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
                          {t.admin.common.actions.approve}
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
                          {t.admin.common.actions.suspend}
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
