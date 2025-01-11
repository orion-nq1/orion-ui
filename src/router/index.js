import { createRouter, createWebHistory } from "vue-router";
import { useHead } from '@vueuse/head';
import HomePage from '../pages/HomePage.vue';
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const head = to.meta.head || {};
  useHead(head);
  next();
});

export default router;