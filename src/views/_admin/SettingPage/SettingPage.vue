<template>
  <div class="containerPage bg-secondary" style="padding-top: 40px !important" data-aos="fade-down" data-aos-delay="110">
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12" class="mb-3">
        <div class="card-header" style="border-radius: 20px; font-weight: bolder">
          <ul class="nav nav-tabs card-header-tabs bg-soft-dark pt-3 pb-3" role="tablist" style="display: flex; justify-content: center; border-radius: 20px; border: 5px solid white">
            <li class="nav-item" style="padding-right: 10px">
              <button class="nav-link btn-header active" data-bs-toggle="tab" data-bs-target="#form-tabs-app" role="tab" aria-selected="false" @click="toggleMapTab"><i class="ti ti-device-mobile-share"></i> &nbsp; APLIKASI</button>
            </li>
            <li class="nav-item" style="padding-right: 10px">
              <button class="nav-link btn-header" data-bs-toggle="tab" data-bs-target="#form-tabs-geofence" role="tab" aria-selected="false" @click="toggleMapTab"><i class="ti ti-map-cog"></i> &nbsp; GEOFENCE</button>
            </li>
          </ul>
        </div>
      </b-col>

      <!-- APLIKASI  -->
      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="tab-content">
          <div class="tab-pane fade active show" id="form-tabs-app" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-primary text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">SETTING APLIKASI</h4>
                    </b-col>
                  </b-row>
                </div>
              </b-card-header>
              <div class="card-body p-5">
                <form @submit.prevent="updateMobileSetting">
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <label class="form-label" style="font-weight: bolder">KODE PELABUHAN</label>
                      <input type="text" class="form-control" v-model="harbourCode" required="" />
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label" style="font-weight: bolder">NAMA PELABUHAN</label>
                      <input type="text" class="form-control" v-model="harbourName" required="" />
                    </div>
                    <div class="col-md-12 mb-4">
                      <label class="form-label" style="font-weight: bolder">MODE</label>
                      <select class="form-select" v-model="mode" required="">
                        <option value="interval">Interval</option>
                        <option value="jarak">Jarak</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label" style="font-weight: bolder">INTERVAL</label>
                      <div class="form-floating">
                        <input type="number" class="form-control" id="floatingInput" placeholder="30" v-model="appInterval" required="" />
                        <label for="floatingInput" style="font-weight: 900">Interval dalam (detik)</label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label" style="font-weight: bolder">JARAK</label>
                      <div class="form-floating">
                        <input type="number" class="form-control" id="floatingInput" placeholder="30" v-model="appRange" required="" />
                        <label for="floatingInput" style="font-weight: 900">Jarak dalam (meter)</label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label" style="font-weight: bolder">VERSI MINIMAL APK</label>
                      <input type="text" class="form-control" v-model="appVersion" required="" />
                    </div>
                    <div class="col-md-6 mb-4">
                      <label class="form-label" style="font-weight: bolder">URL UNDUH APK</label>
                      <input type="text" class="form-control" v-model="appUrl" required="" />
                    </div>
                    <div class="col-md-8 mt-4">
                      <button class="btn btn-primary" type="submit" style="width: 100%">SIMPAN PERUBAHAN</button>
                    </div>
                    <div class="col-md-4 mt-4">
                      <button class="btn btn-danger" type="submit" style="width: 100%" @click="resetSetting">RESET</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <!-- GEOFENCE  -->
      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="tab-content">
          <div class="tab-pane fade" id="form-tabs-geofence" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-info text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">PENGATURAN GEOFENCING</h4>
                    </b-col>
                  </b-row>
                </div>
              </b-card-header>
              <div class="card-body p-0 bg-soft-secondary">
                <div id="map" style="height: 100%; width: 100%; min-height: 740px" ref="map" @ready="initializeMap"></div>

                <div class="p-3">
                  <button class="btn btn-primary d-grid w-100 mt-2 mb-2" @click="onSaveButtonClick()">UBAH GEOFENCE LABUH</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"
import AOS from "aos"
import { onMounted, ref } from "vue"

import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"

import markerKapal from "@/assets/images/ship-marker.png"
import markerNelayan from "@/assets/images/fisherman-marker.png"

export default {
  name: "SettingPage",
  setup() {
    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })
  },
  
  data() {
    return {
      // map: null,
      mobileSettings: {},
      harbourCode: "",
      harbourName: "",
      appMode: "",
      appInterval: "",
      appRange: "",
      appVersion: "",
      appUrl: "",
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
      this.fixGeofence = this.appGeofence.map((item) => [parseFloat(item.lat), parseFloat(item.long)])

      this.fixGeofence.forEach((coordinate, index) => {
        const [latitude, longitude] = coordinate
        // console.log(`Index: ${index}, Lat: ${latitude}, Long: ${longitude}`)
      })

      const latlng = [-6.847556, 109.128828]
      const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxNativeZoom: 19,
        maxZoom: 30,
        minZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })

      const map = L.map("map", { preferCanvas: true }).setView(latlng, 17).addLayer(tiles)

      map.flyTo(latlng, 15, {
        duration: 2
      })

      map.pm.setLang("id")
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
        color: "red",
        fillColor: "#A1B4FF",
        fillOpacity: 0
      })
      const pEdit = L.polygon(this.fixGeofence)
      const layerGroup = L.featureGroup([p1, pEdit]).addTo(map)

      layerGroup.addLayer(pEdit)

      map.on("pm:create", (e) => {
        console.log(e.layer._latlngs[0])

        const addPolygon = e.layer._latlngs[0]
        this.transformedArray = addPolygon.map((coordinate) => ({
          long: `${coordinate.lng}`,
          lat: `${coordinate.lat}`
        }))
      })

      layerGroup.on("pm:markerdragend", (e) => {
        console.log(e.layer._latlngs[0])

        const editedPolygon = e.layer._latlngs[0]
        // layerGroup.bindPopup(`<p>${JSON.stringify(editedPolygon)}</p>`)

        this.transformedArray = editedPolygon.map((coordinate) => ({
          long: `${coordinate.lng}`,
          lat: `${coordinate.lat}`
        }))
      })

      layerGroup.on("pm:remove", (e) => {
        // console.log(e)
        this.transformedArray = [{ long: "0", lat: "0" }]
      })

      layerGroup.on("pm:cut", (e) => {
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
        .post("api/v1/setting/create-or-update", updatedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          console.log("Data updated successfully", response)

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer
              toast.onmouseleave = Swal.resumeTimer
            }
          })
          Toast.fire({
            icon: "success",
            title: "Berhasil Ubah Geofence"
          })

          this.getSettingApp()
        })
        .catch((error) => {
          console.error("Error updating data:", error)
        })
    },

    getSettingApp() {
      axios
        .get("api/v1/setting/web", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
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

          // console.clear()
          console.log("DATA SETTING FETCHED")
        })
        .catch((error) => {
          setTimeout(this.getSettingApp, 1000)

          // console.error("Error: " + error.response.data.meta.message)
        })
    },

    updateMobileSetting() {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
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
        .post("api/v1/setting/create-or-update", updatedData, config)
        .then((response) => {
          console.log("Data updated successfully", response)

          this.getSettingApp()
        })
        .catch((error) => {
          console.error("Error updating data:", error)
        })
    },

    updateSelectedMode(mode) {
      this.appMode = mode
    },

    resetSetting() {
      // INITIAL RESET FORM

      const coordinate = [
        { long: "109.127111", lat: "-6.84803" },
        { long: "109.127213", lat: "-6.84493" },
        { long: "109.127412", lat: "-6.844399" },
        { long: "109.127916", lat: "-6.843839" },
        { long: "109.128222", lat: "-6.843522" },
        { long: "109.128479", lat: "-6.843405" },
        { long: "109.128805", lat: "-6.843397" },
        { long: "109.129482", lat: "-6.843378" },
        { long: "109.130108", lat: "-6.843815" },
        { long: "109.130499", lat: "-6.844419" },
        { long: "109.130567", lat: "-6.845571" },
        { long: "109.130598", lat: "-6.848934" },
        { long: "109.130019", lat: "-6.849089" },
        { long: "109.129794", lat: "-6.850875" },
        { long: "109.129584", lat: "-6.851462" },
        { long: "109.127807", lat: "-6.851276" },
        { long: "109.127907", lat: "-6.850367" },
        { long: "109.12923", lat: "-6.850528" },
        { long: "109.129368", lat: "-6.849406" },
        { long: "109.12804", lat: "-6.849238" },
        { long: "109.12814", lat: "-6.848195" },
        { long: "109.127142", lat: "-6.848085" }
      ]

      console.log(coordinate)

      this.harbourCode = 919191
      this.harbourName = "PELABUHAN TEGALSARI"
      this.appMode = "interval"
      this.appInterval = 30
      this.appRange = 2
      this.appVersion = "2.0"
      this.appUrl = "https://demo.t-hisyam.net/apk/simpel/app-release.apk"
      this.appGeofence = []

      console.log(this.appGeofence)

      console.log("FORM HAS BEEN RESET")
    }
  }
}
</script>
