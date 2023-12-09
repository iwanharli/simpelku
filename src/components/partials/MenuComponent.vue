<template>
  <div class="navbar-brand d-flex align-items-end text-primary">
    <brand-logo></brand-logo>
    <h2 class="logo-title ms-3 mb-0 simpel-text" data-setting="app_name">SIMPEL</h2>
  </div>

  <div class="navbar dual-horizontal bg-white">
    <nav id="navbar_main" class="mobile-offcanvas hover-nav horizontal-nav mx-md-auto navbar navbar-expand-xl">
      <div class="container-fluid">
        <div class="offcanvas-header px-0">
          <div class="navbar-brand d-flex align-items-end text-primary">
            <brand-logo></brand-logo>
            <h2 class="logo-title ms-3 mb-0 simpel-text" data-setting="app_name">SIMPEL</h2>
          </div>
          <button class="btn-close float-end"></button>
        </div>
        <ul class="navbar-nav bg-secondary p-2 simpel-nav px-3 fw-bolder">
          <!-- DASHBOARD  -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'admin.dashboard' }" :class="{ active: $route.name === 'admin.dashboard' }"> <i class="menu-icon tf-icons ti ti-smart-home"></i> DASHBOARD </router-link>
          </li>

          <!-- KAPAL  -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'admin.ship' }" :class="{ active: $route.name === 'admin.ship' }"> <i class="menu-icon tf-icons ti ti-ship"></i> KAPAL </router-link>
          </li>

          <!-- PENGAJUAN  -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon tf-icons ti ti-checklist"></i> PENGAJUAN </a>
            <div class="dropdown-asu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :to="{ name: 'admin.approval-accepted' }" :class="{ active: $route.name === 'admin.approval-accepted' }"><i class="menu-icon tf-icons ti ti-brand-vinted"></i> Disetujui</router-link>
              <router-link class="dropdown-item" :to="{ name: 'admin.approval-pending' }" :class="{ active: $route.name === 'admin.approval-pending' }"><i class="menu-icon tf-icons ti ti-24-hours"></i> Pending</router-link>
              <router-link class="dropdown-item" :to="{ name: 'admin.approval-rejected' }" :class="{ active: $route.name === 'admin.approval-rejected' }"><i class="menu-icon tf-icons ti ti-x"></i> Ditolak</router-link>
              <!-- Add more dropdown items as needed -->
            </div>
          </li>

          <!-- LAPORAN  -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon tf-icons ti ti-layout-grid-add"></i> LAPORAN </a>
            <div class="dropdown-asu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :to="{ name: 'admin.report-docking' }" :class="{ active: $route.name === 'admin.report-docking' }"> <i class="menu-icon tf-icons ti ti-building-lighthouse"></i> Labuh </router-link>
              <router-link class="dropdown-item" :to="{ name: 'admin.report-fraud' }" :class="{ active: $route.name === 'admin.report-fraud' }"> <i class="menu-icon tf-icons ti ti-ship-off"></i> Fraud </router-link>
              <!-- Add more dropdown items as needed -->
            </div>
          </li>

          <!-- PENGATURAN  -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon tf-icons ti ti-settings"></i> PENGATURAN </a>
            <div class="dropdown-asu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :to="{ name: 'admin.setting-application' }" :class="{ active: $route.name === 'admin.setting-application' }"><i class="menu-icon tf-icons ti ti-device-mobile-share"></i> Perangkat</router-link>
              <router-link class="dropdown-item" :to="{ name: 'admin.setting-geofence' }" :class="{ active: $route.name === 'admin.setting-geofence' }"><i class="menu-icon tf-icons ti ti-map-cog"></i> Map Geofencing</router-link>
              <router-link class="dropdown-item" :to="{ name: 'admin.user' }" :class="{ active: $route.name === 'admin.user' }"><i class="menu-icon tf-icons ti ti-user"></i> Manajemen User</router-link>
              <!-- Add more dropdown items as needed -->
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
