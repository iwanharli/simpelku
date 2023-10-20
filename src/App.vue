<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
    <div class="layout-container">
      <!-- Navbar -->
      <NavbarItem />
      <!-- / Navbar -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Menu -->
          <HorizontalMenuItem />
          <!-- / Menu -->

          <!-- Content -->
          <RouterView />

          <div class="container-fluid flex-grow-1 container-p-y">
            <div style="height: 1000px; width: 2000px">
              <l-map ref="map" v-model:zoom="zoom" :center="[-6.846155, 109.128892]">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>

                <l-polygon
                  :lat-lngs="[
                    [-6.848030, 109.127111],
                    [-6.844930, 109.127213],
                    [-6.844399, 109.127412],
                    [-6.843839, 109.127916],
                    [-6.843522, 109.128222],
                    [-6.843405, 109.128479],
                    [-6.843397, 109.128805],
                    [-6.843378, 109.129482],
                    [-6.843815, 109.130108],
                    [-6.844419, 109.130499],
                    [-6.845571, 109.130567],
                    [-6.848934, 109.130598],
                    [-6.849089, 109.130019],
                    [-6.850875, 109.129794],
                    [-6.851462, 109.129584],
                    [-6.851276, 109.127807],
                    [-6.850367, 109.127907],
                    [-6.850528, 109.129230],
                    [-6.849406, 109.129368],
                    [-6.849238, 109.128040],
                    [-6.848195, 109.128140],
                    [-6.848085, 109.127142]
                  ]"
                  color="#41b782"
                  :fill="true"
                  :fillOpacity="0.5"
                  fillColor="#41b782"
                />
              </l-map>
            </div>
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
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LPolygon, LTileLayer } from '@vue-leaflet/vue-leaflet'

// components
import NavbarItem from './components/NavbarItem.vue'
import HorizontalMenuItem from './components/HorizontalMenuItem.vue'

export default {
  name: 'App',
  components: {
    NavbarItem,
    HorizontalMenuItem,
    LMap,
    LTileLayer,
    LPolygon,
  },
  data() {
    return {
      zoom: 16,
    };
  },
}
</script>

<style scoped>
.leaflet-map {
  width: 2045px;
  height: 900px;
  margin-top: -35px;
}
</style>
