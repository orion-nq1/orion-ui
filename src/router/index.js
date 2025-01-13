import { createRouter, createWebHistory } from "vue-router";
import { useHead } from '@vueuse/head';
import store from '@/store';

import HomePage from '../pages/Home.vue';
import DashboardPage from '../pages/Dashboard.vue';

import ConnectWallet from '../partials/connectWallet.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { requiresAuth: false }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/connect-wallet",
    name: "connectWallet",
    component: ConnectWallet,
    meta: { requiresAuth: false }
  },
  {
    path: '/referral/:code',
    redirect: to => {
      // Store the referral code and redirect to home
      localStorage.setItem('referralCode', to.params.code);
      return { path: '/connect-wallet' }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const head = to.meta.head || {};
  useHead(head);

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    // Redirect to home page if not logged in
    next({ name: 'connectWallet' });
  } else {
    next();
  }
});

export default router;