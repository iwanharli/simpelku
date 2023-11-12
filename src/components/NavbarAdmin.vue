<template>
  <nav
    class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
    id="layout-navbar"
    style="z-index: 9999"
  >
    <div class="container-xxl">
      <div class="navbar-brand app-brand demo d-xl-flex py-0 me-4">
        <a href="/home" class="app-brand-link gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="61"
            height="40"
            viewBox="0 0 61 58"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M53.4649 20.2188L30.6945 1.35718L7.92407 20.2188L18.8518 29.2697L7.92407 38.3235L30.6945 57.1851L53.4649 38.3235L42.5372 29.2726L53.4649 20.2188Z"
              fill="#7367f0"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M46.8043 32.8048L42.5372 29.2726L45.4478 26.8627L26.8776 14.5522L28.4753 10.788L43.8385 12.2931L43.8792 12.2815L30.6945 1.35718L7.92407 20.2188L14.5847 25.7375L18.8518 29.2697L15.9412 31.6796L34.5114 43.9901L32.9137 47.7543L17.5505 46.2492L17.5098 46.2637L30.6945 57.1851L53.4649 38.3235L46.8043 32.8048Z"
              fill="black"
              fill-opacity="0.14902"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.4905 9.18718L43.8966 12.2931L30.6945 1.35718L7.92407 20.2188L27.4905 9.18718Z"
              fill="#8379f2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.7774 9.43078L32.9137 3.19578L30.6945 1.35718L7.92407 20.2188L27.4905 9.18718L28.7774 9.43078Z"
              fill="black"
              fill-opacity="0.14902"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.9537 49.358L17.5505 46.2492L30.7498 57.1851L53.5231 38.3235L33.9537 49.358Z"
              fill="#8379f2 "
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.9537 49.358L32.6175 49.1028L28.4956 55.3175L30.7497 57.1851L52.1287 39.4748L53.3604 38.4134L33.9537 49.358Z"
              fill="black"
              fill-opacity="0.14902"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.92407 20.2188L36.2281 43.6653L30.6945 57.1851L53.4649 38.3235L25.1609 14.877L30.6945 1.35718L7.92407 20.2188Z"
              fill="#A1B4FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30.6946 1.35718L24.0369 9.91508L17.3472 18.4469L17.3211 18.1975C19.5752 20.0651 21.8293 21.9327 24.0659 23.8177L30.7905 29.464L37.483 35.1451L44.1582 40.8465L44.3092 40.9741L44.1843 41.1249L37.4598 49.1724L30.6946 57.1851L37.2652 49.0129L43.8764 40.8726L43.9026 41.151L37.1664 35.5192L30.4448 29.87L23.758 24.1831C21.5214 22.2923 19.305 20.3841 17.0887 18.473L16.9551 18.357L17.0655 18.2236L23.8626 9.77878L30.6946 1.35718Z"
              fill="white"
            />
          </svg>
          <span
            class="app-brand-text demo menu-text fw-bold title-pelabuhan"
            style="margin-left: -15px !important"
          >
            <span style="color: #a1b4ff;">IMPEL</span> &nbsp;&nbsp;|&nbsp;&nbsp;
            {{ harbourName.toUpperCase() ? harbourName.toUpperCase() : 'PELABUHAN' }}
            <small> {{ harbourCode ? '(' + harbourCode + ')' : '' }}</small>
          </span>
        </a>
      </div>

      <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <!-- Style Switcher -->
          <!-- <li class="nav-item me-2 me-xl-0">
            <a class="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
              <i class="ti ti-md ti-moon-stars"></i>
            </a>
          </li> -->
          <!-- Style Switcher -->
          <li class="nav-item me-2 me-xl-0">
            <span class="fw-semibold d-block" v-if="userData"
              >SELAMAT DATANG, <b>{{ userData.name.toUpperCase() }}</b></span
            >
          </li>

          <!-- User -->
          <li class="nav-item dropdown-user dropdown">
            <a
              class="nav-link dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <div class="avatar avatar-online">
                <img src="../../assets/img/user2.png" class="h-auto rounded-circle" />
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <div class="dropdown-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar avatar-online">
                        <img src="../../assets/img/user2.png" class="h-auto rounded-circle" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <small class="text-muted" v-if="userData">Hak Akses :</small>
                      <span class="fw-semibold d-block" v-if="userData">{{
                        userData.role.toUpperCase()
                      }}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown-divider"></div>
              </li>
              <li>
                <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalChangePwd">
                  <i class="ti ti-logout me-2 ti-sm"></i>
                  <span class="align-middle">Ubah Password</span>
                </a>
              </li>
              <li>
                <div class="dropdown-divider"></div>
              </li>
              <li>
                <a class="dropdown-item" @click="logout" style="color: orange">
                  <i class="ti ti-logout me-2 ti-sm"></i>
                  <span class="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
          <!--/ User -->
        </ul>
      </div>
    </div>
  </nav>

  <ModalUserSetting />
</template>

<script lang="ts">
import ModalUserSetting from './Modal/ModalUserSetting.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'NavbarItem',
  props: ['userData'],

  data() {
    return {
      harbourCode: '',
      harbourName: ''
    }
  },

  mounted() {
    this.getTitle()
  },

  methods: {
    async getTitle() {
      axios
        .get('api/v1/setting/web', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.harbourCode = res.data.data.harbour_code
          this.harbourName = res.data.data.harbour_name

          // console.log('Status : ' + res.data.meta.code + '\n' + res.data.meta.message)
          // console.log(this.mobileSettings)
        })
        .catch((error) => {
          const router = useRouter()
          console.log('Error Get Title: ' + error)

          setTimeout(this.getTitle, 1000)

          if (error.response.data.meta.message === 'Unauthorized') {
            localStorage.setItem('authenticated', false.toString())
            localStorage.removeItem('token')

            router.push({ name: 'login' })
          }
        })
    }
  },

  created() {},

  setup() {
    const router = useRouter()

    const logout = () => {
      localStorage.setItem('authenticated', false.toString())
      localStorage.removeItem('token')

      router.push({ name: 'login' })
    }

    return { logout }
  },

  components: {
    ModalUserSetting
  }
}
</script>

<style>
@media (max-width: 1201px) {
  .title-pelabuhan {
    display: none;
  }
}

a:hover {
  cursor: pointer;
}
</style>
