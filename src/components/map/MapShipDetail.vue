<template>
  <div style="position: relative; height: 500px; border-radius: 20px">
    <div id="map" style="height: 100%; width: 100%; border-radius: 20px; z-index: 0;"></div>

    <div class="col-xl-6 col-md-6 cols-sm-12 mx-auto" style="position: absolute; top: 90%; left: 50%; transform: translate(-50%, -50%); z-index: 1">
      <div class="row" style="background: rgba(0, 0, 0, 0.453); padding: 10px; border-radius: 10px">
        <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12">
          <div class="input-group input-daterange" id="bs-datepicker-daterange">
            <input type="date" placeholder="MM/DD/YYYY" class="form-control" v-model="dateStart" />
            <span class="input-group-text">to</span>
            <input type="date" placeholder="MM/DD/YYYY" class="form-control" v-model="dateEnd" />
          </div>
        </div>
        <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12">
          <button class="btn btn-secondary d-grid w-100" type="submit" @click="onSubmit()">Lihat History</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import markerKapal from "@/assets/images/ship-marker.png"
import markerNelayan from "@/assets/images/fisherman-marker.png"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default {
  name: "MapShipDetail",

  data() {
    return {
      // latlngs: [],
      dateStart: null,
      dateEnd: null,
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
      if (!this.leaflet_map) {
        this.leaflet_map = L.map("map", {}).setView([this.shipCurLat, this.shipCurLong], 18)
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxNativeZoom: 19,
          maxZoom: 30
        }).addTo(this.leaflet_map)

        var polygon = L.polygon(this.fixGeofence, {
          color: "#7367F0",
          fillColor: "#A1B4FF",
          fillOpacity: 0.5
        }).addTo(this.leaflet_map)

        this.leaflet_map.fitBounds(polygon.getBounds()) // initial center polgon
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
      } else {
        this.leaflet_map.flyTo([this.shipCurLat, this.shipCurLong], 18, {
          duration: 3
        })
      }
    },

    async onSubmit() {
      console.log(this.dateStart)
      console.log(this.dateEnd)

      const filteredLogs = this.locationLogs.filter((log) => {
        const dateLog = log.created_at.split(" ")[0]
        return (!this.dateStart || dateLog >= this.dateStart) && (!this.dateEnd || dateLog <= this.dateEnd)
      })

      console.log("logList", filteredLogs)

      var iconKapal = L.icon({
        iconUrl: markerKapal,
        iconSize: [15, 30]
      })

      const iconNelayan = L.divIcon({
        html: '<i class="pi pi-circle-fill" style="font-size: 1rem; color:black"></i>',
        iconSize: [5, 5], // Set the size of the icon
        className: "custom-icon-class" // Optional: Add a custom class for styling
      })

      const markers = []

      this.locationLogs.forEach((filteredLogs) => {
        const { lat, long, on_ground } = filteredLogs
        const icon = on_ground === 1 ? iconNelayan : iconKapal

        const marker = L.marker([parseFloat(lat), parseFloat(long)], { icon: icon })
        markers.push(marker)
        marker.addTo(this.leaflet_map)
      })

      this.polyline = L.polyline(
        markers.map((marker) => marker.getLatLng()),
        { color: "blue" }
      ).addTo(this.leaflet_map)
    }
  }
}
</script>
