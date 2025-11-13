import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/lib/i18n';
import { FileText, Download, Upload, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { SignedContractUpload } from '@/components/SignedContractUpload';
import { getApiUrl } from '@/lib/queryClient';

interface Loan {
  id: string;
  userId: string;
  amount: string;
  interestRate: string;
  duration: number;
  status: string;
  contractStatus: string;
  contractUrl: string | null;
  signedContractUrl: string | null;
  approvedAt: string | null;
  createdAt: string;
}

export default function Contracts() {
  const t = useTranslations();
  const [uploadingLoanId, setUploadingLoanId] = useState<string | null>(null);

  const { data: loans, isLoading } = useQuery<Loan[]>({
    queryKey: ['/api/loans'],
  });

  const contractsToSign = loans?.filter(
    loan => loan.status === 'approved' && 
    loan.contractStatus === 'awaiting_user_signature' &&
    loan.contractUrl
  ) || [];

  const contractsAwaitingReview = loans?.filter(
    loan => loan.contractStatus === 'awaiting_admin_review'
  ) || [];

  const contractsSigned = loans?.filter(
    loan => loan.contractStatus === 'signed' || 
    (loan.status === 'active' && loan.signedContractUrl)
  ) || [];

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(amount));
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleDownloadContract = async (loanId: string) => {
    try {
      window.open(getApiUrl(`/api/loans/${loanId}/contract/download`), '_blank');
    } catch (error) {
      console.error('Error downloading contract:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          {t.contracts?.title || 'Gestion des Contrats'}
        </h1>
        <p className="text-muted-foreground">
          {t.contracts?.description || 'Téléchargez, signez et renvoyez vos contrats de prêt en toute sécurité.'}
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full" data-testid="tabs-contracts">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl">
          <TabsTrigger value="pending" data-testid="tab-pending-contracts">
            <AlertCircle className="h-4 w-4 mr-2" />
            {t.contracts?.tabPending || 'À signer'}
            {contractsToSign.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {contractsToSign.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="review" data-testid="tab-review-contracts">
            <Clock className="h-4 w-4 mr-2" />
            {t.contracts?.tabReview || 'En vérification'}
            {contractsAwaitingReview.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contractsAwaitingReview.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed-contracts">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {t.contracts?.tabCompleted || 'Terminés'}
            <Badge variant="secondary" className="ml-2">
              {contractsSigned.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-6">
          {contractsToSign.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contractsToSign.map((loan) => (
                <Card key={loan.id} data-testid={`card-contract-pending-${loan.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">
                          {t.contracts?.loanNumber || 'Prêt'} #{loan.id.substring(0, 8)}
                        </CardTitle>
                        <CardDescription>
                          {t.contracts?.approvedOn || 'Approuvé le'} {formatDate(loan.approvedAt)}
                        </CardDescription>
                      </div>
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {t.contracts?.actionRequired || 'Action requise'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {t.loan?.amount || 'Montant'}
                        </p>
                        <p className="text-lg font-semibold">{formatCurrency(loan.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {t.loan?.interestRate || 'Taux d\'intérêt'}
                        </p>
                        <p className="text-lg font-semibold">{loan.interestRate}%</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-md space-y-3">
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium mb-1">
                            {t.contracts?.step1 || '1. Télécharger le contrat'}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t.contracts?.step1Description || 'Téléchargez et lisez attentivement votre contrat de prêt.'}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadContract(loan.id)}
                            data-testid={`button-download-contract-${loan.id}`}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {t.contracts?.downloadContract || 'Télécharger le contrat'}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-3 border-t">
                        <Upload className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium mb-1">
                            {t.contracts?.step2 || '2. Signer et renvoyer'}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t.contracts?.step2Description || 'Signez le contrat et renvoyez-le au format PDF.'}
                          </p>
                          <div className="max-w-xs">
                            <SignedContractUpload 
                              loanId={loan.id} 
                              loanAmount={loan.amount}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium mb-2">
                  {t.contracts?.noPendingContracts || 'Aucun contrat en attente'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.contracts?.noPendingContractsDescription || 'Tous vos contrats ont été signés et envoyés.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="review" className="mt-6 space-y-6">
          {contractsAwaitingReview.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contractsAwaitingReview.map((loan) => (
                <Card key={loan.id} data-testid={`card-contract-review-${loan.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">
                          {t.contracts?.loanNumber || 'Prêt'} #{loan.id.substring(0, 8)}
                        </CardTitle>
                        <CardDescription>
                          {formatCurrency(loan.amount)} • {loan.interestRate}% • {loan.duration} mois
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        {t.contracts?.inReview || 'En vérification'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md">
                      <p className="text-sm">
                        {t.contracts?.reviewMessage || 'Votre contrat signé a été reçu et est en cours de vérification par notre équipe. Vous serez notifié dès que les fonds seront débloqués.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium mb-2">
                  {t.contracts?.noReviewContracts || 'Aucun contrat en vérification'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.contracts?.noReviewContractsDescription || 'Aucun contrat n\'est actuellement en attente de vérification.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-6">
          {contractsSigned.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contractsSigned.map((loan) => (
                <Card key={loan.id} data-testid={`card-contract-completed-${loan.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">
                          {t.contracts?.loanNumber || 'Prêt'} #{loan.id.substring(0, 8)}
                        </CardTitle>
                        <CardDescription>
                          {formatCurrency(loan.amount)} • {loan.interestRate}% • {loan.duration} mois
                        </CardDescription>
                      </div>
                      <Badge variant="default">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {t.contracts?.signed || 'Signé'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {loan.contractUrl && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleDownloadContract(loan.id)}
                        data-testid={`button-download-original-${loan.id}`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t.contracts?.downloadOriginal || 'Télécharger le contrat original'}
                      </Button>
                    )}
                    {loan.signedContractUrl && (
                      <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-md">
                        <p className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          {t.contracts?.signedSuccess || 'Contrat signé et validé avec succès'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium mb-2">
                  {t.contracts?.noCompletedContracts || 'Aucun contrat signé'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.contracts?.noCompletedContractsDescription || 'Vos contrats signés apparaîtront ici.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
