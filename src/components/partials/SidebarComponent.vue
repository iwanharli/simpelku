<template>
  <button data-trigger="navbar_main" class="d-xl-none btn btn-primary rounded-pill p-1 pt-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
    <svg width="20px" height="20px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
    </svg>
  </button>

  <div class="offcanvas offcanvas-start d-xl-none d-md-block" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
    <div class="offcanvas-header p-3">
      <div class="navbar-brand ms-0">
        <img src="@/assets/app/s-logo.svg" /> &nbsp;
        <h4>IMPEL</h4>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <!-- ISI MENU  -->
    <div class="offcanvas-body p-4" style="z-index: 1000">
      <ul class="navbar-nav bg-light p-2 simpel-nav px-3 fw-bolder">
        <!-- Iterate through menu items -->
        <li v-for="menuItem in menuItems" :key="menuItem.id" class="nav-item">
          <!-- Check if the menu item has children -->
          <template v-if="menuItem.children && menuItem.children.length > 0">
            <!-- Render a dropdown toggle -->
            <a class="nav-link dropdown-toggle" href="#" role="button" @click.prevent="toggleDropdown(menuItem.id)" :class="{ active: isDropdownActive(menuItem.id) }"> <i :class="['menu-icon', 'tf-icons', menuItem.iconClass]"></i> {{ menuItem.title }} </a>
            <!-- Render the dropdown menu -->
            <div v-show="isDropdownActive(menuItem.id)" class="dropdown-usa" :aria-labelledby="'navbarDropdown' + menuItem.id">
              <router-link v-for="childItem in menuItem.children" :key="childItem.id" class="dropdown-item" :to="{ name: childItem.routeName }" :class="{ active: $route.name === childItem.routeName }"> <i :class="['menu-icon', 'tf-icons', childItem.iconClass]"></i> {{ childItem.title }} </router-link>
            </div>
          </template>
          <!-- Render a regular link if there are no children -->
          <template v-else>
            <router-link class="nav-link" :to="{ name: menuItem.routeName }" :class="{ active: $route.name === menuItem.routeName }"> <i :class="['menu-icon', 'tf-icons', menuItem.iconClass]"></i> {{ menuItem.title }} </router-link>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import DefaultSidebar from "@/components/custom/sidebar/DefaultSidebar.vue"
import SideMenu from "@/components/custom/nav/SideMenu.vue"

import axios from "axios"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const currentRoute = ref("")
const route = useRoute()
const toggle = (route) => {
  if (route === currentRoute.value && route.includes(".")) {
    const menu = currentRoute.value.split(".")
    return (currentRoute.value = menu[menu.length - 2])
  }
  if (route !== currentRoute.value && currentRoute.value.includes(route)) {
    return (currentRoute.value = "")
  }
  if (route !== currentRoute.value) {
    return (currentRoute.value = route)
  }
  if (route === currentRoute.value) {
    return (currentRoute.value = "")
  }
  return (currentRoute.value = "")
}

const menuItems = ref([
  {
    id: 1,
    title: "DASHBOARD",
    iconClass: "ti ti-smart-home",
    routeName: "admin.dashboard"
  },
  {
    id: 2,
    title: "KAPAL",
    iconClass: "ti ti-ship",
    routeName: "admin.ship"
  },
  {
    id: 3,
    title: "PENGAJUAN",
    iconClass: "ti ti-checklist",
    children: [
      { id: 31, title: "Disetujui", iconClass: "ti ti-brand-vinted", routeName: "admin.approval-accepted" },
      { id: 32, title: "Pending", iconClass: "ti ti-24-hours", routeName: "admin.approval-pending" },
      { id: 33, title: "Ditolak", iconClass: "ti ti-x", routeName: "admin.approval-rejected" }
    ]
  },
  {
    id: 4,
    title: " LAPORAN",
    iconClass: "ti ti-layout-grid-add",
    children: [
      { id: 41, title: "Labuh", iconClass: "ti ti-building-lighthouse", routeName: "admin.report-docking" },
      { id: 42, title: "Fraud", iconClass: "ti ti-ship-off", routeName: "admin.report-fraud" }
    ]
  },
  {
    id: 5,
    title: "PENGATURAN",
    iconClass: "ti ti-settings",
    children: [
      { id: 51, title: "Perangkat", iconClass: "ti ti-device-mobile-share", routeName: "admin.setting-application" },
      { id: 52, title: "Map Geofencing", iconClass: "ti ti-map-cog", routeName: "admin.setting-geofence" },
      { id: 53, title: "Manajemen User", iconClass: "ti ti-user", routeName: "admin.user" }
    ]
  }
])

const activeDropdowns = ref([1]) // Set the ID of the initially expanded dropdown

const toggleDropdown = (itemId) => {
  activeDropdowns.value = [itemId]
}

const isDropdownActive = (itemId) => {
  return activeDropdowns.value.includes(itemId)
}

const $route = useRoute()
</script>

<style>
.nav-item:not() {
  background: #3a57e8 !important;
}

.nav-item:hover > a {
  background: #5a77f7 !important;
  /* border-radius: 20px; */
  color: #fff !important;
}

.dropdown-usa {
  background: white;
  display: none;
}

.nav-item:hover .dropdown-usa {
  position: absolute;
  display: inline-block;
  left: 0;
  right: 0;
  padding: 10px;
  border-radius: 0 0 5px 5px;
}

.dropdown-item {
  font-weight: 900 !important;
  padding: 7px;
}

.dropdown-item:hover {
  background: #5a77f7;
  color: white;
  border-radius: 5px;
}

.dropdown-item.logout {
  font-weight: 900 !important;
  padding: 10px;
}

.dropdown-item.logout:hover {
  background: #c03221;
  color: white;
  border-radius: 5px;
}
</style>
