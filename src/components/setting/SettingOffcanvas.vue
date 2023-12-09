<template>
  <!-- <div class="btn-download">
    <a class="btn btn-success py-2 px-3 d-flex gap-2" href="https://iqonic.design/product/admin-templates/hope-ui-open-source-vue-js-admin-template/" target="_blank">
      <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.4" d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z" fill="currentColor"></path>
        <path d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z" fill="currentColor"></path>
      </svg>
    </a>
  </div> -->
  <!-- Setting offcanvas start here -->
  <!-- <b-offcanvas v-model="show" :backdrop="true" title="Ubah Tema" :placement="themeSchemeDirection !== 'ltr' ? 'start' : 'end'" class="live-customizer" id="live-customizer" :body-scrolling="true">
    <div class="row">
      <div class="col-lg-12">
        <div>
          <div>
            <theme-scheme />
            <color-customizer />
          </div>
          <hr class="hr-horizontal" />
          <menu-color v-if="isShowSetting('isSidebar')" />
          <hr class="hr-horizontal" />
          <menu-style v-if="isShowSetting('isSidebar')" />
          <hr class="hr-horizontal" />
          <menu-active-style v-if="isShowSetting('isSidebar')" />
          <hr class="hr-horizontal" />
          <navbar-style v-if="isShowSetting('isNavbar')" />
        </div>
      </div>
    </div>
  </b-offcanvas> -->

  <a class="btn btn-fixed-end btn-secondary btn-icon btn-setting" data-bs-toggle="modal" data-bs-target="#modalChangeColor" style="border-radius: 20px 0px 0px 20px; border: 2px solid white">
    <div class="animated-rotate" style="font-size: 22px">🐋</div>
  </a>

  <div class="modal fade" id="modalChangeColor" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white" style="font-weight: bold">UBAH WARNA</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <color-customizer />
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ubah Tema</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12">
              <div>
                <color-customizer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Settings sidebar end here -->
</template>
<script>
// Vue / Vuex Functions
import { ref, onMounted, onUnmounted, computed, watch } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

// Style Components
import ColorCustomizer from "@/components/setting/sections/ColorCustomizer.vue"
import ThemeScheme from "./sections/ThemeScheme.vue"
import MenuColor from "./sections/MenuColor.vue"
import MenuStyle from "./sections/MenuStyle.vue"
import MenuActiveStyle from "./sections/MenuActiveStyle.vue"
import NavbarStyle from "./sections/NavbarStyle.vue"
// Utilities
import { copyToClipboard } from "@/utilities/dom"
export default {
  name: "SettingOffcanvas",
  components: {
    // Style Components
    ThemeScheme,
    MenuColor,
    MenuStyle,
    MenuActiveStyle,
    NavbarStyle,
    ColorCustomizer
  },
  setup() {
    // Store objects
    const store = useStore()
    const route = useRoute()
    const themeSchemeDirection = computed(() => store.getters["setting/theme_scheme_direction"])

    // Variables
    const show = ref(false)

    // Functions
    const close = () => {
      show.value = false
    }
    const open = () => {
      show.value = true
    }
    const onClick = (e) => {
      if (show.value) {
        if (e.target.closest(".live-customizer") == null && e.target.closest("#settingbutton") == null) {
          show.value = false
        }
      }
    }
    const copyConfig = () => {
      copyToClipboard(store.state.setting)
    }
    const defaultSetting = () => {
      store.dispatch("setting/reset_state")
    }
    const isShowSetting = (name) => {
      return !route.meta[name]
    }

    // Life cycle hooks
    watch(themeSchemeDirection, () => {
      show.value = false
    })
    onMounted(() => {
      document.body.addEventListener("click", onClick)
    })
    onUnmounted(() => {
      document.body.removeEventListener("click", onClick)
    })

    // Return functions & variables
    return {
      themeSchemeDirection,
      show,
      isShowSetting,
      copyConfig,
      defaultSetting,
      close,
      open
    }
  }
}
</script>
<style>
.live-customizer .offcanvas-title {
  font-size: calc(1.269rem + 0.228vw);
  flex: 1;
}
@media (min-width: 1200px) {
  .live-customizer .offcanvas-title {
    font-size: 1.44rem;
  }
}
</style>
