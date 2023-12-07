/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'

// Auth Default Routes
const authChildRoutes = (prefix) => [
  {
    path: '',
    name: prefix + '.login',
    meta: { auth: false, name: 'Login' },
    component: () => import('@/views/auth/SignIn.vue')
  },
  {
    path: 'register',
    name: prefix + '.register',
    meta: { auth: false, name: 'Register' },
    component: () => import('@/views/auth/SignUp.vue')
  },
  {
    path: 'varify-email',
    name: prefix + '.varify-email',
    meta: { auth: false, name: 'Verify Email' },
    component: () => import('@/views/auth/VerifyEmail.vue')
  },
]

// Admin routes
const adminRoutes = (prefix) => [
  // DASHBOARD 
  {
    path: 'dashboard',
    name: prefix + '.dashboard',
    meta: { auth: true, name: 'HomeAdmin', isBanner: true },
    component: () => import('@/views/_admin/DashboardPage2.vue')
  },

  // SHIP 
  {
    path: 'ship',
    name: prefix + '.ship',
    meta: { auth: true, name: 'ShipPage', isBanner: true },
    component: () => import('@/views/_admin/ShipPage/ShipPage.vue')
  },
  {
    path: 'ship/:shipId',
    name: prefix + '.shipDetail',
    component: () => import('@/views/_admin/ShipPage/ShipDetail.vue'),
  },

  // APPROVAL 
  {
    path: 'approval',
    name: prefix + '.approval',
    meta: { auth: true, name: 'ApprovalPage', isBanner: true },
    component: () => import('@/views/_admin/ApprovalPage/ApprovalPage.vue')
  },
  {
    path: 'approval/accepted',
    name: prefix + '.approval-accepted',
    meta: { auth: true, name: 'ApprovalAcceptedPage', isBanner: true },
    component: () => import('@/views/_admin/ApprovalPage/AcceptedPage.vue')
  },
  {
    path: 'approval/pending',
    name: prefix + '.approval-pending',
    meta: { auth: true, name: 'ApprovalPendingPage', isBanner: true },
    component: () => import('@/views/_admin/ApprovalPage/PendingPage.vue')
  },
  {
    path: 'approval/rejected',
    name: prefix + '.approval-rejected',
    meta: { auth: true, name: 'ApprovalRejectedPage', isBanner: true },
    component: () => import('@/views/_admin/ApprovalPage/RejectedPage.vue')
  },

  // REPORT 
  {
    path: 'report/docking',
    name: prefix + '.report-docking',
    meta: { auth: true, name: 'ReportDockingPage', isBanner: true },
    component: () => import('@/views/_admin/ReportPage/DockingPage.vue')
  },
  {
    path: 'report/fraud',
    name: prefix + '.report-fraud',
    meta: { auth: true, name: 'ReportFraudPage', isBanner: true },
    component: () => import('@/views/_admin/ReportPage/FraudPage.vue')
  },

  // SETTING 
  {
    path: 'setting',
    name: prefix + '.setting',
    meta: { auth: true, name: 'SettingPage', isBanner: true },
    component: () => import('@/views/_admin/SettingPage/SettingPage.vue')
  },
  {
    path: 'setting/aplication',
    name: prefix + '.setting-application',
    meta: { auth: true, name: 'SettingApplicationPage', isBanner: true },
    component: () => import('@/views/_admin/SettingPage/ApplicationPage.vue')
  },
  {
    path: 'setting/geofence',
    name: prefix + '.setting-geofence',
    meta: { auth: true, name: 'SettingPage', isBanner: true },
    component: () => import('@/views/_admin/SettingPage/GeofencePage.vue')
  },

  // USER 
  {
    path: 'user',
    name: prefix + '.user',
    meta: { auth: true, name: 'User List', isBanner: true },
    component: () => import('@/views/_admin/UserPage/UserPage.vue')
  },

  // Extra Pages
  {
    path: '/privacy-policy',
    name: prefix + '.privacy-policy',
    meta: { auth: true, name: 'Privacy Policy', isBanner: true },
    component: () => import('@/views/extra/PrivacyPolicy.vue')
  },
  {
    path: '/terms-and-conditions',
    name: prefix + '.terms-and-conditions',
    meta: { auth: true, name: 'Terms and Conditions', isBanner: true },
    component: () => import('@/views/extra/TermsAndConditions.vue')
  },
  {
    path: '/user-profile',
    name: prefix + '.user-profile',
    meta: { auth: true, name: 'User Add', isBanner: true },
    component: () => import('@/views/_admin/UserPage/ProfilePage.vue')
  },
]

// Error routes
const errorRoutes = (prefix) => [
  // Error Pages
  {
    path: '404',
    name: prefix + '.404',
    meta: { auth: true, name: 'Error 404', isBanner: true },
    component: () => import('@/views/errors/Error404Page.vue')
  },
  {
    path: '500',
    name: prefix + '.500',
    meta: { auth: true, name: 'Error 500', isBanner: true },
    component: () => import('@/views/errors/Error500Page.vue')
  },
  {
    path: 'maintenance',
    name: prefix + '.maintenance',
    meta: { auth: true, name: 'Maintenance', isBanner: true },
    component: () => import('@/views/errors/MaintenancePage.vue')
  }
]


//------------------------------------------------------------------------------------
const routes = [
  // Auth
  {
    path: '/',
    name: 'auth',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: authChildRoutes('auth')
  },


  // Admin
  {
    path: '/',
    name: 'adminPage',
    component: () => import('../layouts/AdminLayout.vue'),
    children: adminRoutes('admin')
  },


  // Errors
  {
    path: '/errors',
    name: 'errors',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: errorRoutes('errors')
  }
]

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
