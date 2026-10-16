import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: 'profile', component: () => import('@/pages/ProfilePage.vue') },
      { path: 'channel/:id', component: () => import('@/pages/ChannelPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: '', redirect: '/login' },
      { path: 'register', component: () => import('@/pages/RegisterPage.vue') },
      { path: 'login', component: () => import('@/pages/LoginPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;