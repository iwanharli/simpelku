<template>
  <aside id="first-tour" :class="`sidebar sidebar-base ${sidebarColor} ${sidebarMenuStyle} ${sidebarType.join(' ')}`" data-toggle="main-sidebar" data-sidebar="responsive">
    <div class="sidebar-header d-flex align-items-center justify-content-start">
      <router-link :to="{ name: 'admin.dashboard' }" class="navbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="40" viewBox="0 0 61 58" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4649 20.2188L30.6945 1.35718L7.92407 20.2188L18.8518 29.2697L7.92407 38.3235L30.6945 57.1851L53.4649 38.3235L42.5372 29.2726L53.4649 20.2188Z" fill="#7367f0" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M46.8043 32.8048L42.5372 29.2726L45.4478 26.8627L26.8776 14.5522L28.4753 10.788L43.8385 12.2931L43.8792 12.2815L30.6945 1.35718L7.92407 20.2188L14.5847 25.7375L18.8518 29.2697L15.9412 31.6796L34.5114 43.9901L32.9137 47.7543L17.5505 46.2492L17.5098 46.2637L30.6945 57.1851L53.4649 38.3235L46.8043 32.8048Z" fill="black" fill-opacity="0.14902" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4905 9.18718L43.8966 12.2931L30.6945 1.35718L7.92407 20.2188L27.4905 9.18718Z" fill="#8379f2" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7774 9.43078L32.9137 3.19578L30.6945 1.35718L7.92407 20.2188L27.4905 9.18718L28.7774 9.43078Z" fill="black" fill-opacity="0.14902" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.9537 49.358L17.5505 46.2492L30.7498 57.1851L53.5231 38.3235L33.9537 49.358Z" fill="#8379f2 " />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.9537 49.358L32.6175 49.1028L28.4956 55.3175L30.7497 57.1851L52.1287 39.4748L53.3604 38.4134L33.9537 49.358Z" fill="black" fill-opacity="0.14902" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.92407 20.2188L36.2281 43.6653L30.6945 57.1851L53.4649 38.3235L25.1609 14.877L30.6945 1.35718L7.92407 20.2188Z" fill="#A1B4FF" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6946 1.35718L24.0369 9.91508L17.3472 18.4469L17.3211 18.1975C19.5752 20.0651 21.8293 21.9327 24.0659 23.8177L30.7905 29.464L37.483 35.1451L44.1582 40.8465L44.3092 40.9741L44.1843 41.1249L37.4598 49.1724L30.6946 57.1851L37.2652 49.0129L43.8764 40.8726L43.9026 41.151L37.1664 35.5192L30.4448 29.87L23.758 24.1831C21.5214 22.2923 19.305 20.3841 17.0887 18.473L16.9551 18.357L17.0655 18.2236L23.8626 9.77878L30.6946 1.35718Z" fill="white" />
        </svg>
        <h4 class="logo-title" data-setting="app_name">
          
        </h4>
      </router-link>
      <div class="sidebar-toggle" @click="toggleSidebar">
        <i class="icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </i>
      </div>
    </div>
    <div class="sidebar-body pt-0 data-scrollbar">
      <slot name="profile-card"></slot>
      <div class="sidebar-list">
        <slot></slot>
      </div>
    </div>
    <div class="sidebar-footer"></div>
  </aside>
</template>

<script>
import { onMounted, computed } from "vue"
import { useStore } from "vuex"
import Scrollbar from "smooth-scrollbar"
export default {
  setup() {
    const store = useStore()
    const sidebarColor = computed(() => store.getters["setting/sidebar_color"])
    const sidebarType = computed(() => store.getters["setting/sidebar_type"])
    const sidebarMenuStyle = computed(() => store.getters["setting/sidebar_menu_style"])
    const toggleSidebar = () => {
      // Code Here
      if (sidebarType.value.includes("sidebar-mini")) {
        store.dispatch(
          "setting/sidebar_type",
          sidebarType.value.filter((item) => item !== "sidebar-mini")
        )
      } else {
        store.dispatch("setting/sidebar_type", [...sidebarType.value, "sidebar-mini"])
      }
    }
    onMounted(() => {
      Scrollbar.init(document.querySelector(".data-scrollbar"), { continuousScrolling: false })
    })
    return { sidebarColor, sidebarType, sidebarMenuStyle, toggleSidebar }
  }
}
</script>
