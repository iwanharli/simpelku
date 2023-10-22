import { createRouter, createWebHistory } from 'vue-router'

import LoginLayout from "../layouts/LoginLayout.vue"
import DashboardLayout from "../layouts/DashboardLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginLayout
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'kapal',
          name: 'kapal',
          component: () => import('../views/KapalView.vue'),
          // children: [
          //   {
          //     path: '/kapal-fraud',
          //     name: 'kapal-fraud',
          //     component: () => import('../views/KapalFraudView.vue')
          //   },
          //   {
          //     path: '/kapal-ditolak',
          //     name: 'kapal-ditolak',
          //     component: () => import('../views/KapalDitolakView.vue')
          //   },
          //   {
          //     path: '/kapal-menunggu',
          //     name: 'kapal-menunggu',
          //     component: () => import('../views/KapalMenungguView.vue')
          //   },
          // ]
        },
        {
          path: 'laporan',
          name: 'laporan',
          component: () => import('../views/LaporanView.vue')
        },
        {
          path: 'pengaturan-mobile',
          name: 'pengaturan-mobile',
          component: () => import('../views/PengaturanMobileView.vue')
        }
      ]
    },
  ]
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('authenticated'));

  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' });
  if (to.name === 'login' && isAuthenticated) next({ name: 'home' });
  else next();
})

export default router
