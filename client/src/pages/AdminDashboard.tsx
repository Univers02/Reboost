import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRightLeft, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  const { data: transfers, isLoading: transfersLoading } = useQuery({
    queryKey: ["/api/admin/transfers"],
  });

  const isLoading = statsLoading || usersLoading || transfersLoading;

  if (isLoading) {
    return (
      <div className="p-6" data-testid="loading-admin-dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const pendingUsers = Array.isArray(users) ? users.filter((u: any) => u.status === 'pending').length : 0;
  const totalVolume = Array.isArray(transfers) ? transfers.reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0) : 0;

  return (
    <div className="p-6 space-y-6" data-testid="page-admin-dashboard">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Console Admin</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Vue d'ensemble de la plateforme et gestion des utilisateurs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card data-testid="card-total-users">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-users">{(stats as any)?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground" data-testid="text-active-users">
              {(stats as any)?.activeUsers || 0} actifs, {pendingUsers} en attente
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-transfers">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferts</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-transfers">{(stats as any)?.totalTransfers || 0}</div>
            <p className="text-xs text-muted-foreground" data-testid="text-pending-transfers">
              {(stats as any)?.pendingTransfers || 0} en cours
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-loans">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prêts</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-loans">{(stats as any)?.totalLoans || 0}</div>
            <p className="text-xs text-muted-foreground" data-testid="text-active-loans">
              {(stats as any)?.activeLoans || 0} actifs
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-volume">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-volume">
              {totalVolume.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">Transferts totaux</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card data-testid="card-recent-users">
          <CardHeader>
            <CardTitle>Utilisateurs Récents</CardTitle>
            <CardDescription>Dernières inscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(users) && users.slice(0, 5).map((user: any) => (
                <div key={user.id} className="flex items-center justify-between" data-testid={`row-user-${user.id}`}>
                  <div>
                    <p className="font-medium" data-testid={`text-user-name-${user.id}`}>{user.fullName}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-user-email-${user.id}`}>{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                      data-testid={`badge-user-status-${user.id}`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-recent-transfers">
          <CardHeader>
            <CardTitle>Transferts Récents</CardTitle>
            <CardDescription>Dernières opérations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(transfers) && transfers.slice(0, 5).map((transfer: any) => (
                <div key={transfer.id} className="flex items-center justify-between" data-testid={`row-transfer-${transfer.id}`}>
                  <div>
                    <p className="font-medium" data-testid={`text-transfer-recipient-${transfer.id}`}>{transfer.recipient}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-transfer-user-${transfer.id}`}>{transfer.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium" data-testid={`text-transfer-amount-${transfer.id}`}>
                      {parseFloat(transfer.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        transfer.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                        transfer.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                        transfer.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                      data-testid={`badge-transfer-status-${transfer.id}`}
                    >
                      {transfer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
