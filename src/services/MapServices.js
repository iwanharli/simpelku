import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import markerKapal from '../assets/img/ship-marker.png'
import markerNelayan from '../assets/img/fisherman-marker.png'

// AIzaSyB-KuyteYp1DYW8KdRT6L1M7nB_GfAER00
const GOOGLE_MAPS_API_KEY = 'AIzaSyB-KuyteYp1DYW8KdRT6L1M7nB_GfAER00xxxxxxxxxx'


export default {
    data() {
        return {
            stats: [],
            center: { lat: -6.846155, lng: 109.128892 },
            leaflet_map: null,
            leaflet_markers: [],
            leaflet_layerGroups: null,
            ship_collection: [],
            socket: null,
            ws_url: 'ws://103.139.192.254:9016/api/v1/dashboard/ship-monitor/open-websocket',
            harbour_name: 'PELABUHAN',
            harbour_geo: []
            // ws_url: "ws://localhost:8080",
        }

    },

    mounted() {
        this.getAppSetting()
        this.getStatistics()

        setTimeout(() => {
            this.akuPeta()
            this.ws_container()
        }, 500)
    },

    unmounted() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log('Ada koneksi nyambung, yukk putus aja.')

            this.socket.close()
            return
        }
    },

    methods: {
        async akuPeta() {
            console.log('PETA', L, [this.center.lat, this.center.lng])

            this.mapZoomAnimFix()

            this.leaflet_map = L.map('map', {}).setView([this.center.lat, this.center.lng], 13)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxNativeZoom: 19,
                maxZoom: 30,
                noWrap: true,
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.leaflet_map)

            // L.marker([this.center.lat, this.center.lng])
            //   .addTo(this.leaflet_map)
            //   .bindPopup(this.harbour_name)
            //   .openPopup()

            // this.leaflet_layerGroups = L.layerGroup().addTo(this.leaflet_map)
            this.leaflet_layerGroups = L.markerClusterGroup().addTo(this.leaflet_map)

            this.harbourEditor(this.harbour_geo)
        }, // end func

        async harbourEditor(geofence) {
            var fix_geofence = geofence.map((item) => [item.lat, item.long])

            var polygon = L.polygon(fix_geofence, {
                color: '#7367F0',
                fillColor: '#A1B4FF',
                fillOpacity: 0.5
            }).addTo(this.leaflet_map)
        },

        async markerEditor(ship) {
            try {
                if (this.leaflet_markers.hasOwnProperty(ship.ship_id)) {
                    // Jika marker sudah ada, perbarui posisinya
                    this.leaflet_markers[ship.ship_id].setLatLng([ship.geo[1], ship.geo[0]])

                    console.log(
                        '> UP MARKER \t',
                        ship.ship_id,
                        ship.ship_name,
                        '\n> KOORDINAT \t',
                        ship.geo,
                        '\n> ON GROUND \t',
                        ship.on_ground
                    )
                } else {
                    // Jika marker belum ada, buat marker baru dan tambahkan ke LayerGroup

                    var iconKapal = L.icon({
                        iconUrl: markerKapal,
                        iconSize: [32, 42],
                        iconAnchor: [16, 32]
                    })

                    var iconNelayan = L.icon({
                        iconUrl: markerNelayan,
                        iconSize: [35, 50]
                    })

                    var marker = L.marker([ship.geo[1], ship.geo[0]], {
                        icon: ship.on_ground === 1 ? iconNelayan : iconKapal
                    })
                        .bindTooltip(ship.ship_name)
                        .addTo(this.leaflet_layerGroups)
                        .on('click', this.clickZoom)

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
                console.log('error add marker', error)
            }
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
                    console.log('Koneksi sudah aktif.')
                    return
                }

                // konek ke server
                this.socket = new WebSocket(this.ws_url)

                // kalau ada error
                this.socket.onerror = (error) => {
                    console.error('Terjadi kesalahan:', error)
                }

                // awal konek
                this.socket.onopen = () => {
                    // console.clear()
                    console.log('Koneksi ke server berhasil dibuat')
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
                        console.log('Koneksi ke server ditutup dengan sukses.')
                    } else {
                        // putus karena gak direstui
                        console.log('Koneksi ke server ditutup dengan kode:', event.code)
                        setTimeout(this.ws_konek_donk, 5000) // coba rujuk ulang setelah x detik
                    }
                }
            } catch (error) {
                console.log('ERR :', error)

                // jika error saat koneksi berjalan, putuskan koneksi yg berjalan
                if (this.socket && this.socket?.readyState === WebSocket.OPEN) {
                    console.log('Koneksi sudah aktif. putusin aja')
                    this.socket.close()
                    return
                }

                // agar tiap ws tutup / gagal dia akan konek ulang setelah x detik
                // setTimeout(this.ws_container(), 5000)
            }
        },

        ws_test() {
            console.log('TEST WS :', this.socket)
        },

        /***********************************/

        getAppSetting() {
            axios
                .get('api/v1/setting/web', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((res) => {
                    this.harbour_name = res.data.data.harbour_name
                    this.harbour_geo = res.data.data.geofences
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
        }
    }
}