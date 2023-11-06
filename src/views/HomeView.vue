<template>
  <!-- STATISTIK KAPAL  -->
  <div class="container-fluid flex-grow-1 container-p-y" style="position: relative">
    <!-- STATISTIK KAPAL  -->
    <div class="row" style="position: absolute; bottom: 15px; width: 70% !important; z-index: 999">
      <div class="col-xl-2 col-md-6 col-sm-12">
        <div class="card text-white bg-success mb-3 ">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Total Kapal</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">{{ stats.total_ship }}</h1>
                </div>
              </div>
              <span class="badge bg-label-success rounded p-2">
                <i class="ti ti-ship ti-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-2 col-md-6 col-sm-12">
        <div class="card bg-warning text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Kapal Masuk</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">{{ stats.total_checkin }}</h1>
                </div>
              </div>
              <a href="">
                <span class="badge bg-label-warning rounded p-2">
                  <i class="ti ti-ship ti-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-2 col-md-6 col-sm-12">
        <div class="card bg-primary text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Kapal Keluar</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">{{ stats.total_checkout }}</h1>
                </div>
              </div>
              <a href="">
                <span class="badge bg-label-primary rounded p-2">
                  <i class="ti ti-ship ti-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-2 col-md-6 col-sm-12">
        <div class="card bg-danger text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Kapal Fraud</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">{{ stats.total_fraud }}</h1>
                </div>
              </div>
              <a href="">
                <span class="badge bg-label-danger rounded p-2">
                  <i class="ti ti-bug ti-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAP -->
    <!-- <div
        style="
          height: 87.6vh;
          width: 100vw;
          margin-left: -330px;
          /* margin-top: -200px; */
          z-index: 0 !important;
        "
      >
        <l-map
          ref="map"
          v-model:zoom="zoom"
          :center="[-6.846155, 109.128892]"
          style="z-index: 0 !important"
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
      </div> -->

    <!-- <div class="d-flex text-center" style="height: 15vh">
        <div class="m-auto">
          <h4>YOUR POSITION</h4>
          <h3>LATITUDE: {{ currPos.lat.toFixed(2) }}, LONGITUDE: {{ currPos.lng.toFixed(2) }}</h3>
        </div>
        <div class="m-auto">
          <h4>Clicked Position</h4>
          <span v-if="otherPos">
            LATITUDE: {{ otherPos.lat.toFixed(2) }}, LONGITUDE: {{ otherPos.lng.toFixed(2) }}
          </span>
          <span v-else> Click Map to Select a Position </span>
        </div>
      </div> -->

    <div ref="mapDiv" style="position: absolute; height: 89.5vh; width: 100vw; margin-left: -25px; margin-top: -25px;=" />
  </div>
</template>

<script>
/* eslint-disable no-undef */

import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useGeolocation } from '../useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
// import { Carousel3d, Slide } from 'vue-carousel-3d'

// AIzaSyB-KuyteYp1DYW8KdRT6L1M7nB_GfAER00
const GOOGLE_MAPS_API_KEY = 'AIzaSyB-KuyteYp1DYW8KdRT6L1M7nB_GfAER00'

export default {
  name: 'HomeAdmin',
  data() {
    return {
      stats: [],
      center: { lat: 51.093048, lng: 6.84212 }
    }
  },

  setup() {
    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: -6.846155,
      lng: 109.128892
    }))

    // const otherPos = ref(null)
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)

    let map = ref(null)
    let clickListener = null

    onMounted(async () => {
      await loader.load()
      new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 16
      })
      // clickListener = map.value.addListener(
      //   'click',
      //   ({ latLng: { lat, lng } }) =>
      //   (otherPos.value = { lat: lat(), lng: lng() })
      // )
    })
    // onMounted(async () => {
    //   if (clickListener) clickListener.remove()
    // })

    return { currPos, mapDiv }
  },

  mounted() {
    this.getStatistics()
  },

  methods: {
    getStatistics() {
      axios
        .get('api/v1/dashboard/statistic', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.stats = res.data.data
          console.log('Status : ' + res.data.meta.code + '\n' + res.data.meta.message)
        })
        .catch((error) => {
          console.log('Error : ' + error.response.data.meta.message)
        })
    }
  },

  components: {
    // LMap,
    // LTileLayer,
    // LPolygon
    // 'carousel-3d': window['carousel-3d'].Carousel3d,
    // 'slide': window['carousel-3d'].Slide
  }
}
</script>
