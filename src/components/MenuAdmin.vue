<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside
    class="layout-menu-horizontal menu-horizontal bg-menu-theme flex-grow-0 menu-mobile"
    style="z-index: 2;"
  >
    <div class="container-xxl d-flex h-100">
      <ul class="menu menu-inner" style="">
        <li
          @click="active = 'dashboard'"
          class="menu-item"
          :class="{ active: isActiveDashboardRoute }"
        >
          <RouterLink to="/home" class="menu-link menu-toggle" id="dashboard">
            <i class="menu-icon tf-icons ti ti-smart-home"></i>
            <div data-i18n="Dashboards">Dashboard</div>
          </RouterLink>
        </li>

        <li @click="active = 'kapal'" class="menu-item" :class="{ active: isActiveKapalRoute }">
          <RouterLink to="/kapal" class="menu-link menu-toggle" id="kapal">
            <i class="menu-icon tf-icons ti ti-ship"></i>
            <div data-i18n="Kapal">Kapal</div>
          </RouterLink>
        </li>

        <li
          @click="active = 'list-pengajuan'"
          class="menu-item"
          :class="{ active: isActiveShipRegisterRoute }"
        >
          <RouterLink to="/pengajuan-kapal" class="menu-link menu-toggle" id="pengajuanKapal">
            <i class="menu-icon tf-icons ti ti-checklist"></i>
            <div data-i18n="PengajuanKapal">List Pengajuan</div>
          </RouterLink>
        </li>

        <li @click="active = 'laporan'" class="menu-item" :class="{ active: isActiveReportRoute }" style="border-right: 1px solid rgba(179, 179, 179, 0.381);">
          <RouterLink to="/laporan" class="menu-link menu-toggle" id="laporan">
            <i class="menu-icon tf-icons ti ti-layout-grid-add"></i>
            <div data-i18n="Laporan">Laporan</div>
          </RouterLink>
        </li>

        <li
          @click="active = 'pengaturan-aplikasi'"
          class="menu-item"
          :class="{ active: isActiveAppSettingRoute }"
          style="margin-left: 30px;"
        >
          <RouterLink to="/pengaturan-aplikasi" class="menu-link menu-toggle" id="pengaturan">
            <i class="menu-icon tf-icons ti ti-settings"></i>
            <div data-i18n="Pengaturan Aplikasi">Pengaturan</div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      active: 'dashboard',
      harbourCode: '',
      harbourName: ''
    }
  },

  computed: {
    isActiveDashboardRoute() {
      return this.$route.path === '/home'
    },

    isActiveKapalRoute() {
      return this.$route.path === '/kapal' || this.$route.path.startsWith('/kapal/detail/')
    },

    isActiveReportRoute() {
      return this.$route.path === '/laporan'
    },

    isActiveAppSettingRoute() {
      return this.$route.path === '/pengaturan-aplikasi'
    },

    isActiveShipRegisterRoute() {
      return this.$route.path === '/pengajuan-kapal'
    }
  }
}
</script>
<style scoped>
  @media (max-width: 1200px) {
    .menu-mobile {
      /* margin-top: 0px !important; */
    }
  }

  .menu-mobile {
    margin-top: 45px !important;
  }
</style>