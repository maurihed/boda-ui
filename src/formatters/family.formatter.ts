import { Family } from '@/store/guest/types';

interface FormatFamiliesReturn {
  familyIds: number[];
  families: Family[];
}

export function formatFamilies(families: Family[] = []): FormatFamiliesReturn {
  const familyIds = families.map((family: Family) => (family.id || 0));
  return {
    familyIds,
    families,
  };
}

export function temporal(): void {
  console.log('temporal was called');
}
