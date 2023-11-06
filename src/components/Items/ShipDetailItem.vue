<template>
  <div class="card mb-4">
    <div class="card-body">
      <p class="card-text text-uppercase">DETAIL KAPAL</p>
      <table class="table">
        <tbody>
          <tr>
            <th style="width: 10%"><i class="ti ti-ship"></i></th>
            <th style="width: 40%">Nama Kapal</th>
            <td>
              <span class="badge bg-label-info">{{ formatShipStatus(ship.ship_name) }}</span>
            </td>
          </tr>
          <tr>
            <th><i class="ti ti-check"></i></th>
            <th>Status</th>
            <td>
              <span :class="getBadgeClass(ship.status)">{{ formatShipStatus(ship.status) }}</span>
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
          <tr style="background-color: #728eff58">
            <th colspan="3" class="accordion mt-3 accordion" id="accordionStyle1">
              <button
                type="button"
                class="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target="#accordionStyle1-1"
                aria-expanded="true"
              >
                <span class="card-text text-uppercase">BIODATA KAPAL</span>
              </button>
            </th>
          </tr>
          <tr>
            <th colspan="3" style="background-color: #29335c23; border: 0px">
              <div
                id="accordionStyle1-1"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionStyle1"
              >
                <div class="accordion-body">
                  <table class="table table-borderless">
                    <tr>
                      <th style="width: 40%">Jenis</th>
                      <td>{{ shipBio.type }}</td>
                    </tr>
                    <tr>
                      <th>Dimensi (m)</th>
                      <td>{{ shipBio.dimension }}</td>
                    </tr>
                    <tr>
                      <th>Pelabuhan Pangkalan</th>
                      <td>{{ shipBio.harbour }}</td>
                    </tr>
                    <tr>
                      <th>Nomor Siup</th>
                      <td>{{ shipBio.siup }}</td>
                    </tr>
                    <tr>
                      <th>Nomor BKP</th>
                      <td>{{ shipBio.bkp }}</td>
                    </tr>
                    <tr>
                      <th>TANDA SELAR</th>
                      <td>{{ shipBio.selar_mark }}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Terdaftar</th>
                      <td>{{ ship.created_at }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th colspan="3" style="border: 0px">
              <div class="d-grid gap-2 col-lg-9 mx-auto">
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditDetailKapal"
                >
                  Edit Detail Kapal
                </button>
              </div>
              <ModalEditDetailKapal />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ModalEditDetailKapal from '../Modal/ModalEditKapal.vue'

// import WaveComponent from '../components/WaveItem.vue'

export default {
  name: 'detailKapal',

  data() {
    return {
      id: 0,
      zoom: 16,
      ship: {},
      shipBio: {}
    }
  },

  created() {
    const shipDetailId = this.$route.params.shipId
    this.getShipDetail(shipDetailId)
  },

  methods: {
    // FETCHING FROM API
    getShipDetail(shipDetailId) {
      axios
        .get(`/api/v1/ship/detail/${shipDetailId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.ship = res.data.data
          this.shipBio = res.data.data.detail

          // console.log(this.ship)
        })
        .catch((error) => {
          console.log(error.response.data.meta.message)
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
      // Define classes for different status values
      if (status === 'checkin') {
        return 'badge bg-label-success' // Apply the success class
      } else if (status === 'checkout') {
        return 'badge bg-label-info' // Apply the warning class
      } else if (status === 'out of scope') {
        return 'badge bg-label-warning' // Apply the error class
      } else {
        return 'badge bg-label-danger' // Default class if none of the conditions match
      }
    }
  },

  mounted() {},

  components: {
    ModalEditDetailKapal
  }
}
</script>
