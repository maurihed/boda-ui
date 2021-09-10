import { GetterTree } from 'vuex';
import { IState } from '../types';
import { Family, Guest, GuestState } from './types';

const getters: GetterTree<GuestState, IState> = {
  isLoading({ isLoading }): boolean {
    return isLoading;
  },
  families({ families }): Family[] {
    return Object.values(families);
  },
  familiesIds({ familiesIds }): string[] {
    return familiesIds;
  },
  guestsByFamily({ families }, familyId: number): Guest[] {
    return families[familyId]?.guests || [];
  },
};

export default getters;
