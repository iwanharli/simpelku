<template>
  <nav
    class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
    id="layout-navbar"
    style="z-index: 9999"
  >
    <div class="container-xxl">
      <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
        <a href="javascript:void(0);" class="app-brand-link gap-2">
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
          <span class="app-brand-text demo menu-text fw-bold" style="margin-left: -15px !important"
            >IMPEL &nbsp;&nbsp;|&nbsp;&nbsp; PPN TEGAL SARI</span
          >
        </a>

        <a
          href="javascript:void(0);"
          class="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
        >
          <i class="ti ti-x ti-sm align-middle"></i>
        </a>
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

          <!-- User -->
          <li class="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              class="nav-link dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <div class="avatar avatar-online">
                <img src="assets/img/user2.png" class="h-auto rounded-circle" />
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <div class="dropdown-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar avatar-online">
                        <img src="assets/img/user2.png" class="h-auto rounded-circle" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <span class="fw-semibold d-block" v-if="userData">{{ userData.name }}</span>
                      <small class="text-muted" v-if="userData">{{ userData.role }}</small
                      ><br />
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

  <div
    class="modal fade"
    id="modalChangePwd"
    aria-labelledby="modalToggleLabel"
    tabindex="-1"
    style="display: none; background-color: rgb(107 0 255 / 13%)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <div class="app-brand justify-content-center mb-4 mt-2">
              <span
                class="app-brand-text demo menu-text fw-bold"
                style="margin-left: -15px !important"
                >Ubah Password</span
              >
            </div>
            <!-- /Header -->

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="password" class="form-label">Password Baru</label>
                <input
                  v-model="pwd1"
                  type="text"
                  class="form-control"
                  id="pwd"
                  name="pwd"
                  autofocus
                />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Konfirmasi Password</label>
                </div>
                <div class="input-group input-group-merge">
                  <input
                    v-model="pwd2"
                    type="text"
                    id="pwdConfirmation"
                    class="form-control"
                    name="pwdConfirmation"
                  />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                </div>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit" data-dismiss="modal">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'NavbarItem',
  props: ['userData'],

  data() {
    return {
      password: null,
      password_confirmation: null,
      modalChangePwd: false
    }
  },

  methods: {
    closeModal() {
      this.modalChangePwd = false
    },
    async handleSubmit() {
      // try {
      //   const response = await axios.post('api/v1/user/change-password', {
      //     password: this.pwd1,
      //     password_confirmation: this.pwd2
      //   })

      //   this.closeModal()
      //   console.log(response.data.meta.message)

      // } catch (error) {
      //   console.log(error.response.data.meta.message)
      // }

      // const response = await axios.post('api/v1/user/change-password', {
      //   headers: {
      //     Authorization: 'Bearer ' + localStorage.getItem('token')
      //   }
      // })

      // console.log(response.data.meta.message)
      // $('#modalChangePwd').modal('hide')

      await axios
        .post(
          'api/v1/user/change-password',
          {
            password: this.pwd1,
            password_confirmation: this.pwd2
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          console.log(response.data.meta.message)
          $('#modalChangePwd').modal('hide')
        })
        .catch((error) => {
          console.log(error.response.data.meta.message)
        })
    }
  },

  setup() {
    const router = useRouter()
    const logout = () => {
      localStorage.setItem('authenticated', false)
      localStorage.removeItem('token')

      router.push({ name: 'login' })
    }

    return { logout }
  }
}
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>
