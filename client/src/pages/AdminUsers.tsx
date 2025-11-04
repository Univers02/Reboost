import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Ban, Trash2, CheckCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const { toast } = useToast();
  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/users/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Utilisateur mis à jour",
        description: "Le statut de l'utilisateur a été modifié avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'utilisateur",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/users/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    },
  });

  const handleSuspend = (userId: string) => {
    updateUserMutation.mutate({ id: userId, data: { status: "suspended" } });
  };

  const handleActivate = (userId: string) => {
    updateUserMutation.mutate({ id: userId, data: { status: "active" } });
  };

  const handleDelete = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  if (isLoading) {
    return (
      <div className="p-6" data-testid="loading-admin-users">
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
    <div className="p-6 space-y-6" data-testid="page-admin-users">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Gestion des Utilisateurs</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Gérer tous les comptes utilisateurs de la plateforme
        </p>
      </div>

      <Card data-testid="card-users-table">
        <CardHeader>
          <CardTitle>Tous les Utilisateurs</CardTitle>
          <CardDescription>Liste complète des comptes utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom Complet</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>KYC</TableHead>
                <TableHead>Solde</TableHead>
                <TableHead>Prêts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(users) && users.map((user: any) => (
                <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                  <TableCell className="font-medium" data-testid={`text-user-name-${user.id}`}>
                    {user.fullName}
                  </TableCell>
                  <TableCell data-testid={`text-user-email-${user.id}`}>{user.email}</TableCell>
                  <TableCell data-testid={`text-user-phone-${user.id}`}>{user.phone || '-'}</TableCell>
                  <TableCell data-testid={`text-user-type-${user.id}`}>{user.accountType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'active' ? 'default' :
                        user.status === 'suspended' ? 'destructive' : 'secondary'
                      }
                      data-testid={`badge-user-status-${user.id}`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.kycStatus === 'approved' ? 'default' : 'secondary'}
                      data-testid={`badge-user-kyc-${user.id}`}
                    >
                      {user.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`text-user-balance-${user.id}`}>
                    {user.balance?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || '0 €'}
                  </TableCell>
                  <TableCell data-testid={`text-user-loans-${user.id}`}>{user.loansCount || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {user.status === 'active' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspend(user.id)}
                          disabled={updateUserMutation.isPending}
                          data-testid={`button-suspend-${user.id}`}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspendre
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivate(user.id)}
                          disabled={updateUserMutation.isPending}
                          data-testid={`button-activate-${user.id}`}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Activer
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={deleteUserMutation.isPending}
                            data-testid={`button-delete-${user.id}`}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Cela supprimera définitivement le compte de{' '}
                              <strong>{user.fullName}</strong> et toutes ses données associées.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-testid={`button-cancel-delete-${user.id}`}>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(user.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              data-testid={`button-confirm-delete-${user.id}`}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
