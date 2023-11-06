import { createRouter, createWebHistory } from 'vue-router'

import LoginLayout from "@/layouts/LoginLayout.vue"
import DashboardLayout from "@/layouts/DashboardLayout.vue"

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
          component: () => import('../views/ShipView.vue'),
        },
        {
          path: 'kapal/detail/:shipId',
          name: 'detailKapal',
          component: () => import('../views/ShipDetailView.vue'),
        },
        {
          path: 'pengajuan-kapal',
          name: 'pengajuanKapal',
          component: () => import('../views/ShipRegisterView.vue'),
        },
        {
          path: 'laporan',
          name: 'laporan',
          component: () => import('../views/ReportView.vue')
        },
        {
          path: 'pengaturan-mobile',
          name: 'pengaturan-mobile',
          component: () => import('../views/MobileSettingView.vue')
        },
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
