<template>
  <div style="position: relative; height: 800px">
    <div id="map" style="height: 100%; width: 100%; border-radius: 10px; z-index: 0"></div>

    <div class="col-xl-6 col-md-6 cols-sm-12 mx-auto" style="position: absolute; top: 92%; left: 50%; transform: translate(-50%, -50%); z-index: 1">
      <div class="row" style="background: rgba(0, 0, 0, 0.453); padding: 10px; border-radius: 10px">
        <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12">
          <div class="input-group input-daterange" id="bs-datepicker-daterange">
            <input type="date" placeholder="MM/DD/YYYY" class="form-control" v-model="dateStart" />
            <span class="input-group-text">to</span>
            <input type="date" placeholder="MM/DD/YYYY" class="form-control" v-model="dateEnd" />
          </div>
        </div>
        <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12">
          <button class="btn btn-secondary d-grid w-100" type="submit" @click="filterHistory()">Lihat History</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import markerKapal from "@/assets/images/ship-marker.png"
import markerNelayan from "@/assets/images/fisherman-marker.png"
import markerStart from "@/assets/images/start.png"
import markerFinish from "@/assets/images/finish.png"

import axios from "axios"
import Swal from "sweetalert2"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default {
  name: "MapShipDetail",

  data() {
    // Function to format date as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    }

    // Get the current date
    const currentDate = new Date()

    // Calculate the date for a week ago
    const weekAgoDate = new Date(currentDate)
    weekAgoDate.setDate(weekAgoDate.getDate() - 7)

    return {
      dateStart: formatDate(weekAgoDate),
      dateEnd: formatDate(currentDate),
      polyline: null
    }
  },

  props: {
    shipCurLat: Number,
    shipCurLong: Number,
    shipOnGround: Number,
    locationLogs: Number
  },

  mounted() {
    this.getGeofence(),
      setTimeout(() => {
        this.mapShipDetail()
      }, 200)
  },

  methods: {
    async getGeofence() {
      await axios
        .get("api/v1/setting/web", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((res) => {
          this.geofence = res.data.data.geofences
          this.fixGeofence = this.geofence.map((item) => [parseFloat(item.lat), parseFloat(item.long)])
        })
        .catch((error) => {
          console.log("Get geofence failure. Retrying in 1 seconds...", error)
          return
        })
    },

    async mapShipDetail() {
      if (this.fixGeofence && !this.leaflet_map) {
        const mapElement = document.getElementById("map")
        if (!mapElement) {
          console.error("Map element not found in the document.")
          return
        }

        this.leaflet_map = L.map(mapElement).setView([this.shipCurLat, this.shipCurLong], 18)

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxNativeZoom: 19,
          maxZoom: 30,
          minZoom: 5
        }).addTo(this.leaflet_map)

        // Add polygon
        var polygon = L.polygon(this.fixGeofence, {
          color: "#7367F0",
          fillColor: "#A1B4FF",
          fillOpacity: 0.5
        }).addTo(this.leaflet_map)

        this.leaflet_map.fitBounds(polygon.getBounds())
        this.leaflet_map.flyTo([this.shipCurLat, this.shipCurLong], 18, {
          duration: 3
        })

        var iconKapal = L.icon({
          iconUrl: markerKapal,
          iconSize: [35, 50]
        })

        var iconNelayan = L.icon({
          iconUrl: markerNelayan,
          iconSize: [35, 50]
        })

        var icon = this.shipOnGround === 1 ? iconNelayan : iconKapal
        L.marker([this.shipCurLat, this.shipCurLong], { icon: icon }).addTo(this.leaflet_map)
      } else if (this.leaflet_map) {
        this.leaflet_map.flyTo([this.shipCurLat, this.shipCurLong], 18, {
          duration: 3
        })
      }
    },

    async filterHistory() {
      console.log(this.dateStart, '-', this.dateEnd)

      if (this.locationLogs) {
        const filteredLogs = this.locationLogs.filter((log) => {
          const dateLog = log.created_at.split(" ")[0]
          return (!this.dateStart || dateLog >= this.dateStart) && (!this.dateEnd || dateLog <= this.dateEnd)
        })

        console.log("logList", filteredLogs)

        const Toast = Swal.mixin({
          toast: true,
          position: "top-center",
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
          title: `Get ${filteredLogs.length} lokasi`
        })

        const firstLog = filteredLogs[filteredLogs.length - 1]
        const lastLog = firstLog

        console.log("📍START", firstLog)
        console.log("🚩END", lastLog)

        const iconKapal = L.icon({
          iconUrl: markerKapal,
          iconSize: [35, 50]
        })

        const iconNelayan = L.icon({
          iconUrl: markerNelayan,
          iconSize: [35, 50]
        })

        const markers = []

        // Iterate over the filteredLogs array
        filteredLogs.forEach((log) => {
          const { lat, long, on_ground } = log
          const icon = on_ground === 1 ? iconNelayan : iconKapal

          const marker = L.marker([parseFloat(lat), parseFloat(long)], { icon: icon })
          markers.push(marker)
          marker.addTo(this.leaflet_map)

          marker.on("click", () => {
            this.leaflet_map.flyTo([parseFloat(lat), parseFloat(long)], 18, {
              duration: 1
            })
          })
        })

        if (markers.length > 0) {
          // Get the first and last markers
          const firstMarker = markers[0]
          const lastMarker = markers[markers.length - 1]

          // Change the icons of the first and last markers
          lastMarker.setIcon(L.icon({ iconUrl: markerStart, iconSize: [70, 70] }))
          firstMarker.setIcon(L.icon({ iconUrl: markerFinish, iconSize: [70, 70] }))

          // Set a high z-index offset for both markers
          lastMarker.setZIndexOffset(1000)
          firstMarker.setZIndexOffset(1001)
        }

        // Create a polyline using the coordinates of the markers
        L.polyline(
          markers.map((marker) => marker.getLatLng()),
          { dashArray: "5, 5", color: "blue" } // Customize the dashed line appearance
        ).addTo(this.leaflet_map)
      } else {
        console.warn("⚠️ DOCK LOGS NULL / UNDEFINED:")

        const Toast = Swal.mixin({
          toast: true,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "warning",
          title: "Log Kapal Kosong"
        })
      }
    }
  }
}
</script>

<style>
.custom-icon-class {
  font-size: 20px;
}
</style>
