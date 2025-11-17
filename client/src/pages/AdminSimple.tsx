import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Users, FileText, CheckCircle, XCircle, Ban, Trash2, LayoutDashboard, AlertCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type Section = "overview" | "loans" | "users";

export default function AdminSimple() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  
  // Dialog states
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [confirmContractDialogOpen, setConfirmContractDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  
  const [selectedLoanId, setSelectedLoanId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [approveReason, setApproveReason] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendUntil, setSuspendUntil] = useState("");

  // Data queries
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: loans, isLoading: loansLoading } = useQuery({
    queryKey: ["/api/admin/loans"],
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  // Mutations
  const approveLoanMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      return await apiRequest("POST", `/api/admin/loans/${id}/approve`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/loans"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Prêt approuvé",
        description: "Le contrat a été généré et envoyé à l'utilisateur",
      });
      setApproveDialogOpen(false);
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Prêt rejeté",
        description: "L'utilisateur a été notifié",
      });
      setRejectDialogOpen(false);
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

  const confirmContractMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("POST", `/api/admin/loans/${id}/confirm-contract`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/loans"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Contrat confirmé",
        description: "Les fonds sont disponibles et les codes ont été générés",
      });
      setConfirmContractDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de confirmer le contrat",
        variant: "destructive",
      });
    },
  });

  const suspendUserMutation = useMutation({
    mutationFn: async ({ id, until, reason }: { id: string; until: string; reason: string }) => {
      return await apiRequest("POST", `/api/admin/users/${id}/suspend`, { until, reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Utilisateur bloqué",
        description: "L'utilisateur a été bloqué avec succès",
      });
      setSuspendDialogOpen(false);
      setSuspendReason("");
      setSuspendUntil("");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de bloquer l'utilisateur",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé définitivement",
      });
      setDeleteUserDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    },
  });

  const unblockUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("POST", `/api/admin/users/${id}/unblock`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Utilisateur débloqué",
        description: "L'utilisateur peut à nouveau accéder à la plateforme",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de débloquer l'utilisateur",
        variant: "destructive",
      });
    },
  });

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; label: string }> = {
      pending_review: { variant: "outline", label: "En attente" },
      approved: { variant: "secondary", label: "Approuvé" },
      active: { variant: "default", label: "Actif" },
      rejected: { variant: "destructive", label: "Rejeté" },
      suspended: { variant: "destructive", label: "Bloqué" },
    };
    
    const config = statusConfig[status] || { variant: "outline", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getContractStatusBadge = (contractStatus: string | null) => {
    if (!contractStatus) return null;
    
    const statusConfig: Record<string, { variant: any; label: string }> = {
      awaiting_user_signature: { variant: "outline", label: "En attente signature" },
      awaiting_admin_review: { variant: "secondary", label: "Contrat à confirmer" },
      approved: { variant: "default", label: "Confirmé" },
    };
    
    const config = statusConfig[contractStatus] || { variant: "outline", label: contractStatus };
    return <Badge variant={config.variant} className="ml-2">{config.label}</Badge>;
  };

  // Filter loans
  const pendingLoans = Array.isArray(loans) ? loans.filter((l: any) => l.status === 'pending_review') : [];
  const awaitingContractConfirmation = Array.isArray(loans) ? loans.filter((l: any) => l.contractStatus === 'awaiting_admin_review') : [];

  // Render functions
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card data-testid="card-total-users">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats as any)?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(stats as any)?.activeUsers || 0} actifs
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-pending-loans">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes en attente</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingLoans.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              À examiner
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-pending-contracts">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats signés</CardTitle>
            <FileText className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{awaitingContractConfirmation.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              À confirmer
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions requises</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingLoans.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-md">
              <div>
                <p className="font-medium text-orange-900 dark:text-orange-100">
                  {pendingLoans.length} demande{pendingLoans.length > 1 ? 's' : ''} en attente
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Examiner et approuver/rejeter
                </p>
              </div>
              <Button onClick={() => setActiveSection("loans")} variant="outline">
                Voir
              </Button>
            </div>
          )}
          
          {awaitingContractConfirmation.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  {awaitingContractConfirmation.length} contrat{awaitingContractConfirmation.length > 1 ? 's' : ''} signé{awaitingContractConfirmation.length > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Confirmer pour débloquer les fonds
                </p>
              </div>
              <Button onClick={() => setActiveSection("loans")} variant="outline">
                Voir
              </Button>
            </div>
          )}

          {pendingLoans.length === 0 && awaitingContractConfirmation.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <p>Aucune action requise pour le moment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderLoans = () => (
    <div className="space-y-6">
      {pendingLoans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Demandes en attente ({pendingLoans.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLoans.map((loan: any) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.userName}</TableCell>
                    <TableCell>{parseFloat(loan.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                    <TableCell>{loan.loanType}</TableCell>
                    <TableCell>{new Date(loan.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => {
                            setSelectedLoanId(loan.id);
                            setApproveDialogOpen(true);
                          }}
                          data-testid={`button-approve-${loan.id}`}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedLoanId(loan.id);
                            setRejectDialogOpen(true);
                          }}
                          data-testid={`button-reject-${loan.id}`}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {awaitingContractConfirmation.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Contrats signés à confirmer ({awaitingContractConfirmation.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {awaitingContractConfirmation.map((loan: any) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.userName}</TableCell>
                    <TableCell>{parseFloat(loan.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                    <TableCell>
                      {getStatusBadge(loan.status)}
                      {getContractStatusBadge(loan.contractStatus)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => {
                          setSelectedLoanId(loan.id);
                          setConfirmContractDialogOpen(true);
                        }}
                        data-testid={`button-confirm-contract-${loan.id}`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirmer le contrat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {Array.isArray(loans) && loans.filter((l: any) => l.status === 'approved' || l.status === 'active').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tous les prêts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Contrat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan: any) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.userName}</TableCell>
                    <TableCell>{parseFloat(loan.amount).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                    <TableCell>{loan.loanType}</TableCell>
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>{getContractStatusBadge(loan.contractStatus)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderUsers = () => (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des utilisateurs</CardTitle>
      </CardHeader>
      <CardContent>
        {usersLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(users) && users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {user.status === 'suspended' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => unblockUserMutation.mutate(user.id)}
                          data-testid={`button-unblock-${user.id}`}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Débloquer
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setSuspendDialogOpen(true);
                          }}
                          data-testid={`button-suspend-${user.id}`}
                        >
                          <Ban className="w-4 h-4 mr-1" />
                          Bloquer
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setDeleteUserDialogOpen(true);
                        }}
                        data-testid={`button-delete-${user.id}`}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar vertical */}
      <div className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Admin</h1>
          <p className="text-sm text-muted-foreground">Espace administrateur</p>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Button
              variant={activeSection === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("overview")}
              data-testid="nav-overview"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Vue d'ensemble
            </Button>
            
            <Button
              variant={activeSection === "loans" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("loans")}
              data-testid="nav-loans"
            >
              <FileText className="w-4 h-4 mr-2" />
              Demandes de prêts
              {(pendingLoans.length + awaitingContractConfirmation.length) > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {pendingLoans.length + awaitingContractConfirmation.length}
                </Badge>
              )}
            </Button>
            
            <Button
              variant={activeSection === "users" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("users")}
              data-testid="nav-users"
            >
              <Users className="w-4 h-4 mr-2" />
              Utilisateurs
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {statsLoading || loansLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <>
              {activeSection === "overview" && renderOverview()}
              {activeSection === "loans" && renderLoans()}
              {activeSection === "users" && renderUsers()}
            </>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approuver la demande</DialogTitle>
            <DialogDescription>
              Le contrat sera automatiquement généré et envoyé à l'utilisateur
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optionnel)</label>
              <Textarea
                value={approveReason}
                onChange={(e) => setApproveReason(e.target.value)}
                placeholder="Ajouter des notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => approveLoanMutation.mutate({ id: selectedLoanId, reason: approveReason })}
              disabled={approveLoanMutation.isPending}
            >
              Approuver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter la demande</DialogTitle>
            <DialogDescription>
              L'utilisateur sera notifié du rejet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Raison du rejet *</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Expliquer pourquoi..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => rejectLoanMutation.mutate({ id: selectedLoanId, reason: rejectReason })}
              disabled={!rejectReason.trim() || rejectLoanMutation.isPending}
            >
              Rejeter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmContractDialogOpen} onOpenChange={setConfirmContractDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer le contrat signé</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action va :
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Rendre les fonds disponibles pour l'utilisateur</li>
                <li>Générer les codes de transfert</li>
                <li>Envoyer les codes par email à l'admin</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmContractMutation.mutate(selectedLoanId)}
              disabled={confirmContractMutation.isPending}
            >
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquer l'utilisateur</DialogTitle>
            <DialogDescription>
              L'utilisateur ne pourra plus accéder à la plateforme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bloquer jusqu'au *</label>
              <input
                type="date"
                value={suspendUntil}
                onChange={(e) => setSuspendUntil(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Raison *</label>
              <Textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Raison du blocage..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (suspendReason && suspendUntil) {
                  suspendUserMutation.mutate({
                    id: selectedUserId,
                    until: new Date(suspendUntil).toISOString(),
                    reason: suspendReason
                  });
                }
              }}
              disabled={!suspendReason.trim() || !suspendUntil || suspendUserMutation.isPending}
            >
              Bloquer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données de l'utilisateur seront supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserMutation.mutate(selectedUserId)}
              disabled={deleteUserMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
