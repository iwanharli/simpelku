<template>
  <div class="container-xxl flex-grow-1 container-p-y">
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
                  @click="destroyMap()"
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
                  @click="initializeMap()"
                >
                  <i class="ti ti-map-cog"></i> &nbsp; GEOFENCE
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content">
            <div
              class="tab-pane fade active show"
              id="form-tabs-pengaturan-aplikasi"
              role="tabpanel"
            >
              <div class="col-12">
                <form class="row g-3" @submit.prevent="updateMobileSetting">
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
                  <div class="col-md-12" style="display: none">
                    <label class="form-label"> GEOFENCE </label>
                    <textarea class="form-control" rows="6" v-model="appGeofence"> </textarea>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary d-grid w-100" type="submit">
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- /FormValidation -->

            <!-- Personal Info -->
            <div class="tab-pane fade" id="form-tabs-pengaturan-geofence" role="tabpanel">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <WaveComponent />
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
// import Swaler from 'sweetalert2'

import WaveComponent from '../components/Items/WaveItem.vue'
import harbourMarker from '../../public/assets/img/harbour-marker.png'

// const Swal = new Swaler()

export default {
  data() {
    return {
      map: null,
      mobileSettings: {},

      harbourCode: '',
      harbourName: '',
      appInterval: '',
      appRange: '',
      appVersion: '',
      appUrl: '',
      appGeofence: [],
      appMode: '',
      polygonLayer: null
      // selectedMode: '',
      // areas: [],
      // drawingMode: false,
      // areaName: ''
    }
  },

  mounted() {
    // this.initializeMap()
    // this.fetchAreas()
  },

  computed: {
    isCheckedMode: function () {
      return function (value) {
        return this.appMode === value
      }
    }
  },

  created() {
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

        console.log('Status : ' + res.data.meta.code + '\n' + res.data.meta.message)
        this.fetchAreas()
      })
      .catch((error) => {})
  },

  methods: {
    initializeMap() {
      this.map = L.map('map').setView([-6.847109, 109.128871], 16)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map)

      this.areas = this.appGeofence

      console.log('areas', this.areas)
    },

    updateMobileSetting() {
      const customHeaders = {
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
        geofence: this.appGeofence
      }

      console.log(updatedData)

      axios
        .post('api/v1/setting/create-or-update', updatedData, customHeaders)
        .then((response) => {
          console.log('Data updated successfully', response)
          location.reload()
        })
        .catch((error) => {
          console.error('Error updating data:', error)
        })
    },

    updateSelectedMode(mode) {
      this.appMode = mode
    }
  },

  components: {
    WaveComponent
  }
}
</script>

<style scoped>
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

#map {
  height: 600px;
  border-radius: 20px;
}
</style>
