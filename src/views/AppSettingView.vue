<template>
  <div
    class="container-fluid flex-grow-1 container-p-y"
    style="z-index: 1; margin-left: 150px; margin-right: 150px"
  >
    <div class="row">
      <div class="col">
        <div class="card mb-3">
          <div class="card-header">
            <ul
              class="nav nav-tabs card-header-tabs"
              role="tablist"
              style="display: flex; justify-content: center"
            >
              <li class="nav-item" style="text-align: center; padding-right: 10px">
                <button
                  class="nav-link active btn-header"
                  data-bs-toggle="tab"
                  data-bs-target="#form-tabs-pengaturan-aplikasi"
                  role="tab"
                  aria-selected="true"
                  @click="toggleMapTab"
                >
                  <i class="ti ti-device-mobile-share"></i> &nbsp; APLIKASI
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link btn-header"
                  data-bs-toggle="tab"
                  data-bs-target="#form-tabs-pengaturan-geofence"
                  role="tab"
                  aria-selected="false"
                  @click="toggleMapTab"
                >
                  <i class="ti ti-map-cog"></i> &nbsp; GEOFENCE
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content">
            <!-- FORM -->
            <div
              class="tab-pane fade active show"
              id="form-tabs-pengaturan-aplikasi"
              role="tabpanel"
            >
              <div class="col-xl-10 mx-auto">
                <form class="row g-4" @submit.prevent="updateMobileSetting">
                  <div class="col-md-12" style="color: black; text-align: right">
                    <div class="card-action-element">
                      <button
                        class="btn btn-sm btn-warning"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modalQuestionSetting"
                      >
                        CARA PENGISIAN DATA &nbsp;&nbsp; <i class="ti ti-help-octagon"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">KODE PELABUHAN </label>
                    <input type="text" class="form-control" v-model="harbourCode" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">NAMA PELABUHAN</label>
                    <input type="text" class="form-control" v-model="harbourName" />
                  </div>
                  <p></p>
                  <div class="col-md-12">
                    <div class="row g-3">
                      <input type="hidden" v-model="appMode" name="selectedMode" />

                      <div class="col-md">
                        <div class="form-check custom-option custom-option-icon">
                          <label
                            class="form-check-label custom-option-content"
                            for="customRadioIcon1"
                          >
                            <span class="custom-option-body">
                              <i class="ti ti-clock-filled"></i>
                              <span class="custom-option-title"> Interval </span>
                              <small> Data dikirim dengan mode interval </small>
                            </span>
                            <input
                              name="customRadioIcon"
                              class="form-check-input"
                              type="radio"
                              v-bind:checked="isCheckedMode('interval')"
                              v-on:change="updateSelectedMode('interval')"
                            />
                          </label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="30"
                            v-model="appInterval"
                          />
                          <label for="floatingInput" style="font-weight: 900"
                            >Interval dalam (detik)</label
                          >
                        </div>
                      </div>
                      <div class="col-md">
                        <div class="form-check custom-option custom-option-icon">
                          <label
                            class="form-check-label custom-option-content"
                            for="customRadioIcon2"
                          >
                            <span class="custom-option-body">
                              <i class="ti ti-bounce-right-filled"></i>
                              <span class="custom-option-title"> Jarak </span>
                              <small> Data dikirim ketika kapal berada pada jarak tertentu </small>
                            </span>
                            <input
                              name="customRadioIcon"
                              class="form-check-input"
                              type="radio"
                              v-bind:checked="isCheckedMode('distance')"
                              v-on:change="updateSelectedMode('distance')"
                            />
                          </label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="10"
                            v-model="appRange"
                          />
                          <label for="floatingInput" style="font-weight: 900"
                            >Jarak dalam (meter)</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <p></p>
                  <div class="col-md-6">
                    <label class="form-label"> VERSI MINIMAL APK </label>
                    <input type="text" class="form-control" v-model="appVersion" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label"> URL UNDUH APK </label>
                    <input class="form-control typeahead" type="text" v-model="appUrl" />
                  </div>
                  <p></p>
                  <div class="col-10">
                    <button class="btn btn-primary d-grid w-100" type="submit">
                      Simpan Perubahan
                    </button>
                  </div>
                  <div class="col-2">
                    <button class="btn btn-danger d-grid w-100" type="submit" @click="resetSetting">
                      RESET
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- GEOFENCE -->
            <div class="tab-pane fade" id="form-tabs-pengaturan-geofence" role="tabpanel">
              <div class="col-xl-12">
                <Splitter style="height: 820px">
                  <SplitterPanel
                    class="flex align-items-center justify-content-center scrollbar"
                    :size="33"
                    style="overflow-y: auto; max-width: 1000px"
                  >
                    <div v-if="this.fixGeofence">
                      <div class="card" style="margin-top: 520px">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Dots</th>
                              <th>Latitude</th>
                              <th>Longitude</th>
                            </tr>
                          </thead>
                          <tbody class="table-border-bottom-0">
                            <tr v-for="(coordinate, index) in fixGeofence" :key="index">
                              <td>{{ index }}</td>
                              <td>{{ coordinate[0] }}</td>
                              <td>{{ coordinate[1] }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </SplitterPanel>
                  <SplitterPanel class="flex align-items-center justify-content-center" :size="75">
                    <div
                      id="map"
                      style="height: 100%; width: 100%"
                      ref="map"
                      @ready="initializeMap"
                    ></div>
                  </SplitterPanel>
                </Splitter>

                <div class="row justify-content-end" style="margin-top: 10px; margin-right: 10px">
                  <div class="col-8">
                    <button class="btn btn-primary d-grid w-100" @click="onSaveButtonClick()">
                      UBAH GEOFENCE LABUH
                    </button>
                  </div>
                  <!-- <div class="col-2">
                    <button class="btn btn-danger d-grid w-100" @click="resetSetting">RESET</button>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <WaveComponent />
</template>

<script>
import axios from 'axios'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
// import 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.js'
// import Swaler from 'sweetalert2'

import OrganizationChart from 'primevue/organizationchart'
import WaveComponent from '../components/Items/WaveItem.vue'
import harbourMarker from '/src/assets/img/harbour-marker.png'

export default {
  data() {
    return {
      map: null,
      mobileSettings: {},
      harbourCode: '',
      harbourName: '',
      appMode: '',
      appInterval: '',
      appRange: '',
      appVersion: '',
      appUrl: '',
      appGeofence: [],
      fixGeofence: [],
      transformedArray: []
    }
  },

  mounted() {
    this.getSettingApp()
  },

  computed: {
    isCheckedMode: function () {
      return function (value) {
        return this.appMode === value
      }
    }
  },

  methods: {
    toggleMapTab() {
      if (!this.mapInitialized) {
        this.initializeMap()
        this.mapInitialized = true
      }
    },

    async initializeMap() {
      this.fixGeofence = this.appGeofence.map((item) => [
        parseFloat(item.lat),
        parseFloat(item.long)
      ])

      this.fixGeofence.forEach((coordinate, index) => {
        const [latitude, longitude] = coordinate
        // console.log(`Index: ${index}, Lat: ${latitude}, Long: ${longitude}`)
      })

      const latlng = [-6.847556, 109.128828]
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxNativeZoom: 19,
        maxZoom: 30,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })

      const map = L.map('map', { preferCanvas: true }).setView(latlng, 17).addLayer(tiles)

      map.flyTo(latlng, 16, {
        duration: 2
      })

      map.pm.setLang('id')
      map.pm.addControls({
        drawPolygon: true,
        removalMode: true,
        editMode: true,
        drawMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawText: false,
        cutPolygon: true
      })

      const p1 = L.polygon(this.fixGeofence, {
        pmIgnore: true,
        color: 'red',
        fillColor: '#A1B4FF',
        fillOpacity: 0
      })
      const pEdit = L.polygon(this.fixGeofence)
      const layerGroup = L.featureGroup([p1, pEdit]).addTo(map)

      layerGroup.addLayer(pEdit)

      map.on('pm:create', (e) => {
        console.log(e.layer._latlngs[0])

        const addPolygon = e.layer._latlngs[0]
        this.transformedArray = addPolygon.map((coordinate) => ({
          long: `${coordinate.lng}`,
          lat: `${coordinate.lat}`
        }))
      })

      layerGroup.on('pm:markerdragend', (e) => {
        console.log(e.layer._latlngs[0])

        const editedPolygon = e.layer._latlngs[0]
        // layerGroup.bindPopup(`<p>${JSON.stringify(editedPolygon)}</p>`)

        this.transformedArray = editedPolygon.map((coordinate) => ({
          long: `${coordinate.lng}`,
          lat: `${coordinate.lat}`
        }))
      })

      layerGroup.on('pm:remove', (e) => {
        // console.log(e)
        this.transformedArray = [{ long: '0', lat: '0' }]
      })

      layerGroup.on('pm:cut', (e) => {
        console.log(e.originalLayer._latlngs[0])

        const cuttedPolygon = e.layer._latlngs[0]
        // layerGroup.bindPopup(`<p>${JSON.stringify(editedPolygon)}</p>`)

        this.transformedArray = cuttedPolygon.map((coordinate) => ({
          long: `${coordinate.lng}`,
          lat: `${coordinate.lat}`
        }))
      })

      layerGroup.pm.enable({
        allowSelfIntersection: false
      })
    },

    onSaveButtonClick() {
      this.toggleMapTab()
      console.log(this.transformedArray)

      const updatedData = {
        harbour_code: parseInt(this.harbourCode),
        harbour_name: this.harbourName,
        mode: this.appMode,
        apk_min_version: this.appVersion,
        interval: parseInt(this.appInterval),
        range: parseInt(this.appRange),
        apk_download_link: this.appUrl,
        geofence: this.transformedArray
      }

      axios
        .post('api/v1/setting/create-or-update', updatedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Data updated successfully', response)
          this.getSettingApp()
        })
        .catch((error) => {
          console.error('Error updating data:', error)
        })
    },

    getSettingApp() {
      axios
        .get('api/v1/setting/web', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.harbourCode = res.data.data.harbour_code
          this.harbourName = res.data.data.harbour_name
          this.appMode = res.data.data.mode
          this.appInterval = res.data.data.interval
          this.appRange = res.data.data.range
          this.appVersion = res.data.data.apk_min_version
          this.appUrl = res.data.data.apk_min_download

          this.appGeofence = res.data.data.geofences

          console.clear()
          console.log('DATA SETTING FETCHED')
        })
        .catch((error) => {
          setTimeout(this.getSettingApp, 1000)

          console.error('Error: ' + error.response.data.meta.message)

          if (error.response.data.meta.message === 'Unauthorized') {
            localStorage.setItem('authenticated', false.toString())
            localStorage.removeItem('token')

            window.location.reload()
            router.push({ name: 'login' })
          }
        })
    },

    updateMobileSetting() {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

      const updatedData = {
        harbour_code: parseInt(this.harbourCode),
        harbour_name: this.harbourName,
        mode: this.appMode,
        apk_min_version: this.appVersion,
        interval: parseInt(this.appInterval),
        range: parseInt(this.appRange),
        apk_download_link: this.appUrl,
        geofence: []
      }

      axios
        .post('api/v1/setting/create-or-update', updatedData, config)
        .then((response) => {
          console.log('Data updated successfully', response)

          this.getSettingApp()
        })
        .catch((error) => {
          console.error('Error updating data:', error)
        })
    },

    updateSelectedMode(mode) {
      this.appMode = mode
    },

    resetSetting() {
      // INITIAL RESET FORM

      const coordinate = [
        { long: '109.127111', lat: '-6.84803' },
        { long: '109.127213', lat: '-6.84493' },
        { long: '109.127412', lat: '-6.844399' },
        { long: '109.127916', lat: '-6.843839' },
        { long: '109.128222', lat: '-6.843522' },
        { long: '109.128479', lat: '-6.843405' },
        { long: '109.128805', lat: '-6.843397' },
        { long: '109.129482', lat: '-6.843378' },
        { long: '109.130108', lat: '-6.843815' },
        { long: '109.130499', lat: '-6.844419' },
        { long: '109.130567', lat: '-6.845571' },
        { long: '109.130598', lat: '-6.848934' },
        { long: '109.130019', lat: '-6.849089' },
        { long: '109.129794', lat: '-6.850875' },
        { long: '109.129584', lat: '-6.851462' },
        { long: '109.127807', lat: '-6.851276' },
        { long: '109.127907', lat: '-6.850367' },
        { long: '109.12923', lat: '-6.850528' },
        { long: '109.129368', lat: '-6.849406' },
        { long: '109.12804', lat: '-6.849238' },
        { long: '109.12814', lat: '-6.848195' },
        { long: '109.127142', lat: '-6.848085' }
      ]

      this.harbourCode = 919191
      this.harbourName = 'PELABUHAN TEGALSARI'
      this.appMode = 'interval'
      this.appInterval = 30
      this.appRange = 2
      this.appVersion = '2.0'
      this.appUrl = 'https://demo.t-hisyam.net/apk/simpel/app-release.apk'
      this.appGeofence = []

      console.log(this.appGeofence)

      console.log('FORM HAS BEEN RESET')
    }
  },

  components: {
    WaveComponent,
    OrganizationChart
  }
}
</script>

<style scoped>
.blink_me {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.scrollbar {
  overflow-x: hidden;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
}

.scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 132, 255, 0.204);
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #7367f0;
  border-radius: 20px;
  /* border: 3px solid rgb(89, 0, 255); */
}

.btn-header {
  background-color: #ffffff00; /* Default background color */
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.7s; /* Smooth transition effect */
  font-weight: bolder;
  margin-right: 10px !important;
}
.btn-header.active {
  color: white;
  background-color: #7367f0;
  font-weight: bolder;
}
</style>
