<template>
  <div id="map" class="simpel-map-container">
    <div id="map"></div>
    <div id="shipDetailsDiv" class="simpel-ship-detail"></div>
  </div>
</template>
<script>
import L from "leaflet"
import axios from "axios"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster"

import markerKapal from "@/assets/images/ship-marker.png"
import markerNelayan from "@/assets/images/fisherman-marker.png"

export default {
  name: "MapDashboard",
  data() {
    return {
      stats: [],
      center: { lat: -6.846155, lng: 109.128892 },
      leaflet_map: null,
      leaflet_markers: [],
      leaflet_layerGroups: null,
      ship_collection: [],
      socket: null,
      ws_url: "ws://103.139.192.254:9016/api/v1/dashboard/ship-monitor/open-websocket",
      harbour_name: "PELABUHAN",
      harbour_geo: [],
      selectedShip: []
      // ws_url: "ws://localhost:8080",
    }
  },

  mounted() {
    this.getStatistics()

    setTimeout(() => {
      this.akuPeta()
      this.ws_container()
    }, 10)
  },

  unmounted() {
    console.log("tutup")
    this.socket.close()
  },

  methods: {
    async akuPeta() {
      console.log("PETA", L, [this.center.lat, this.center.lng])

      await this.mapZoomAnimFix()

      const tileOcean = "https://api.maptiler.com/maps/ocean/{z}/{x}/{y}.png?key=ufCf3dbMdr7VkfVI6gjQ"
      const tileTopo = "https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=ufCf3dbMdr7VkfVI6gjQ"
      const street = "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=ufCf3dbMdr7VkfVI6gjQ"

      this.leaflet_map = await L.map("map", {}).setView([this.center.lat, this.center.lng], 13)

      L.tileLayer(street, {
        maxNativeZoom: 19,
        maxZoom: 30,
        minZoom: 12,
        noWrap: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.leaflet_map)

      // L.marker([this.center.lat, this.center.lng])
      //   .addTo(this.leaflet_map)
      //   .bindPopup(this.harbour_name)
      //   .openPopup()

      // this.leaflet_layerGroups = L.layerGroup().addTo(this.leaflet_map)
      this.leaflet_layerGroups = L.markerClusterGroup().addTo(this.leaflet_map)

      this.getAppSetting()
    }, // end func

    async harbourEditor(geofence) {
      console.log("===============================", geofence)
      var fix_geofence = geofence.map((item) => [item.lat, item.long])

      var polygon = L.polygon(fix_geofence, {
        color: "#7367F0",
        fillColor: "#A1B4FF",
        fillOpacity: 0.5
      }).addTo(this.leaflet_map)
    },

    async markerEditor(ship) {
      try {
        if (this.leaflet_markers.hasOwnProperty(ship.ship_id)) {
          // Jika marker sudah ada, perbarui posisinya
          this.leaflet_markers[ship.ship_id].setLatLng([ship.geo[1], ship.geo[0]])

          // console.log("> UP MARKER \t", ship.ship_id, ship.ship_name, "\n> KOORDINAT \t", ship.geo, "\n> ON GROUND \t", ship.on_ground)
        } else {
          // Jika marker belum ada, buat marker baru dan tambahkan ke LayerGroup
          var iconKapal = L.icon({
            iconUrl: markerKapal,
            iconSize: [22, 42],
            iconAnchor: [16, 32]
          })

          var iconNelayan = L.icon({
            iconUrl: markerNelayan,
            iconSize: [35, 50]
          })

          console.log(ship)

          var marker = L.marker([ship.geo[1], ship.geo[0]], {
            icon: ship.on_ground === 1 ? iconNelayan : iconKapal
          })
            .addTo(this.leaflet_layerGroups)
            // .on("click", this.clickZoom)
            .on("click", function () {
              var currentUrl = window.location.href.replace("dashboard", "ship")

              console.log(currentUrl)
              document.getElementById("shipDetailsDiv").innerHTML = ""

              const shipDetail = document.createElement("div")

              shipDetail.innerHTML = `
              <div class='table-responsive p-5'>
                <table id="basic-table" class="table mb-0" role="grid">
                  <tr class='bg-soft-secondary' style='color:red;'>
                    <td class='text-center' style='font-weight: bolder;' colspan=2><h5>DETAIL KAPAL</h5></td>
                  </tr>
                  <tr>
                    <td style='font-weight: bolder;'>ID</td>
                    <td>${ship.ship_id}</td>
                  </tr>
                  <tr>
                    <td style='font-weight: bolder;'>KAPAL</td>
                    <td>${ship.ship_name}</td>
                  </tr>
                  <tr>
                    <td style='font-weight: bolder;'>DEVICE</td>
                    <td>${ship.device_id}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <a href="${currentUrl}/${ship.ship_id}" class="btn btn-sm btn-primary" type="button" style='width:100%'>
                        <i class="ti ti-search me-sm-1"></i> DETAIL
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              `

              document.getElementById("shipDetailsDiv").appendChild(shipDetail)
              document.getElementById("shipDetailsDiv").style.display = "block"

              console.log(document.getElementById("shipDetailsDiv"))
            })

          this.leaflet_markers[ship.ship_id] = marker

          // console.log(
          //   'create marker kapal',
          //   ship.ship_id,
          //   ship.ship_name,
          //   ' - koordinat ',
          //   ship.geo
          // )
        }
      } catch (error) {
        console.log("error add marker", error)
      }
    },

    goToShipDetail() {
      // Use Vue Router to navigate to ship detail page
      this.$router.push({ name: "admin.shipDetail", params: { shipId: this.ship.ship_id } })
    },

    clickZoom(e) {
      // showModalDetail()

      this.leaflet_map.flyTo(e.target.getLatLng(), 25, {
        duration: 3
      })
    },

    resetMap() {
      this.leaflet_map.setView([this.center.lat, this.center.lng], 15)
    },

    /******************** */

    async prosesSocketData(data) {
      var data = data.data
      var json_data = JSON.parse(data)

      // console.clear()
      // console.log(json_data)

      json_data.forEach((ship) => {
        this.markerEditor(ship)
      })
    },

    /********************** */
    getStatistics() {
      axios
        .get("api/v1/dashboard/statistic", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((res) => {
          this.stats = res.data.data
          console.log("Status : " + res.data.meta.code + "\n" + res.data.meta.message)
        })
        .catch((error) => {
          // console.log("Error : " + error.response.data.meta.message)
        })
    },

    /**********************************************/

    async ws_container() {
      await this.ws_konek_donk()
      // await this.ws_test()
    },

    async ws_konek_donk() {
      try {
        // this.socket = new WebSocket(this.ws_url, null, {
        //   headers: {
        //     'X-Websocket-Key': 'SIMPELWEBSOCKET@2023'
        //   }
        // })

        // return;

        // jika sebelumnya sudah konek
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          console.log("Koneksi sudah aktif.")
          return
        }

        // konek ke server
        this.socket = new WebSocket(this.ws_url)

        // kalau ada error
        this.socket.onerror = (error) => {
          console.error("Terjadi kesalahan:", error)
        }

        // awal konek
        this.socket.onopen = () => {
          // console.clear()
          console.log("Koneksi ke server berhasil dibuat")
        }

        // kalau ada pesan
        this.socket.onmessage = (message) => {
          // console.log('Pesan diterima:', message.data)
          this.prosesSocketData(message)
        }

        // kalau ditutup
        this.socket.onclose = (event) => {
          if (event.code === 1000) {
            // putus tp baik2
            console.log("Koneksi ke server ditutup dengan sukses.")
          } else {
            // putus karena gak direstui
            console.log("Koneksi ke server ditutup dengan kode:", event.code)
            // setTimeout(this.ws_konek_donk, 5000) // coba rujuk ulang setelah x detik
          }
        }
      } catch (error) {
        console.log("ERR :", error)

        // jika error saat koneksi berjalan, putuskan koneksi yg berjalan
        if (this.socket && this.socket?.readyState === WebSocket.OPEN) {
          console.log("Koneksi sudah aktif. putusin aja")
          this.socket.close()
          return
        }

        // agar tiap ws tutup / gagal dia akan konek ulang setelah x detik
        // setTimeout(this.ws_container(), 5000)
      }
    },

    ws_test() {
      console.log("TEST WS :", this.socket)
    },

    /***********************************/

    getAppSetting() {
      axios
        .get("api/v1/setting/web", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((res) => {
          this.harbour_name = res.data.data.harbour_name
          this.harbour_geo = res.data.data.geofences

          this.harbourEditor(this.harbour_geo)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    mapZoomAnimFix() {
      L.Popup.prototype._animateZoom = function (e) {
        if (!this._map) {
          return
        }
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
          anchor = this._getAnchor()
        L.DomUtil.setPosition(this._container, pos.add(anchor))
      }

      L.Tooltip.prototype._animateZoom = function (e) {
        if (!this._map) {
          return
        }

        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center)
        this._setPosition(pos)
      }

      L.Tooltip.prototype._updatePosition = function (e) {
        if (!this._map) {
          return
        }

        var pos = this._map.latLngToLayerPoint(this._latlng)
        this._setPosition(pos)
      }

      L.Marker.prototype._animateZoom = function (e) {
        if (!this._map) {
          return
        }
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round()

        this._setPos(pos)
      }
    },

    navigateToShipDetail(id) {
      console.log(id)

      // this.$router.push({ name: 'admin.shipDetail', params: { shipId: id } })
    }
  }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css");

#btnResetMap {
  width: 33px;
  height: 33px;
  line-height: 30px;
  position: absolute;
  z-index: 99999;
  left: 9px;
  top: 80px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #88a9b2;
  line-height: 26px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 3px;
}

.marker-cluster-small {
  background-color: rgba(181, 226, 140, 0.8);
}
.marker-cluster-small div {
  background-color: #605ac2;
}
.marker-cluster-medium {
  background-color: rgba(241, 211, 87, 0.8);
}
.marker-cluster-medium div {
  background-color: rgba(240, 194, 12, 0.8);
}
.marker-cluster-large {
  background-color: rgba(253, 156, 115, 0.8);
}
.marker-cluster-large div {
  background-color: rgba(241, 128, 23, 0.8);
}
.leaflet-oldie .marker-cluster-small {
  background-color: #b5e28c;
}
.leaflet-oldie .marker-cluster-small div {
  background-color: #6ecc39;
}
.leaflet-oldie .marker-cluster-medium {
  background-color: #f1d357;
}
.leaflet-oldie .marker-cluster-medium div {
  background-color: #f0c20c;
}
.leaflet-oldie .marker-cluster-large {
  background-color: #fd9c73;
}
.leaflet-oldie .marker-cluster-large div {
  background-color: #f18017;
}
.marker-cluster {
  background-clip: padding-box;
  border-radius: 20px;
  border: 3px solid steelblue;
  animation: pulse-animation 2s infinite;
}
.marker-cluster div {
  width: 30px;
  height: 30px;
  margin-left: 3px;
  margin-top: 3px;
  text-align: center;
  border-radius: 15px;
  font: 1.3em "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: bold !important;
}
.marker-cluster span {
  line-height: 30px;
}

.custom-tooltip {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  border-collapse: collapse;
  table-layout: fixed;
  width: 200px;
}

/* Optional: Style for the button */
.btn-primary {
  margin-top: 10px;
}

.leaflet-control-container {
  z-index: 0;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgb(255, 187, 50);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
}
</style>
