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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Wallet, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function AdminLoans() {
  const { toast } = useToast();
  const [approveReason, setApproveReason] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [deleteReason, setDeleteReason] = useState("");

  const { data: loans, isLoading } = useQuery({
    queryKey: ["/api/admin/loans"],
  });

  const approveLoanMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      return await apiRequest("POST", `/api/admin/loans/${id}/approve`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/loans"] });
      toast({
        title: "Prêt approuvé",
        description: "Le prêt a été approuvé avec succès. Le contrat a été généré.",
      });
      setApproveReason("");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'approuver le prêt",
        variant: "destructive",
      });
    },
  });

  const rejectLoanMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      return await apiRequest("POST", `/api/admin/loans/${id}/reject`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/loans"] });
      toast({
        title: "Prêt rejeté",
        description: "Le prêt a été rejeté avec succès",
      });
      setRejectReason("");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de rejeter le prêt",
        variant: "destructive",
      });
    },
  });

  const disburseFundsMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("POST", `/api/admin/loans/${id}/disburse`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/loans"] });
      toast({
        title: "Fonds débloqués",
        description: "Les fonds ont été débloqués avec succès. L'utilisateur a été notifié.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de débloquer les fonds",
        variant: "destructive",
      });
    },
  });

  const deleteLoanMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      return await apiRequest("DELETE", `/api/admin/loans/${id}`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/loans"] });
      toast({
        title: "Prêt supprimé",
        description: "Le prêt a été supprimé avec succès",
      });
      setDeleteReason("");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le prêt",
        variant: "destructive",
      });
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'approved':
        return 'secondary';
      case 'signed':
        return 'outline';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'En attente',
      'approved': 'Approuvé',
      'signed': 'Signé',
      'active': 'Actif',
      'rejected': 'Refusé',
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return (
      <div className="p-6" data-testid="loading-admin-loans">
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
    <div className="p-6 space-y-6" data-testid="page-admin-loans">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Gestion des Prêts</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Gérer toutes les demandes de prêts de la plateforme
        </p>
      </div>

      <Card data-testid="card-loans-table">
        <CardHeader>
          <CardTitle>Tous les Prêts</CardTitle>
          <CardDescription>Liste complète des demandes de prêts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Taux</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Contrat</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(loans) && loans.map((loan: any) => (
                <TableRow key={loan.id} data-testid={`row-loan-${loan.id}`}>
                  <TableCell className="font-medium" data-testid={`text-loan-user-${loan.id}`}>
                    {loan.userName}
                  </TableCell>
                  <TableCell data-testid={`text-loan-type-${loan.id}`}>{loan.loanType}</TableCell>
                  <TableCell data-testid={`text-loan-amount-${loan.id}`}>
                    {parseFloat(loan.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </TableCell>
                  <TableCell data-testid={`text-loan-rate-${loan.id}`}>{loan.interestRate}%</TableCell>
                  <TableCell data-testid={`text-loan-duration-${loan.id}`}>{loan.duration} mois</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(loan.status)}
                      data-testid={`badge-loan-status-${loan.id}`}
                    >
                      {getStatusText(loan.status)}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`text-loan-contract-${loan.id}`}>
                    {loan.signedContractUrl ? '✅ Signé' : loan.contractUrl ? '📄 Généré' : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {loan.status === 'pending' && (
                        <>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                data-testid={`button-approve-${loan.id}`}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approuver
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Approuver le prêt</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action approuvera le prêt de {parseFloat(loan.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} pour {loan.userName} et générera le contrat.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`approve-reason-${loan.id}`}>Raison de l'approbation</Label>
                                  <Textarea
                                    id={`approve-reason-${loan.id}`}
                                    value={approveReason}
                                    onChange={(e) => setApproveReason(e.target.value)}
                                    placeholder="Ex: Dossier complet et solvabilité vérifiée"
                                    data-testid={`input-approve-reason-${loan.id}`}
                                  />
                                </div>
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setApproveReason("")}>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => approveLoanMutation.mutate({ id: loan.id, reason: approveReason })}
                                  disabled={!approveReason || approveLoanMutation.isPending}
                                  data-testid={`button-confirm-approve-${loan.id}`}
                                >
                                  Approuver
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                data-testid={`button-reject-${loan.id}`}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rejeter
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Rejeter le prêt</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action rejettera définitivement le prêt. L'utilisateur sera notifié.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`reject-reason-${loan.id}`}>Raison du rejet</Label>
                                  <Textarea
                                    id={`reject-reason-${loan.id}`}
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Ex: Revenus insuffisants"
                                    data-testid={`input-reject-reason-${loan.id}`}
                                  />
                                </div>
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setRejectReason("")}>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => rejectLoanMutation.mutate({ id: loan.id, reason: rejectReason })}
                                  disabled={!rejectReason || rejectLoanMutation.isPending}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  data-testid={`button-confirm-reject-${loan.id}`}
                                >
                                  Rejeter
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}

                      {loan.status === 'signed' && loan.signedContractUrl && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                              data-testid={`button-disburse-${loan.id}`}
                            >
                              <Wallet className="h-4 w-4 mr-1" />
                              Débloquer les fonds
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Débloquer les fonds</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action débloquera les fonds de {parseFloat(loan.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} pour {loan.userName}. Le prêt passera en statut actif et l'utilisateur pourra effectuer des transferts.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => disburseFundsMutation.mutate(loan.id)}
                                disabled={disburseFundsMutation.isPending}
                                data-testid={`button-confirm-disburse-${loan.id}`}
                              >
                                Débloquer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            data-testid={`button-delete-${loan.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer le prêt</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action supprimera le prêt de manière définitive.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`delete-reason-${loan.id}`}>Raison de la suppression</Label>
                              <Input
                                id={`delete-reason-${loan.id}`}
                                value={deleteReason}
                                onChange={(e) => setDeleteReason(e.target.value)}
                                placeholder="Raison obligatoire"
                                data-testid={`input-delete-reason-${loan.id}`}
                              />
                            </div>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteReason("")}>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteLoanMutation.mutate({ id: loan.id, reason: deleteReason })}
                              disabled={!deleteReason || deleteLoanMutation.isPending}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              data-testid={`button-confirm-delete-${loan.id}`}
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
