<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <!-- MAP -->
    <MapShipDetail
      :shipCurLat="shipCurLat"
      :shipCurLong="shipCurLong"
      :shipOnGround="shipOnGround"
    />

    <div class="row">
      <div class="col-xl-6 col-lg-5 col-md-5">

        <!-- SHIP DETAIL -->
        <div class="card mb-4">
          <div
            class="card-header align-items-center"
            style="color: white; text-align: center; border-radius: 5px"
          >
            <h5
              class="card-action-title mb-0"
              style="color: white; background: #394167; padding: 10px; border-radius: 5px"
            >
              DETAIL KAPAL
            </h5>
          </div>
          <div class="card-body">
            <table class="table" style="margin-top: 10px">
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
                  <td>
                    <span :class="getBadgeClass(ship.status)">
                      {{ formatShipStatus(ship.status) }}
                    </span>
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
        <div
          class="card card-action mb-4 navbar-dropdown dropdown"
          style="max-height: 825px !important; height: auto; overflow-y: auto"
        >
          <div class="card-header align-items-center" style="color: white; text-align: center">
            <h5
              class="card-action-title mb-0"
              style="color: white; background: #394167; padding: 10px; border-radius: 5px"
            >
              BIODATA KAPAL
            </h5>
            <div class="card-action-element">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalEditDetailKapal"
              >
                <i class="ti ti-adjustments-alt"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <table class="table" style="margin-top: 10px">
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

                <ModalEditDetailKapal />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- SHIP LOG -->
      <div class="col-xl-6 col-lg-7 col-md-7">
        <div class="card card-action mb-4 navbar-dropdown dropdown">
          <div class="card-header align-items-center" style="color: white; text-align: center">
            <h5
              class="card-action-title mb-0"
              style="color: white; background: #394167; padding: 10px; border-radius: 5px"
            >
              HISTORY KELUAR MASUK KAPAL
            </h5>
            <div class="card-action-element">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalFilterLog"
              >
                <i class="ti ti-filter-bolt"></i>
              </button>
            </div>
          </div>
          <div
            class="card-body pb-0 scrollbar"
            style="max-height: 727px !important; height: auto; overflow-y: auto"
          >
            <ul class="timeline ms-1 mb-0" style="margin-top: 20px">
              <li
                v-for="(dockLog, index) in this.dockLogs"
                :key="index++"
                class="timeline-item timeline-item-transparent"
              >
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span :class="getBadgeClass(dockLog.status)">
                      <i :class="getArrowClass(dockLog.status)"></i> &nbsp;
                      {{ formatShipStatus(dockLog.status.toUpperCase()) }}
                    </span>
                    <span>
                      <button class="btn btn-light btn-xs" type="button" id="shipDirection">
                        <i class="ti ti-rss me-xs"></i>&nbsp; &nbsp; MAP
                      </button>
                    </span>
                    <!-- <span> {{ dockLog.lat + ',' + dockLog.long }} </span> -->
                    <small class="text-muted">{{ dockLog.created_at }}</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ModalFilterLogs :dock-logs="dockLogs" :location-logs="locationLogs" />
    </div>

    <!--/ Content -->
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'

import MapShipDetail from '../components/Maps/MapShipDetail.vue'
import ModalEditDetailKapal from '../components/Modal/ModalEditKapal.vue'
import ModalFilterLogs from '../components/Modal/ModalFilterLogs.vue'

// import ShipDetail from '../components/Items/ShipDetailItem.vue'
// import ShipOwnerBiodata from '../components/Items/ShipOwnerItem.vue'
// import ShipOverview from '../components/Items/ShipOverviewItem.vue'
// import WaveComponent from '../components/WaveItem.vue'

export default {
  name: 'detailKapal',

  components: {
    MapShipDetail,
    ModalEditDetailKapal,
    ModalFilterLogs
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

    this.getShipDetail(shipDetailId)
  },

  setup() {
    const { handleSubmit, resetForm } = useForm()
    const { value, errorMessage } = useField('value', validateField)
    const toast = useToast()

    function validateField(value) {
      if (!value) {
        return 'Password is required.'
      }

      return true
    }

    const onSubmit = handleSubmit((values) => {
      if (values.value && values.value.length > 0) {
        toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 })
        resetForm()
      }
    })

    return {
      value,
      errorMessage,
      onSubmit
    }
  },

  methods: {
    validateField(value) {
      if (!value) {
        return 'Password is required.'
      }

      return true
    },

    getShipDetail(shipDetailId) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      axios
        .get(`/api/v1/ship/detail/${shipDetailId}`, config)
        .then((res) => {
          this.ship = res.data.data
          this.shipBio = this.ship.detail

          this.dockLogs = this.ship.dock_logs
          this.locationLogs = this.ship.location_logs

          this.shipCurLat = this.ship.current_lat
          this.shipCurLong = this.ship.current_long
          this.shipOnGround = this.ship.on_ground
        })
        .catch((error) => {
          console.log('Get ship detail failure. Retrying in 1 seconds...', error)

          setTimeout(() => {
            this.getShipDetail()
          }, 1000)
          return
        })
    },

    // STYLING
    formatShipStatus(status) {
      if (status) {
        return status.toUpperCase()
      } else {
        return '' // Handle the case when status is undefined
      }
    },

    getBadgeClass(status) {
      if (status === 'checkin') {
        return 'badge bg-label-success'
      } else if (status === 'checkout') {
        return 'badge bg-label-info'
      } else if (status === 'out of scope') {
        return 'badge bg-label-warning'
      } else {
        return 'badge bg-label-danger'
      }
    },

    getArrowClass(status) {
      if (status === 'checkin') {
        return 'fa-solid fa-circle-arrow-down'
      } else if (status === 'checkout') {
        return 'fa-solid fa-circle-arrow-up'
      } else if (status === 'out of scope') {
        return 'badge bg-label-warning'
      } else {
        return 'badge bg-label-danger'
      }
    }
  }
}
</script>

<style scoped>
.scrollbar {
  overflow-x: hidden;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
}

.scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 132, 255, 0.204);
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #7367f0;
  border-radius: 20px;
  /* border: 3px solid rgb(89, 0, 255); */
}
</style>
