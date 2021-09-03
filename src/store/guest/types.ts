/* eslint-disable no-shadow, camelcase, no-use-before-define */
export enum GuestType {
  CHILD = 'CHILD',
  YOUNG_ADULT = 'YOUNG_ADULT',
  OLD_ADULT = 'OLD_ADULT',
}

export interface Family {
  id: number;

  name: string;

  guests: Guest[];
}

export interface Guest {
  id?: number;

  name?: string;

  age?: number;

  type?: GuestType;

  family_id?: number;

  family?: Family;
}

export interface FamilyState {
  [key: number]: Family
}

export interface GuestState {
  isLoading: boolean;
  familiesIds: number[];
  families: FamilyState;
}

export const getDefaultGuestState = (): GuestState => ({
  isLoading: false,
  familiesIds: [],
  families: {},
});
