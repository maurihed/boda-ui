import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IState } from './types';
import guest from './guest';

Vue.use(Vuex);

const store: StoreOptions<IState> = {
  modules: {
    guest,
  },
};

export default new Vuex.Store<IState>(store);
