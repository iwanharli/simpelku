<template>
  <div class="containerPage bg-secondary p-5" style="padding-top: 40px !important">
    <b-row>
      <b-col xl="12" style="border-radius: 20px" v-if="shipCurLat !== 0">
        <MapDetail :shipCurLat="shipCurLat" :shipCurLong="shipCurLong" :shipOnGround="shipOnGround" :location-logs="locationLogs" />
      </b-col>
      <b-col xl="6" style="border-radius: 20px">
        <!-- SHIP DETAIL -->
        <div class="card card-action mt-4 mb-4 navbar-dropdown dropdown">
          <div class="card-header align-items-center" style="color: white; text-align: center">
            <b-row>
              <b-col xl="12" lg="12" md="12" sm="12" class="bg-primary card-action-title" style="border-radius: 5px">
                <h5 class="text-white" style="padding: 10px; font-weight: bolder">DETAIL KAPAL</h5>
              </b-col>
            </b-row>
          </div>
          <div class="card-body" style="overflow: auto">
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 10%"><i class="ti ti-ship"></i></th>
                  <th style="width: 40%">Nama Kapal</th>
                  <td>
                    {{ formatShipStatus(ship.ship_name) }}
                  </td>
                </tr>
                <tr>
                  <th><i class="ti ti-check"></i></th>
                  <th>Status</th>
                  <td style="text-transform: uppercase">
                    <div class="badge bg-primary pt-2 pb-2" v-if="ship.status === 'checkin'">
                      <span>{{ ship.status }}</span>
                    </div>
                    <div class="badge bg-info pt-2 pb-2" v-else-if="ship.status === 'checkout'">
                      <span>{{ ship.status }}</span>
                    </div>
                    <div class="badge bg-warning pt-1 pb-1" v-else-if="ship.status === 'out of scope'">
                      <span>{{ ship.status }}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><i class="ti ti-user"></i></th>
                  <th>Penanggung Jawab</th>
                  <td>{{ formatShipStatus(ship.responsible_name) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-phone-call"></i></th>
                  <th>Device</th>
                  <td>{{ ship.device_id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SHIP BIO -->
        <div class="card card-action mt-4 mb-4 navbar-dropdown dropdown" style="max-height: 825px !important; height: auto; overflow-y: auto">
          <div class="card-header align-items-center" style="color: white; text-align: center">
            <b-row>
              <b-col xl="10" lg="10" md="10" sm="10" class="bg-primary card-action-title" style="border-radius: 5px">
                <h5 class="text-white" style="padding: 10px; font-weight: bolder">BIODATA KAPAL</h5>
              </b-col>
              <b-col xl="2" lg="2" md="2" sm="2">
                <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditDetailKapal">
                  <i class="ti ti-adjustments-alt"></i>
                </button>
              </b-col>
            </b-row>
          </div>
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 10%"><i class="ti ti-route-2"></i></th>
                  <th style="width: 40%">Jenis</th>
                  <td>{{ formatShipStatus(shipBio.type) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-shape"></i></th>
                  <th>Dimensi (m)</th>
                  <td>{{ formatShipStatus(shipBio.dimension) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-directions"></i></th>
                  <th>Pelabuhan Pangkalan</th>
                  <td>{{ formatShipStatus(shipBio.harbour) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-align-box-bottom-center-filled"></i></th>
                  <th>Nomor Siup</th>
                  <td>{{ formatShipStatus(shipBio.siup) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-align-box-bottom-right-filled"></i></th>
                  <th>Nomor BKP</th>
                  <td>{{ formatShipStatus(shipBio.bkp) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-align-box-center-middle-filled"></i></th>
                  <th>Tanda Selar</th>
                  <td>{{ formatShipStatus(shipBio.selar_mark) }}</td>
                </tr>
                <tr>
                  <th><i class="ti ti-calendar"></i></th>
                  <th>Tanggal Terdaftar</th>
                  <td>{{ formatShipStatus(ship.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>

      <!-- HISTORY KAPAL  -->
      <b-col xl="6" style="border-radius: 20px">
        <div class="card card-action mt-4 mb-4 navbar-dropdown dropdown">
          <div class="card-header align-items-center" style="color: white; text-align: center">
            <h5 class="card-action-title bg-primary" style="color: white; padding: 10px; border-radius: 5px; font-weight: bolder">HISTORY KELUAR MASUK KAPAL</h5>
          </div>
          <div class="card-body scrollbar" style="max-height: 852px !important; height: 852px; overflow-y: auto">
            <div v-for="(dockLog, index) in this.dockLogs" :key="index++" class="bg-soft-primary p-2 mb-1" style="border-radius: 20px">
              <div style="text-transform: uppercase">
                <b-row class="text-center">
                  <b-col xl="2">
                    <div class="badge bg-primary pt-2 pb-2" v-if="dockLog.status === 'checkin'">
                      ✅ &nbsp;<span>{{ dockLog.status }}</span>
                    </div>
                    <div class="badge bg-info pt-1 pb-1" v-else-if="dockLog.status === 'checkout'">
                      📤 &nbsp;<span>{{ dockLog.status }}</span>
                    </div>
                  </b-col>
                  <b-col xl="6">
                    <small>PPP Tegalsari - Tegal</small>
                  </b-col>
                  <b-col xl="4" class="text-center">
                    <small class="text-muted text-center">{{ dockLog.created_at }}</small>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>

  <modalEditKapal />
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"
import MapDetail from "@/components/map/MapShipDetail.vue"
import ModalEditKapal from "@/components/modal/EditDetailKapal.vue"

export default {
  name: "detailKapal",

  components: {
    MapDetail,
    ModalEditKapal
  },

  data() {
    return {
      id: 0,
      zoom: 16,
      ship: {},
      shipBio: {},
      dockLogs: [],
      locationLogs: [],
      shipCurLat: null,
      shipCurLong: null,
      shipOnGround: null
    }
  },

  created() {
    const shipDetailId = this.$route.params.shipId
    this.getShipDetail(shipDetailId), this.getDockLogs(shipDetailId), this.getLocationLogs(shipDetailId)
  },

  methods: {
    async getShipDetail(shipDetailId) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get(`/api/v1/ship/detail/${shipDetailId}`, config)
        .then((res) => {
          this.ship = res.data.data
          this.shipBio = this.ship.detail

          this.shipCurLat = this.ship.current_lat
          this.shipCurLong = this.ship.current_long
          this.shipOnGround = this.ship.on_ground

          console.log("💚 SHIP DETAIL >", shipDetailId, this.ship)
        })
        .catch((error) => {
          // Swal.fire({
          //   title: "Error!",
          //   text: "Email / Password anda salah!",
          //   icon: "error",
          //   confirmButtonText: "😪 COBA LAGI"
          // })

          console.log("Get ship detail failure. Retrying in 5 seconds...", error)

          setTimeout(() => {
            this.getShipDetail()
          }, 5000)
          return
        })
    },

    async getDockLogs(shipDetailId) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get(`/api/v1/ship/dock-log/${shipDetailId}`, config)
        .then((res) => {
          this.dockLogs = res.data.data.docking_logs

          console.log("💚 DOCK LOGS >", this.dockLogs)
        })
        .catch((error) => {
          console.error("💥 DOCK LOGS GAGAL :", error)
        })
    },

    async getLocationLogs(shipDetailId) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get(`/api/v1/ship/location-log/${shipDetailId}`, config)
        .then((res) => {
          this.locationLogs = res.data.data.location_logs

          console.log("💚 LOCATION LOGS >", this.locationLogs)
        })
        .catch((error) => {
          console.error("💥 LOCATION LOGS GAGAL :", error)
        })
    },

    // STYLING
    formatShipStatus(status) {
      if (status) {
        return status.toUpperCase()
      } else {
        return "" // Handle the case when status is undefined
      }
    },

    getBadgeClass(status) {
      if (status === "checkin") {
        return "bg-success"
      } else if (status === "checkout") {
        return "bg-info"
      } else if (status === "out of scope") {
        return "bg-warning"
      } else {
        return "bg-danger"
      }
    },

    getArrowClass(status) {
      if (status === "checkin") {
        return "fa-solid fa-circle-arrow-down"
      } else if (status === "checkout") {
        return "fa-solid fa-circle-arrow-up"
      } else if (status === "out of scope") {
        return "badge bg-label-warning"
      } else {
        return "badge bg-label-danger"
      }
    }
  }
}
</script>

<style>
.scrollbar::-webkit-scrollbar {
  width: 10px;
}

.scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #3c50a1;
  border-radius: 6px;
}

/* For Firefox */
.scrollbar {
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
</style>
