import { useQuery } from '@tanstack/react-query';
import type { User } from '@shared/schema';

export function useUser() {
  return useQuery<User>({
    queryKey: ['/api/user'],
    staleTime: 5 * 60 * 1000,
  });
}

export function getUserInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAccountTypeLabel(accountType: string): string {
  const labels: Record<string, string> = {
    individual: 'Particulier',
    business: 'Entreprise',
  };
  return labels[accountType] || accountType;
}
