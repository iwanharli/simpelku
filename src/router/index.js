import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      components : DashboardView
    },
    {
      path: '/kapal',
      name: 'kapal',
      component: () => import('../views/KapalView.vue')
    },
    {
      path: '/laporan',
      name: 'laporan',
      component: () => import('../views/LaporanView.vue')
    },
    {
      path: '/pengaturan-mobile',
      name: 'pengaturan-mobile',
      component: () => import('../views/PengaturanMobileView.vue')
    }
  ]
})

export default router
