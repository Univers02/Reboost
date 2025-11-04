import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminReports() {
  const { data: auditLogs, isLoading: logsLoading } = useQuery({
    queryKey: ["/api/admin/audit-logs"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: transfers } = useQuery({
    queryKey: ["/api/admin/transfers"],
  });

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      approve_transfer: "Transfert approuvé",
      suspend_transfer: "Transfert suspendu",
      update_settings: "Paramètres modifiés",
      update_user: "Utilisateur modifié",
      delete_user: "Utilisateur supprimé",
      update_transfer: "Transfert modifié",
    };
    return labels[action] || action;
  };

  if (logsLoading) {
    return (
      <div className="p-6" data-testid="loading-admin-reports">
        <div className="h-8 w-64 bg-muted animate-pulse rounded mb-6" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 w-48 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const completedTransfers = Array.isArray(transfers) ? transfers.filter((t: any) => t.status === 'completed') : [];
  const totalVolume = completedTransfers.reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0);
  const totalFees = completedTransfers.reduce((sum: number, t: any) => sum + parseFloat(t.feeAmount), 0);

  return (
    <div className="p-6 space-y-6" data-testid="page-admin-reports">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Rapports et Activités</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Historique des activités et statistiques de la plateforme
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card data-testid="card-completed-transfers">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transferts Complétés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-completed-transfers">
              {completedTransfers.length}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-volume">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-volume">
              {totalVolume.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-fees">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Frais Collectés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-fees">
              {totalFees.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-active-users">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-active-users">
              {(stats as any)?.activeUsers || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-audit-logs">
        <CardHeader>
          <CardTitle>Journal d'Audit</CardTitle>
          <CardDescription>Historique complet des actions administratives</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Détails</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(auditLogs) && auditLogs.map((log: any) => (
                  <TableRow key={log.id} data-testid={`row-audit-${log.id}`}>
                    <TableCell data-testid={`text-audit-date-${log.id}`}>
                      {new Date(log.createdAt).toLocaleString('fr-FR')}
                    </TableCell>
                    <TableCell className="font-medium" data-testid={`text-audit-action-${log.id}`}>
                      {getActionLabel(log.action)}
                    </TableCell>
                    <TableCell data-testid={`text-audit-type-${log.id}`}>{log.entityType}</TableCell>
                    <TableCell data-testid={`text-audit-details-${log.id}`}>
                      {log.metadata && (
                        <div className="text-sm text-muted-foreground">
                          {JSON.stringify(log.metadata).substring(0, 50)}...
                        </div>
                      )}
                    </TableCell>
                    <TableCell data-testid={`text-audit-ip-${log.id}`}>{log.ipAddress || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
