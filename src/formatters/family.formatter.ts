import { Family, FamilyState } from '@/store/guest/types';

interface FormatFamiliesReturn {
  familyIds: string[];
  families: FamilyState;
}

export function formatFamilies(families: Family[] = []): FormatFamiliesReturn {
  const familyIds = families.map((family: Family): string => `id-${(family.id || 0)}`);
  const obj: { [key: string]: Family; } = {};
  families.forEach((family: Family) => {
    obj[`id-${family.id || 0}`] = family;
  });
  return {
    familyIds,
    families: obj,
  };
}

export function temporal(): void {
  console.log('temporal was called');
}
