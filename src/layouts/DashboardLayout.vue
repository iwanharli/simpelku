<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <h1>Welcome, {{ userStore.user }}</h1> -->
  <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
    <div class="layout-container">
      <!-- Navbar -->
      <NavbarItem />
      <HorizontalMenuItem class="pt-3 mt-5" />
      <!-- / Navbar -->

      <!-- Layout container -->
      <div class="layout-page pt-0">
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <div class="layout-wrapper">
            <RouterView />
          </div>
        </div>
      </div>
      <!--/ Layout container -->
    </div>
  </div>

  <!-- Overlay -->
  <div class="layout-overlay layout-menu-toggle"></div>

  <!-- Drag Target Area To SlideIn Menu On Small Screens -->
  <div class="drag-target"></div>
</template>

<script>
import { useUserStore } from "../stores/user";

// components
import NavbarItem from '../components/NavbarItem.vue'
import HorizontalMenuItem from '../components/HorizontalMenuItem.vue'

export default {
  name: 'App',
  components: {
    NavbarItem,
    HorizontalMenuItem
  },
  setup() {
    const userStore = useUserStore;
    return { userStore };
  },
}
</script>
