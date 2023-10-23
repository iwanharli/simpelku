<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
    <div class="layout-container">
      <!-- Navbar -->
      <NavbarLanding />
      <!-- / Navbar -->

      <!-- Layout container -->
      <div class="layout-page pt-2 mt-5">
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->
          <div class="layout-wrapper">
            <MapPelabuhan />

            <!-- Modal LOGIN-->
            <LoginModal />

            <!-- Modal Lupa Password-->
            <ForgotPasswordModal />
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
import NavbarLanding from '../components/NavbarLanding.vue'
import LoginModal from '../components/LoginModal.vue'
import ForgotPasswordModal from '../components/ForgotPasswordModal.vue'
import MapPelabuhan from '../components/MapPelabuhan.vue'

export default {
  name: 'LandingPage',
  components: {
    NavbarLanding,
    LoginModal,
    ForgotPasswordModal,
    MapPelabuhan,
  },
}
</script>


