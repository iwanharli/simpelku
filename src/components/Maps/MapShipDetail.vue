<template>
  <div class="row">
    <div class="col-12">
      <div class="card mb-4">
        <div style="height: 600px">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import L from 'leaflet'
import harbourMarker from '../../../public/assets/img/harbour-marker.png'
import boatMarker from '../../../public/assets/img/sailing-boat.png'
import { computed, onMounted, ref } from 'vue'

export default {
  props: ['shipCurrentPositionValue'],

  data() {
    return {
      // map: null,
      center: { lat: 51.093048, lng: 6.84212 }
    }
  },

  setup() {
    
  },

  mounted() {
    
  },

  methods: {
    initializeMap() {
      this.map = L.map('map').setView([-6.846459, 109.128871], 16)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map)

      var latlngs = [
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
      ]
      // var polygon = L.polygon(latlngs, { color: 'red' }).addTo(map)

      // zoom the map to the polygon
      // map.fitBounds(polygon.getBounds())
    },

    fetchAreas() {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      axios
        .get(`/api/v1/ship/detail/${this.shipCurrentPositionValue}`, config)
        .then((response) => {
          const data = response.data

          console.log('TEST', data)
          // if (data.status === 'success') {
          //   this.areas = data.data

          //   this.areas.forEach((area) => {
          //     const markerIcon = L.icon({
          //       iconUrl: harbourMarker,
          //       iconSize: [32, 32]
          //     })
          //     const coordinates = area.coordinates.map((coord) => [
          //       parseFloat(coord.lat),
          //       parseFloat(coord.long)
          //     ])
          //     const polygon = L.polygon(coordinates).addTo(this.map)
          //     const center = polygon.getBounds().getCenter()
          //     const marker = L.marker(center, { icon: markerIcon }).addTo(this.map)
          //     marker.bindTooltip(area.Name, { permanent: true })
          //   })
          // }
        })
        .catch((error) => {
          console.error('Error fetching areas:', error)
        })
    }
  }
}
</script>

<style>
#map {
  height: 600px;
}
</style>
