import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function AdminSettings() {
  const { toast } = useToast();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/admin/settings"],
  });

  const [transferFee, setTransferFee] = useState(25);
  const [minCodes, setMinCodes] = useState(1);
  const [maxCodes, setMaxCodes] = useState(3);
  const [defaultCodes, setDefaultCodes] = useState(2);
  const [threshold, setThreshold] = useState(50000);

  useEffect(() => {
    if (settings && Array.isArray(settings)) {
      const feeSetting = settings.find((s: any) => s.settingKey === "default_transfer_fee");
      const codesSettings = settings.find((s: any) => s.settingKey === "validation_codes_count");
      const thresholdSetting = settings.find((s: any) => s.settingKey === "validation_code_amount_threshold");

      if (feeSetting) setTransferFee(feeSetting.settingValue.amount);
      if (codesSettings) {
        setMinCodes(codesSettings.settingValue.min);
        setMaxCodes(codesSettings.settingValue.max);
        setDefaultCodes(codesSettings.settingValue.default);
      }
      if (thresholdSetting) setThreshold(thresholdSetting.settingValue.amount);
    }
  }, [settings]);

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      return await apiRequest(`/api/admin/settings/${key}`, "PUT", { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      toast({
        title: "Paramètres mis à jour",
        description: "Les modifications ont été enregistrées avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les paramètres",
        variant: "destructive",
      });
    },
  });

  const handleSaveTransferFee = () => {
    updateSettingMutation.mutate({
      key: "default_transfer_fee",
      value: { amount: transferFee, currency: "EUR" },
    });
  };

  const handleSaveCodeSettings = () => {
    updateSettingMutation.mutate({
      key: "validation_codes_count",
      value: { min: minCodes, max: maxCodes, default: defaultCodes },
    });
  };

  const handleSaveThreshold = () => {
    updateSettingMutation.mutate({
      key: "validation_code_amount_threshold",
      value: { amount: threshold, currency: "EUR" },
    });
  };

  if (isLoading) {
    return (
      <div className="p-6" data-testid="loading-admin-settings">
        <div className="h-8 w-64 bg-muted animate-pulse rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 w-48 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-admin-settings">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Paramètres</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Configurer les frais et les codes de validation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card data-testid="card-transfer-fee">
          <CardHeader>
            <CardTitle>Frais de Transfert</CardTitle>
            <CardDescription>Montant des frais par défaut pour les transferts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transfer-fee">Montant des frais (€)</Label>
              <Input
                id="transfer-fee"
                type="number"
                value={transferFee}
                onChange={(e) => setTransferFee(parseFloat(e.target.value))}
                min={0}
                step={0.01}
                data-testid="input-transfer-fee"
              />
            </div>
            <Button
              onClick={handleSaveTransferFee}
              disabled={updateSettingMutation.isPending}
              data-testid="button-save-transfer-fee"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </CardContent>
        </Card>

        <Card data-testid="card-validation-threshold">
          <CardHeader>
            <CardTitle>Seuil de Validation</CardTitle>
            <CardDescription>Montant déclenchant plusieurs codes de validation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="threshold">Montant seuil (€)</Label>
              <Input
                id="threshold"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                min={0}
                step={1000}
                data-testid="input-threshold"
              />
            </div>
            <Button
              onClick={handleSaveThreshold}
              disabled={updateSettingMutation.isPending}
              data-testid="button-save-threshold"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2" data-testid="card-validation-codes">
          <CardHeader>
            <CardTitle>Codes de Validation</CardTitle>
            <CardDescription>Configuration du nombre de codes requis pour la validation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="min-codes">Minimum</Label>
                <Input
                  id="min-codes"
                  type="number"
                  value={minCodes}
                  onChange={(e) => setMinCodes(parseInt(e.target.value))}
                  min={1}
                  max={5}
                  data-testid="input-min-codes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-codes">Par défaut</Label>
                <Input
                  id="default-codes"
                  type="number"
                  value={defaultCodes}
                  onChange={(e) => setDefaultCodes(parseInt(e.target.value))}
                  min={minCodes}
                  max={maxCodes}
                  data-testid="input-default-codes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-codes">Maximum</Label>
                <Input
                  id="max-codes"
                  type="number"
                  value={maxCodes}
                  onChange={(e) => setMaxCodes(parseInt(e.target.value))}
                  min={1}
                  max={5}
                  data-testid="input-max-codes"
                />
              </div>
            </div>
            <Button
              onClick={handleSaveCodeSettings}
              disabled={updateSettingMutation.isPending}
              data-testid="button-save-codes"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
