<template>
  <div class="row">
    <div class="col-12">
      <div class="card mb-4">
        <div style="height: 600px">
          <div id="map" style="height: 100%; width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import markerKapal from '../../assets/img/ship-marker.png'
import markerNelayan from '../../assets/img/fisherman-marker.png'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  name: 'MapShipDetail',

  data() {
    return {
      latlngs: []
    }
  },

  props: {
    shipCurLat: Number, // Specify the data type if you know it
    shipCurLong: Number,
    shipOnGround: Number
  },

  mounted() {
    this.getGeofence(),
      setTimeout(() => {
        this.mapShipDetail()
      }, 100)
  },

  methods: {
    async getGeofence() {
      await axios
        .get('api/v1/setting/web', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.geofence = res.data.data.geofences
          this.fixGeofence = this.geofence.map((item) => [
            parseFloat(item.lat),
            parseFloat(item.long)
          ])
        })
        .catch((error) => {
          console.log('Get geofence failure. Retrying in 1 seconds...', error)

          setTimeout(() => {
            this.getGeofence()
          }, 1000)
          return
        })
    },

    async mapShipDetail() {
      this.leaflet_map = L.map('map', {}).setView([this.shipCurLat, this.shipCurLong], 5)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxNativeZoom: 19,
        maxZoom: 30
      }).addTo(this.leaflet_map)

      var polygon = L.polygon(this.fixGeofence, {
        color: '#7367F0',
        fillColor: '#A1B4FF',
        fillOpacity: 0.5
      }).addTo(this.leaflet_map)

      this.leaflet_map.fitBounds(polygon.getBounds()) // initial center polgon

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

      this.leaflet_map.flyTo([this.shipCurLat, this.shipCurLong], 18, {
        duration: 3
      })
    }
  }
}
</script>
