<template>
  <nav
    class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
    id="layout-navbar border-primary"
    style="z-index: 1"
  >
    <div class="container-xxl">
      <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
          <headerLogo />
      </div>

      <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
          <i class="ti ti-menu-2 ti-sm"></i>
        </a>
      </div>

      <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <ul class="navbar-nav flex-row align-items-center ms-auto">

          <!-- Style Switcher -->
          <li class="nav-item me-2 me-xl-0">
            <a class="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
              <i class="ti ti-md"></i>
            </a>
          </li>
          <!--/ Style Switcher -->
          
          <li class="menu-item active">
            <button
              type="button"
              class="btn rounded-pill btn-primary waves-effect waves-light"
              data-bs-toggle="modal"
              data-bs-target="#modalToggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-login-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"
                ></path>
                <path d="M3 12h13l-3 -3"></path>
                <path d="M13 15l3 -3"></path>
              </svg>
              &nbsp; LOGIN
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import headerLogo from './Items/HeaderLogoItem.vue'


export default {
  name: 'NavBar',

  components: {
    headerLogo
  }
}
</script>
