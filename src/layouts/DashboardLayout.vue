<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <h1>Welcome, {{ userStore.user }}</h1> -->
  <div
    class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu gradient-bg"
  >
    <div class="layout-container">
      <!-- Navbar -->
      <NavbarAdmin v-bind:userData="user" />
      <MenuAdmin class="pt-3 mt-5" />
      <!-- <MenuSuperAdmin class="pt-3 mt-5" /> -->
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
  <!-- <div class="drag-target"></div> -->
</template>

<script>
import axios from 'axios'

// components
import NavbarAdmin from '../components/NavbarAdmin.vue'
import MenuAdmin from '../components/MenuAdmin.vue'
// import MenuSuperAdmin from '../components/MenuSuperAdmin.vue'

export default {
  name: 'App',
  data() {
    return {
      user: null,
      zoom: 16
    }
  },

  async created() {
    const response = await axios.get('api/v1/user/get-profile', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    this.user = response.data.data
  },

  components: {
    NavbarAdmin,
    MenuAdmin
    // MenuSuperAdmin
  }
}
</script>

<style>
.gradient-bg {
  background: linear-gradient(-45deg, #cdd7a6, #a6e1ff, #a4e7ff, rgba(112, 116, 255, 0.808));
  background-size: 400% 400%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
