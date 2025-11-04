import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Building2, User, Mail, Lock, Phone, FileText, Hash } from 'lucide-react';

const signupSchema = z.object({
  accountType: z.enum(['personal', 'business']),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Le nom complet est requis'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  siret: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.accountType === 'business') {
    return !!data.companyName;
  }
  return true;
}, {
  message: 'Le nom de l\'entreprise est requis pour un compte professionnel',
  path: ['companyName'],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      accountType: 'personal',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      companyName: '',
      siret: '',
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const response = await apiRequest('POST', '/api/auth/signup', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Inscription réussie !',
        description: data.message,
      });
      setLocation('/login');
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Créer un compte Altus Group
          </CardTitle>
          <CardDescription className="text-base">
            Solutions de financement pour particuliers et professionnels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Type de compte</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setAccountType(value as 'personal' | 'business');
                        }}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="personal"
                            id="personal"
                            className="peer sr-only"
                            data-testid="radio-personal"
                          />
                          <Label
                            htmlFor="personal"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950 cursor-pointer transition-all"
                            data-testid="label-personal"
                          >
                            <User className="mb-3 h-8 w-8 text-blue-600" />
                            <div className="text-center">
                              <div className="font-semibold">Particulier</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Prêt personnel
                              </div>
                            </div>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="business"
                            id="business"
                            className="peer sr-only"
                            data-testid="radio-business"
                          />
                          <Label
                            htmlFor="business"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950 cursor-pointer transition-all"
                            data-testid="label-business"
                          >
                            <Building2 className="mb-3 h-8 w-8 text-blue-600" />
                            <div className="text-center">
                              <div className="font-semibold">Professionnel</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Prêt entreprise
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Jean Dupont"
                            className="pl-10"
                            data-testid="input-fullName"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="+33 6 12 34 56 78"
                            className="pl-10"
                            data-testid="input-phone"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {accountType === 'business' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de l'entreprise *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="SARL Altus Group"
                              className="pl-10 bg-white dark:bg-gray-800"
                              data-testid="input-companyName"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIRET</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="123 456 789 00010"
                              className="pl-10 bg-white dark:bg-gray-800"
                              data-testid="input-siret"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="jean.dupont@example.com"
                          className="pl-10"
                          data-testid="input-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            data-testid="input-password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            data-testid="input-confirmPassword"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                disabled={signupMutation.isPending}
                data-testid="button-signup"
              >
                {signupMutation.isPending ? 'Inscription en cours...' : 'Créer mon compte'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Vous avez déjà un compte ?{' '}
                <Link href="/login">
                  <span className="text-blue-600 hover:underline font-medium cursor-pointer" data-testid="link-login">Se connecter</span>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
