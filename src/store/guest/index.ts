import { Module } from 'vuex';
import { IState } from '../types';
import { getDefaultGuestState, GuestState } from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: GuestState = getDefaultGuestState();

const namespaced = true;

const guest: Module<GuestState, IState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default guest;
