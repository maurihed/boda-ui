import { MutationTree } from 'vuex';
import { GuestState } from './types';

const mutations: MutationTree<GuestState> = {
  SET_IS_LOADING(state: GuestState, payload: boolean) {
    state.isLoading = payload;
  },
  SET_FAMILIES(state: GuestState, { familiesIds, families }) {
    state.familiesIds = familiesIds;
    state.families = families;
  },
};

export default mutations;
