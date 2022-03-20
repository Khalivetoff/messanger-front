import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Main',
    path: '/',
    component: () => import('@/views/main.vue')
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/register.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
