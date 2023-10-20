<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside
    id="layout-menu"
    class="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
    style="z-index: 2"
  >
    <div class="container-xxl d-flex h-100">
      <ul class="menu menu-inner">
        <!-- Dashboards -->
        <li class="menu-item active">
          <RouterLink to="/" class="menu-link menu-toggle" id="dashboard">
            <i class="menu-icon tf-icons ti ti-smart-home"></i>
            <div data-i18n="Dashboards">Dashboards</div>
          </RouterLink>
        </li>

        <!-- Layouts -->
        <li class="menu-item">
          <RouterLink to="/kapal" class="menu-link menu-toggle" id="kapal">
            <i class="menu-icon tf-icons ti ti-ship"></i>
            <div data-i18n="Kapal">Kapal</div>
          </RouterLink>
        </li>

        <!-- Apps -->
        <li class="menu-item">
          <RouterLink to="/laporan" class="menu-link menu-toggle" id="laporan">
            <i class="menu-icon tf-icons ti ti-layout-grid-add"></i>
            <div data-i18n="Laporan">Laporan</div>
          </RouterLink>
        </li>

        <!-- Pages -->
        <li class="menu-item">
          <RouterLink to="/pengaturan-mobile" class="menu-link menu-toggle" id="pengaturan">
            <i class="menu-icon tf-icons ti ti-settings"></i>

            <div data-i18n="Pengaturan Mobile">Pengaturan Mobile</div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
