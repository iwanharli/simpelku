<template>
  <div class="containerPage bg-secondary" style="padding-top: 40px !important;">
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
      <div class="card-body p-0 bg-secondary">
        <div id="map" style="height: 100%; width: 100%; min-height: 740px; border-radius: 0px 0px 10px 10px;" ref="map" @ready="initializeMap"></div>
        <b-row class="mt-3">
          <div class="col-8">
            <button class="btn btn-primary d-grid w-100" @click="onSaveButtonClick()">UBAH GEOFENCE LABUH</button>
          </div>
          <div class="col-4">
            <button class="btn btn-warning w-100" type="submit" @click="resetSetting()">RESET</button>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"

import markerKapal from "@/assets/images/ship-marker.png"
import markerNelayan from "@/assets/images/fisherman-marker.png"

export default {
  data() {
    return {
      map: null,
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

    setTimeout(() => {
      this.toggleMapTab()
    }, 100)
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

          setTimeout(() => {
            location.reload(true)
          }, 2000)
        })
        .catch((error) => {
          console.error("Error updating data:", error)
        })
    },

    async getSettingApp() {
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

    async resetSetting() {
      // INITIAL
      this.harbourCode = 919191
      this.harbourName = "PELABUHAN TEGALSARI"
      this.appMode = "interval"
      this.appInterval = 30
      this.appRange = 2
      this.appVersion = "2.5.0"
      this.appUrl = "https://demo.t-hisyam.net/apk/simpel/app-release.apk"
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

      // UPDATING
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      const updatedData = {
        harbour_code: parseInt(this.harbourCode),
        harbour_name: this.harbourName,
        mode: this.appMode,
        apk_min_version: this.appVersion,
        interval: parseInt(this.appInterval),
        range: parseInt(this.appRange),
        apk_download_link: this.appUrl,
        geofence: coordinate
      }

      await axios
        .post("api/v1/setting/create-or-update", updatedData, config)
        .then((response) => {
          Swal.fire({
            title: "Terimakasih!",
            text: "Setting telah berhasil direset 😊",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })

          setTimeout(() => {
            location.reload(true)
          }, 2000)

          console.log("🚀 RESET SUCCESS", response)
        })
        .catch((error) => {
          console.error("💥 RESET FAILED:", error)
        })

      console.log("FORM HAS BEEN RESET")
    }
  }
}
</script>
