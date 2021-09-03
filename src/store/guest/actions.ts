import { getApolloClient } from '@/apollo';
import { formatFamilies } from '@/formatters/family.formatter';
import { LOAD_FAMILIES_QUERY } from '@/graphql/guest/queries';
import { ApolloQueryResult } from 'apollo-client';
import { ActionTree } from 'vuex';
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
};

export default actions;
