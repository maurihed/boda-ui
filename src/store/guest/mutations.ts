import { MutationTree } from 'vuex';
import { Family, GuestState } from './types';

const mutations: MutationTree<GuestState> = {
  SET_IS_LOADING(state: GuestState, payload: boolean) {
    state.isLoading = payload;
  },
  SET_FAMILIES(state: GuestState, { familyIds, families }) {
    state.familiesIds = familyIds;
    state.families = families;
  },
  ADD_FAMILY(state: GuestState, family: Family) {
    const id = `id-${family?.id || 0}`;
    state.familiesIds.push(id);
    state.families = { ...state.families, [id]: family };
  },
  REMOVE_FAMILY(state: GuestState, familyId: number) {
    const id = `id-${familyId}`;
    state.familiesIds = state.familiesIds
      .filter((_id: string): boolean => _id !== id);
    const families = { ...state.families };
    delete families[id];
    state.families = families;
  },
};

export default mutations;
