import Vue from 'vue';
import { ErrorResponse } from 'apollo-link-error';
import App from './App.vue';
import router from './router';
import store from './store';
import { IApolloOptions, initApolloProvider } from './apollo';
import './assets/main.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

Vue.config.productionTip = false;

const apolloOptions: IApolloOptions = {
  url: process.env.VUE_APP_GRAPHQL_SERVER || '',
  timeout: 20000,
  onError: (err: ErrorResponse) => { console.log(err); },
};
const apolloProvider = initApolloProvider(apolloOptions);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
