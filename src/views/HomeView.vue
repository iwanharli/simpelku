<template>
  <div class="container-fluid flex-grow-1 container-p-y">
    <div style="height: 1000px; width: 2000px">
      <l-map
        ref="map"
        v-model:zoom="zoom"
        :center="[-6.846155, 109.128892]"
        style="border-radius: 20px"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>

        <l-polygon
          :lat-lngs="[
            [-6.84803, 109.127111],
            [-6.84493, 109.127213],
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
            [-6.850528, 109.12923],
            [-6.849406, 109.129368],
            [-6.849238, 109.12804],
            [-6.848195, 109.12814],
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
  
  <!--Hero area end-->
  <div class="wave_area">
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="#d3ecf9" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="#9ccce8" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="#2e88c7" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#2158a8" />
      </g>
    </svg>
  </div>
  <!--Hero area end-->
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LPolygon, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'MapDashboard',
  components: {
    LMap,
    LTileLayer,
    LPolygon
  },
  data() {
    return {
      zoom: 16
    }
  }
}
</script>

<style scoped></style>
