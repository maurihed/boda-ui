import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { ActionTree } from 'vuex';
import { getApolloClient } from '@/apollo';
import { formatFamilies } from '@/formatters/family.formatter';
import { DELETE_FAMILY, LOAD_FAMILIES_QUERY, NEW_FAMILY } from '@/graphql/guest/queries';
import { IState } from '../types';
import { Family, GuestState } from './types';

const actions: ActionTree<GuestState, IState> = {
  async loadFamilies({ commit }) {
    commit('SET_IS_LOADING', true);

    const option = {
      query: LOAD_FAMILIES_QUERY,
      variables: {},
    };
    const response:
      ApolloQueryResult<{ families:Family[] }>|undefined = await getApolloClient()?.query(option);
    const families = formatFamilies(response?.data?.families);
    commit('SET_FAMILIES', families);

    commit('SET_IS_LOADING', false);
  },

  async newFamily({ commit }, family: Family) {
    const option = {
      mutation: NEW_FAMILY,
      variables: family,
    };
    // TODO: Add handling errors
    const response:
      FetchResult<{ newFamily: Family }>|undefined = await getApolloClient()?.mutate(option);
    commit('ADD_FAMILY', response?.data?.newFamily || {});
  },
  async deleteFamily({ commit }, family: Family) {
    const option = {
      mutation: DELETE_FAMILY,
      variables: { familyId: family.id },
    };
    const response:
      FetchResult<{ deleteFamily: number }>|undefined = await getApolloClient()?.mutate(option);
    commit('REMOVE_FAMILY', response?.data?.deleteFamily || 0);
    return Promise.resolve(true);
  },
};

export default actions;
