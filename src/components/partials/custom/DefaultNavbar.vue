<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar}`">
    <div class="container-fluid navbar-inner">
      <slot></slot>

      <!-- <div class="bg-primary" style="border-radius: 20px; display: flex; align-items: center; justify-content: center">
        <input class="darkmode" id="darkmode-toggle" type="checkbox" v-model="isDarkMode" @change="updateDarkMode" />
        <label class="darkmode" for="darkmode-toggle">
          <svg version="1.1" class="sun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496 496" style="enable-background: new 0 0 496 496" xml:space="preserve">
            <rect x="152.994" y="58.921" transform="matrix(0.3827 0.9239 -0.9239 0.3827 168.6176 -118.5145)" width="40.001" height="16" />
            <rect x="46.9" y="164.979" transform="matrix(0.9239 0.3827 -0.3827 0.9239 71.29 -12.4346)" width="40.001" height="16" />
            <rect x="46.947" y="315.048" transform="matrix(0.9239 -0.3827 0.3827 0.9239 -118.531 50.2116)" width="40.001" height="16" />

            <rect x="164.966" y="409.112" transform="matrix(-0.9238 -0.3828 0.3828 -0.9238 168.4872 891.7491)" width="16" height="39.999" />

            <rect x="303.031" y="421.036" transform="matrix(-0.3827 -0.9239 0.9239 -0.3827 50.2758 891.6655)" width="40.001" height="16" />

            <rect x="409.088" y="315.018" transform="matrix(-0.9239 -0.3827 0.3827 -0.9239 701.898 785.6559)" width="40.001" height="16" />

            <rect x="409.054" y="165.011" transform="matrix(-0.9239 0.3827 -0.3827 -0.9239 891.6585 168.6574)" width="40.001" height="16" />
            <rect x="315.001" y="46.895" transform="matrix(0.9238 0.3828 -0.3828 0.9238 50.212 -118.5529)" width="16" height="39.999" />
            <path
              d="M248,88c-88.224,0-160,71.776-160,160s71.776,160,160,160s160-71.776,160-160S336.224,88,248,88z M248,392
				c-79.4,0-144-64.6-144-144s64.6-144,144-144s144,64.6,144,144S327.4,392,248,392z"
            />
            <rect x="240" width="16" height="72" />
            <rect x="62.097" y="90.096" transform="matrix(0.7071 0.7071 -0.7071 0.7071 98.0963 -40.6334)" width="71.999" height="16" />
            <rect y="240" width="72" height="16" />

            <rect x="90.091" y="361.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -113.9157 748.643)" width="16" height="71.999" />
            <rect x="240" y="424" width="16" height="72" />

            <rect x="361.881" y="389.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 397.8562 960.6281)" width="71.999" height="16" />
            <rect x="424" y="240" width="72" height="16" />
            <rect x="389.911" y="62.091" transform="matrix(0.7071 0.7071 -0.7071 0.7071 185.9067 -252.6357)" width="16" height="71.999" />
          </svg>

          <svg version="1.1" class="moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 49.739 49.739" style="enable-background: new 0 0 49.739 49.739" xml:space="preserve">
            <path
              d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l-0.615,2.268
       c-1.479,5.459-0.899,11.25,1.633,16.306c2.75,5.493,7.476,9.587,13.305,11.526c5.831,1.939,12.065,1.492,17.559-1.258v0
       c0.25-0.125,0.492-0.258,0.734-0.391l2.061-1.13l-0.585,2.252c-1.863,6.873-6.577,12.639-12.933,15.822
       C32.639,48.039,28.825,48.888,25.068,48.889z M12.002,4.936c-9.413,6.428-12.756,18.837-7.54,29.253
       c5.678,11.34,19.522,15.945,30.864,10.268c5.154-2.582,9.136-7.012,11.181-12.357c-5.632,2.427-11.882,2.702-17.752,0.748
       c-6.337-2.108-11.473-6.557-14.463-12.528C11.899,15.541,11.11,10.16,12.002,4.936z"
            />
          </svg>
        </label>
      </div> -->
      <ul class="mb-2 navbar-nav align-items-center navbar-list mb-lg-0">
        <li class="nav-items dropdown">
          <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="@/assets/images/user2.png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded" />
            <div class="caption ms-3 d-none d-md-block">
              <h6 class="caption-title mb-1" style="font-weight: bolder; text-transform: capitalize">{{ uname }}</h6>
              <small class="caption-sub-title mb-0 mt-0" :class="{ 'bg-danger': urole === 'superadmin', 'bg-info': urole === 'admin' }" style="text-transform: uppercase; border-radius: 5px; color: white; padding: 5px">
                {{ urole }}
              </small>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <!-- <li><router-link class="dropdown-item" :to="{ name: 'admin.user-profile' }">User Profile</router-link></li> -->
            <!-- <li><hr class="dropdown-divider" /></li> -->
            <li><a href="#" class="dropdown-item logout" style="font-weight: bolder" @click="logout()">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useStore } from "vuex"

export default {
  components: {},

  props: {
    isGoPro: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const store = useStore()

    // Common state and methods
    const isDarkMode = ref(store.getters["setting/theme_scheme"] === "dark") // Start with "Dark" mode initially
    const updateDarkMode = () => {
      const value = isDarkMode.value ? "dark" : "light"
      store.dispatch("setting/theme_scheme", value)
    }

    // Specific state and methods for the second setup
    const headerNavbar = computed(() => store.getters["setting/header_navbar"])
    const isHidden = ref(false)

    const onscroll = () => {
      const yOffset = document.documentElement.scrollTop
      const navbar = document.querySelector(".navs-sticky")
      if (navbar !== null) {
        if (yOffset >= 100) {
          navbar.classList.add("menu-sticky")
        } else {
          navbar.classList.remove("menu-sticky")
        }
      }
    }

    const carts = computed(() => store.getters.carts)

    onMounted(() => {
      window.addEventListener("scroll", onscroll())
    })

    onUnmounted(() => {
      window.removeEventListener("scroll", onscroll())
    })

    return {
      // Combine common and specific properties
      ...{
        isDarkMode,
        updateDarkMode
      },
      ...{
        headerNavbar,
        isHidden,
        carts,
        emit,
        uname: localStorage.getItem("uname"),
        urole: localStorage.getItem("urole")
      }
    }
  },

  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({ name: "auth.login" })
      console.log("💀 SESSION REMOVED")
    }
  }
}
</script>
