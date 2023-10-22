<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
    <div class="layout-container">
      <!-- Navbar -->
      <NavbarItem />
      <!-- / Navbar -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <div class="layout-wrapper">
            <!-- Menu -->
            <HorizontalMenuItem />
            <!-- / Menu -->
            
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
// components
import NavbarItem from '../components/NavbarItem.vue'
import HorizontalMenuItem from '../components/HorizontalMenuItem.vue'

export default {
  name: 'App',
  components: {
    NavbarItem,
    HorizontalMenuItem
  }
}
</script>
