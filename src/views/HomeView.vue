<template>
  <div>
    <div style="height: 87.2vh; width: 100vw">
      <l-map ref="map" v-model:zoom="zoom" :center="[-6.846155, 109.128892]">
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
</template>

<script>
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import { LMap, LPolygon, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'HomeAdmin',
  async created() {
    // SIMPEL => GET
    let webApiUrl  = 'http://103.139.192.254:9016/api/v1/user/get-profile'
    let tokenStr   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwiZXhwIjoxNzAwNzU4NTcxLCJ1c2VyX2lkIjoiMSJ9.-Kn2nFQGYg6PJMNb4CnxeovwwqzpXF3eNdHkME-Ia_8'

    // COBRA  => POST
    // let webApiUrl  = 'https://cobra-api.puas.in//api/visualization-multi/get-multi-result/10'
    // let tokenStr   = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2JyYS1hcGkucHVhcy5pbiIsImlhdCI6MTY5ODIyMTA4NywibmJmIjoxNjk4MjIxMDkyLCJleHAiOjE2OTgzOTM4ODcsInVpZCI6IjEwIiwiZGF0YSI6eyJ1c2VybmFtZSI6Im1hc3RlciIsImVtYWlsIjoibWFzdGVyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9fQ.r-ITjo2OzQvJwqCVoqnfET-v5JMwHGVLJdDao2j_eKQ'

    console.warn(localStorage.getItem('token'))

    const res = await axios({
      method: 'GET',
      url: webApiUrl,
      headers: { Authorization: `Bearer ${tokenStr}` }
    })

    console.log(res)
  },

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
