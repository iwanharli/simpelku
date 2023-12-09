<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar}`">
    <div class="container-fluid navbar-inner">
      <slot></slot>
      <ul class="mb-2 navbar-nav align-items-center navbar-list mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="@/assets/images/user2.png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded" />
            <div class="caption ms-3 d-none d-md-block">
              <h6 class="caption-title mb-0" style="font-weight: bolder">{{ uname }}</h6>
              <small class="caption-sub-title mb-0 mt-0" :class="{ 'bg-danger': urole === 'superadmin', 'bg-info': urole === 'admin' }" style="text-transform: uppercase; border-radius: 5px; color: white; padding: 5px">
                {{ urole }}
              </small>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style="border: 2px solid rgb(125, 125, 125)">
            <!-- <li><router-link class="dropdown-item" :to="{ name: 'admin.user-profile' }">User Profile</router-link></li> -->
            <!-- <li><hr class="dropdown-divider" /></li> -->
            <li class="bg-soft-warning"><router-link class="dropdown-item text-dark" :to="{ name: 'auth.login' }" style="font-weight: bolder;">Logout</router-link></li>
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
      headerNavbar,
      isHidden,
      carts,
      emit,
      uname: localStorage.getItem("uname"),
      urole: localStorage.getItem("urole")
    }
  }
}
</script>
