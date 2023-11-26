<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
    <div class="layout-container">
      <!-- Navbar -->
      <NavBarDefault />
      <!-- / Navbar -->

      <!-- Layout container -->
      <div class="layout-page pt-2 mt-5">
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->
          <div class="layout-wrapper">
            <MapIndonesia />

            <!-- Modal LOGIN-->
            <ModalLogin />

            <!-- Modal Lupa Password-->
            <ModalForgotPassword />
          </div>
          <!--/ Content -->
        </div>
      </div>
      <!--/ Layout container -->
    </div>
  </div>

  <!-- Overlay -->
  <div class="layout-overlay layout-menu-toggle"></div>

  <!-- Drag Target Area To SlideIn Menu On Small Screens -->
  <div class="drag-target"></div>
  <!--/ Layout wrapper -->
</template>

<script>

//components
import NavBarDefault from '../components/NavbarDefault.vue'
import ModalLogin from '../components/Modal/ModalLogin.vue'
import ModalForgotPassword from '../components/Modal/ModalForgotPassword.vue'
import MapIndonesia from '../components/Maps/MapIndonesia.vue'

export default {
  name: 'LandingPage',
  components: {
    NavBarDefault,
    ModalLogin,
    ModalForgotPassword,
    MapIndonesia,
  },
}
</script>


