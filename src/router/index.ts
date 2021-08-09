import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/guests',
  },
  {
    path: '/guests',
    name: 'Guests',
    component: () => import('../views/Guest.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
