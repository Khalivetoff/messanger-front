import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

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
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Main' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (['/login', '/register'].includes(to.path) && store.getters['userModule/userData']) {
    return { name: 'Main' };
  }
  return true;
});

export default router;
