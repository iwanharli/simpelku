<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <!-- LOADER -->
    <div class="border-round border-1 surface-border p-4 surface-card" v-if="isLoading">
      <div class="headline">
        <h4 style="color: rgb(81, 0, 139)">Loading ...</h4>
      </div>
      <div class="tableWrapper">
        <table class="table">
          <tr>
            <td class="loading">
              <div class="bar"></div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-xl-4 col-md-6">
        <div class="card">
          <div class="card-header align-items-center">
            <h5 class="card-action-title head-pending mb-0">
              <span class="badge bg-label-warning">PENGAJUAN PENDING</span>
              <p />
              <input
                type="text"
                class="form-control search-input border-0 search-pending"
                placeholder="Search..."
                v-model="searchQuery"
              />
            </h5>
          </div>
          <div class="card-body card-body-pending">
            <table class="table table-striped">
              <tbody>
                <tr v-for="(plist, index) in pendingData" :key="index++">
                  <th class="th-1 pending">
                    <div class="pending-index">
                      {{ index }}
                    </div>
                  </th>
                  <th class="th-2 pending">
                    <div style="height: 25px; width: 100%; display: flex; align-items: center">
                      <i class="ti ti-ship"> </i> &nbsp; {{ plist.ship_name.toUpperCase() }} <br />
                    </div>
                    <div style="height: 25px; width: 100%; display: flex; align-items: center">
                      <i class="ti ti-user"> </i> &nbsp; {{ plist.responsible_name }} <br />
                    </div>
                    <div style="height: 25px; display: flex; align-items: center">
                      <i class="ti ti-phone"> </i> &nbsp; {{ plist.phone }} <br />
                    </div>
                    <div style="height: 25px; display: flex; align-items: center">
                      <i class="ti ti-calendar"> </i> &nbsp; {{ plist.created_at }} <br />
                    </div>
                  </th>
                  <th class="th-3 pending text-center">
                    <a @click="pendingApproveSubmit(plist.id)">
                      <button class="btn btn-xs btn-success waves-effect waves-light" type="button">
                        <i class="ti ti-checks me-xs-1"></i>
                      </button>
                    </a>
                    <p />
                    <a @click="pendingDeclineSubmit(plist.id)">
                      <button class="btn btn-xs btn-danger waves-effect waves-light" type="button">
                        <i class="ti ti-ban me-xs-1"></i>
                      </button>
                    </a>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card" style="margin-top: 20px">
          <div class="card-header align-items-center">
            <h5 class="card-action-title head-rejected mb-0">
              <span class="badge bg-label-danger">PENGAJUAN DITOLAK</span>
              <p />
              <input
                type="text"
                class="form-control search-input border-0 search-rejected"
                placeholder="Search..."
                v-model="searchQuery"
              />
            </h5>
          </div>
          <div class="card-body card-body-rejected">
            <table class="table table-striped">
              <tbody>
                <tr v-for="(rlist, index) in rejectedData" :key="index++">
                  <th class="th-1 rejected">
                    <div class="rejected-index">
                      {{ index }}
                    </div>
                  </th>
                  <th class="th-2 rejected">
                    <div style="height: 25px; width: 100%; display: flex; align-items: center">
                      <i class="ti ti-ship"> </i> &nbsp; {{ rlist.ship_name.toUpperCase() }} <br />
                    </div>
                    <div style="height: 25px; width: 100%; display: flex; align-items: center">
                      <i class="ti ti-user"> </i> &nbsp; {{ rlist.responsible_name }} <br />
                    </div>
                    <div style="height: 25px; display: flex; align-items: center">
                      <i class="ti ti-phone"> </i> &nbsp; {{ rlist.phone }} <br />
                    </div>
                    <div style="height: 25px; display: flex; align-items: center">
                      <i class="ti ti-calendar"> </i> &nbsp; {{ rlist.created_at }} <br />
                    </div>
                  </th>
                  <th class="th-3 rejected text-center">
                    <a
                      :href="getWhatsAppLink(rlist.phone)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-label-success waves-effect"
                      target="_blank"
                    >
                      <span class="ti ti-brand-whatsapp"></span>
                    </a>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-8 col-sm-12 approved-mobile">
        <div class="card">
          <div class="card-header align-items-center">
            <h5 class="card-action-title head-approved mb-0">
              <span class="badge bg-label-success">PENGAJUAN DISETUJUI</span>
              <p />
              <input
                type="text"
                class="form-control search-input border-0 search-approved"
                placeholder="Search..."
                v-model="searchQuery"
              />
            </h5>
          </div>
          <div class="card-body card-body-approved">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kapal</th>
                  <th>Penanggung Jawab</th>
                  <th>Nomor HP</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(aList, index) in approvedData" :key="index++">
                  <th>{{ index++ }}</th>
                  <th>{{ aList.ship_name }}</th>
                  <th>{{ aList.responsible_name }}</th>
                  <th>
                    {{ aList.phone }}
                  </th>
                  <th></th>
                  <th class="text-center">
                    <a
                      :href="getWhatsAppLink(aList.phone)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-label-success waves-effect"
                      target="_blank"
                    >
                      <span class="ti ti-brand-whatsapp"></span>
                    </a>
                    &nbsp; &nbsp;
                    <a
                      @click="fetchShipDetail(aList.device_id)"
                      href=""
                      type="button"
                      class="btn btn-sm btn-primary"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasStart"
                      aria-controls="offcanvasStart"
                    >
                      <i class="ti ti-search me-sm-1"></i> DETAIL
                    </a>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasStart"
    aria-labelledby="offcanvasStartLabel"
    style="width: 730px; "
  >
    <div class="offcanvas-body my-auto mx-0 flex-grow-0">
      <div class="card">
        <div class="card-header align-items-center">
          <h5 class="card-action-title head-approved mb-0">
            <span class="badge bg-label-success">DETAIL PENGAJUAN DISETUJUI</span>
          </h5>
        </div>
        <div class="card-body card-body-filter">
          <table class="table" v-if="shipDetail">
            <tbody>
              <tr>
                <th>KAPAL</th>
                <td>{{ shipDetail.ship_name }}</td>
              </tr>
              <tr>
                <th>PENANGGUNG JAWAB</th>
                <td>{{ shipDetail.responsible_name }}</td>
              </tr>
              <tr>
                <th>NOMOR HP</th>
                <td>{{ shipDetail.phone }}</td>
              </tr>
              <tr>
                <th>DEVICE ID</th>
                <td>{{ shipDetail.device_id }}</td>
              </tr>
              <tr>
                <th>TANGGAL PENDAFTARAN</th>
                <td>{{ shipDetail.submitted_at }}</td>
              </tr>
              <tr>
                <th>TANGGAL DISETUJUI</th>
                <td>{{ shipDetail.responded_at }}</td>
              </tr>
            </tbody>
          </table>

          <div class="row mb-3">
            <!-- Accordion with Icon -->
            <div class="col-md mb-4 mb-md-2">
              <div class="accordion mt-3" id="accordionWithIcon">
                <div class="accordion-item card">
                  <h2 class="accordion-header d-flex align-items-center">
                    <button
                      type="button"
                      class="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordionWithIcon-2"
                      aria-expanded="false"
                      style="background-color: rgba(0, 0, 0, 0.285);"
                    >
                      <i class="ti ti-history ti-xs me-2"></i>
                      HISTORY PAIRING
                    </button>
                  </h2>
                  <div id="accordionWithIcon-2" class="accordion-collapse collapse">
                    <div class="accordion-body">
                      <table class="table table-border">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Kapal</th>
                            <th>Penanggung Jawab</th>
                            <th>Nomor HP</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(data, index) in historyPairing" :key="index++">
                            <th>{{ index }}</th>
                            <th>{{ data.ship_name }}</th>
                            <th>{{ data.responsible_name }}</th>
                            <th>{{ data.phone }}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/ Accordion with Icon -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'pengajuanKapal',
  data() {
    return {
      dataList: [],
      isLoading: true,
      shipDetail: [],
      historyPairing: []
    }
  },

  computed: {
    approvedData() {
      return this.dataList.filter((item) => item.status === 'approved')
    },
    rejectedData() {
      return this.dataList.filter((item) => item.status === 'rejected')
    },
    pendingData() {
      return this.dataList.filter((item) => item.status === 'pending')
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }

      try {
        const response = await axios.get('api/v1/ship/pairing-request', config)
        this.dataList = response.data.data

        this.isLoading = false
        console.log('DATA APPROVAL WAS FETCHED')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    async fetchShipDetail(device_id) {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }

      try {
        const response = await axios.get(`/api/v1/ship/pairing/detail/${device_id}`, config)
        this.shipDetail = response.data.data
        this.historyPairing = response.data.data.history_pairing

        console.log('SHIP DETAIL WAS FETCHED')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    async pendingApproveSubmit(id) {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }

      const updatedData = {
        pairing_id: parseInt(id),
        status: 'approved'
      }

      console.log(updatedData)

      axios
        .put('api/v1/ship/pairing/action', updatedData, config)
        .then((response) => {
          console.log('Data updated successfully', updatedData)

          this.fetchData()
        })
        .catch((error) => {
          console.error('Error updating data:', error)
        })
    },

    async pendingDeclineSubmit(id) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

      const updatedData = {
        pairing_id: parseInt(id),
        status: 'rejected'
      }

      axios
        .put('api/v1/ship/pairing/action', updatedData, config)
        .then((response) => {
          console.log('Data updated successfully', updatedData)

          this.fetchData()
        })
        .catch((error) => {
          console.error('Error updating data:', error)
        })
    },

    getWhatsAppLink(phoneNumber) {
      // Hilangkan karakter "-" atau spasi
      phoneNumber = phoneNumber.replace(/[-\s]/g, '')

      // Ubah nomor HP menjadi format yang sesuai
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '+62' + phoneNumber.slice(1)
      }

      return `https://wa.me/${phoneNumber}?text=`
    }
  },

  components: {
    // WaveComponent
  }
}
</script>

<style>
.container-mobile-order {
  display: flex;
  flex-wrap: wrap;
}

.pending-mobile-order {
  flex: 1;
}

.rejected-mobile-order {
  flex: 1;
}

.approved-mobile-order {
  flex: 1;
}

@media (max-width: 1200px) {
  .approved-mobile {
    margin-top: 20px;
  }

  .container-mobile-order {
    flex-direction: column;
  }

  .pending-mobile-order {
    order: 1;
  }

  .rejected-mobile-order {
    order: 3;
  }

  .approved-mobile-order {
    order: 2;
  }
}

.search-pending::placeholder {
  color: #bdb700; /* Replace with your desired color value */
}

.search-rejected::placeholder {
  color: #ff3939; /* Replace with your desired color value */
}

.search-approved::placeholder {
  color: #00b500; /* Replace with your desired color value */
}

.head-pending {
  color: white;
  background: #ffbf00;
  padding: 10px;
  border-radius: 5px;
}

.head-rejected {
  color: white;
  background: #f1533e;
  padding: 10px;
  border-radius: 5px;
}

.head-approved {
  color: white;
  background: #329820;
  padding: 10px;
  border-radius: 5px;
}

.card-body-pending {
  max-height: 527px;
  overflow-y: auto;
}

.card-body-rejected {
  max-height: 530px;
  overflow-y: auto;
}

.card-body-approved {
  max-height: 1060px;
  overflow-y: auto;
}

.card-body-pending::-webkit-scrollbar,
.card-body-rejected::-webkit-scrollbar,
.card-body-approved::-webkit-scrollbar {
  width: 5px;
}

.card-body-pending::-webkit-scrollbar-track,
.card-body-rejected::-webkit-scrollbar-track,
.card-body-approved::-webkit-scrollbar {
  background: rgba(0, 132, 255, 0.204);
}

.card-body-pending::-webkit-scrollbar-thumb {
  background-color: rgb(162, 152, 63);
  border-radius: 20px;
}

.card-body-rejected::-webkit-scrollbar-thumb {
  background-color: rgb(162, 63, 63);
  border-radius: 20px;
}

.card-body-approved::-webkit-scrollbar-thumb {
  background-color: rgb(63, 162, 79);
  border-radius: 20px;
}

/* table styling */

.pending-index {
  color: #ffbf00;
  font-weight: bolder;
}

.th-1.pending {
  display: flex;
  align-items: center;
  border-top: 1px dashed #ffbf00;
  border-bottom: 1px dashed #ffbf00;
  border-left: 1px dashed #ffbf00;
}

.th-2.pending {
  border-top: 1px dashed #ffbf00;
  border-bottom: 1px dashed #ffbf00;
  border-left: 1px dashed #ffbf00;
}

.th-3.pending {
  border-top: 1px dashed #ffbf00;
  border-left: 1px dashed #ffbf00;
  border-bottom: 1px dashed #ffbf00;
  border-right: 1px dashed #ffbf00;
}

.rejected-index {
  color: #ff5050;
  font-weight: bolder;
}

.th-1.rejected {
  display: flex;
  align-items: top;
  border-top: 1px dashed #f1533e;
  border-bottom: 1px dashed #f1533e;
  border-left: 1px dashed #f1533e;
}

.th-2.rejected {
  border-top: 1px dashed #f1533e;
  border-bottom: 1px dashed #f1533e;
  border-left: 1px dashed #f1533e;
}

.th-3.rejected {
  border-top: 1px dashed #f1533e;
  border-left: 1px dashed #f1533e;
  border-bottom: 1px dashed #f1533e;
  border-right: 1px dashed #f1533e;
}
</style>
