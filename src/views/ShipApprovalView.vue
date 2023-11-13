<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <!-- MENU -->
    <div class="col-xl-12 col-md-12 col-sm-12">
      <div
        class="card-header"
        style="background: rgb(138 129 255); padding-top: 20px; border-radius: 20px"
      >
        <ul
          class="nav nav-tabs card-header-tabs"
          role="tablist"
          style="display: flex; justify-content: center; border-radius: 20px; padding-top: 10px"
        >
          <li class="nav-item active" style="padding-right: 10px">
            <button
              class="nav-link active btn-header"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-approved"
              role="tab"
              aria-selected="true"
            >
              <i class="ti ti-check"></i> &nbsp; DISETUJUI
            </button>
          </li>
          <li class="nav-item" style="padding-right: 10px">
            <button
              class="nav-link btn-header"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-pending"
              role="tab"
              aria-selected="false"
            >
              <i class="ti ti-alarm"></i> &nbsp; PENDING
            </button>
          </li>
          <li class="nav-item" style="padding-right: 10px">
            <button
              class="nav-link btn-header"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-rejected"
              role="tab"
              aria-selected="false"
            >
              <i class="ti ti-ban"></i> &nbsp; DITOLAK
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="tab-content">
      <!-- APPROVED -->
      <div class="tab-pane fade active show" id="form-tabs-approved" role="tabpanel">
        <div class="col-xl-12 col-md-12 col-sm-12">
          <div class="card" style="z-index: 1">
            <div
              class="card-header align-items-center"
              style="border-radius: 5px; padding: 10px !important"
            >
              <div
                class="card-action-title mb-0"
                style="background: rgb(131, 121, 242); padding: 10px; border-radius: 5px"
              >
                <div class="row">
                  <div class="col-xl-10 col-md-12">
                    <h2 class="title-pengajuan" style="">PENGAJUAN DISETUJUI</h2>
                  </div>
                  <div class="col-xl-2 cold-md-12 btn-export">
                    <button
                      style="display: inline-block"
                      class="btn btn-warning"
                      type="button"
                      id="kapal_detail"
                      @click="exportData(filteredApproval(approvedData), 'approved')"
                    >
                      <i class="ti ti-external-link me-sm-1"></i> Export
                    </button>
                  </div>
                  <div class="col-xl-12" style="margin-top: 20px">
                    <input
                      type="text"
                      class="form-control search-input border-0 search-ship"
                      placeholder="Pencarian (Kapal / Penanggung Jawab / Device ID / No HP)"
                      v-model="searchQuery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-datatable table-striped">
              <!-- SKELETON -->
              <div v-if="isLoading">
                <ProgressBar mode="indeterminate" style="height: 10px"></ProgressBar>

                <div v-for="row in 5" :key="row" class="row" style="padding: 10px">
                  <div v-for="col in 6" :key="col" class="col-xl-{{ col === 4 ? 4 : 2 }}">
                    <Skeleton class="border-round h-2rem" />
                  </div>
                </div>
              </div>

              <!-- ISI -->
              <div v-else>
                <DataTable
                  :value="filteredApproval(approvedData)"
                  :rows="5"
                  :rowsPerPageOptions="[5, 10, 20, 50]"
                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                  currentPageReportTemplate="{first} - {last} of {totalRecords}"
                  paginator
                  :filterBy="searchQuery"
                >
                  <Column
                    field="rowNumber"
                    header="NO"
                    style="text-transform: uppercase; width: 2%"
                    sortable
                  ></Column>
                  <Column
                    field="ship_name"
                    header="KAPAL"
                    style="text-transform: uppercase; width: 20%"
                    sortable
                  ></Column>
                  <Column
                    field="responsible_name"
                    header="PENANGGUNG JAWAB"
                    style="text-transform: uppercase; width: 20%"
                    sortable
                  ></Column>
                  <Column
                    field="device_id"
                    header="DEVICE ID"
                    style="text-transform: uppercase; width: 23%"
                    sortable
                  ></Column>
                  <Column
                    field="phone"
                    header="NOMOR HP"
                    style="text-transform: uppercase; width: 15%"
                    sortable
                  >
                  </Column>
                  <Column style="text-transform: uppercase; width: 15%">
                    <template #body="statusData">
                      <a
                        :href="getWhatsAppLink(statusData.data.phone)"
                        type="button"
                        class="btn btm-sm rounded-pill btn-icon btn-label-success waves-effect"
                        target="_blank"
                      >
                        <span class="ti ti-brand-whatsapp"></span>
                      </a>
                      &nbsp;
                      <a
                        @click="fetchShipDetail(statusData.data.device_id)"
                        type="button"
                        class="btn btn-sm btn-primary"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasStart"
                        aria-controls="offcanvasStart"
                      >
                        <i class="ti ti-search me-sm-1"></i> DETAIL
                      </a>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PENDING -->
      <div class="tab-pane fade" id="form-tabs-pending" role="tabpanel">
        <div class="col-xl-12 col-md-12 col-sm-12">
          <div class="card" style="z-index: 1">
            <div
              class="card-header align-items-center"
              style="border-radius: 5px; padding: 10px !important"
            >
              <div
                class="card-action-title mb-0"
                style="background: rgb(131, 121, 242); padding: 10px; border-radius: 5px"
              >
                <div class="row">
                  <div class="col-xl-10">
                    <h2 style="color: white; padding: 10px 10px 0px 10px; font-weight: bolder">
                      PENGAJUAN PENDING
                    </h2>
                  </div>
                  <div class="col-xl-2 cold-md-12 btn-export">
                    <button
                      style="display: inline-block"
                      class="btn btn-warning"
                      type="button"
                      id="kapal_detail"
                      @click="exportData(filteredApproval(pendingData), 'pending')"
                    >
                      <i class="ti ti-external-link me-sm-1"></i> Export
                    </button>
                  </div>
                  <div class="col-xl-12" style="margin-top: 20px">
                    <input
                      type="text"
                      class="form-control search-input border-0 search-ship"
                      placeholder="Pencarian (Kapal / Penanggung Jawab / Device ID / Terdaftar)"
                      v-model="searchQuery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-datatable table-striped">
              <DataTable
                :value="filteredApproval(pendingData)"
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} - {last} of {totalRecords}"
                paginator
                :filterBy="searchQuery"
              >
                <Column
                  field="rowNumber"
                  header="NO"
                  style="text-transform: uppercase; width: 2%"
                  sortable
                ></Column>
                <Column
                  field="ship_name"
                  header="KAPAL"
                  style="text-transform: uppercase; width: 20%"
                  sortable
                ></Column>
                <Column
                  field="responsible_name"
                  header="PENANGGUNG JAWAB"
                  style="text-transform: uppercase; width: 20%"
                  sortable
                ></Column>
                <Column
                  field="device_id"
                  header="DEVICE ID"
                  style="text-transform: uppercase; width: 23%"
                  sortable
                ></Column>
                <Column
                  field="phone"
                  header="NOMOR HP"
                  style="text-transform: uppercase; width: 15%"
                  sortable
                >
                </Column>
                <Column style="width: 20%">
                  <template #body="statusData">
                    <a
                      @click="pendingApproveSubmit(statusData.data.id)"
                      class="btn btn-sm btn-success waves-effect waves-light"
                      type="button"
                    >
                      <i class="ti ti-checks me-xs-1"></i> &nbsp; ACC
                    </a>
                    &nbsp;
                    <a
                      @click="pendingDeclineSubmit(statusData.data.id)"
                      class="btn btn-sm btn-danger waves-effect waves-light"
                      type="button"
                    >
                      <i class="ti ti-ban me-xs-1"></i> &nbsp; TOLAK
                    </a>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>

      <!-- REJECTED -->
      <div class="tab-pane fade" id="form-tabs-rejected" role="tabpanel">
        <div class="col-xl-12 col-md-12 col-sm-12">
          <div class="card" style="z-index: 1">
            <div
              class="card-header align-items-center"
              style="border-radius: 5px; padding: 10px !important"
            >
              <div
                class="card-action-title mb-0"
                style="background: rgb(131, 121, 242); padding: 10px; border-radius: 5px"
              >
                <div class="row">
                  <div class="col-xl-10">
                    <h2 style="color: white; padding: 10px 10px 0px 10px; font-weight: bolder">
                      PENGAJUAN DITOLAK
                    </h2>
                  </div>
                  <div class="col-xl-2 cold-md-12 btn-export">
                    <button
                      style="display: inline-block"
                      class="btn btn-warning"
                      type="button"
                      id="kapal_detail"
                      @click="exportData(filteredApproval(rejectedData), 'rejected')"
                    >
                      <i class="ti ti-external-link me-sm-1"></i> Export
                    </button>
                  </div>
                  <div class="col-xl-12" style="margin-top: 20px">
                    <input
                      type="text"
                      class="form-control search-input border-0 search-ship"
                      placeholder="Pencarian (Kapal / Penanggung Jawab / Device ID / Terdaftar)"
                      v-model="searchQuery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-datatable table-striped">
              <DataTable
                :value="filteredApproval(rejectedData)"
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} - {last} of {totalRecords}"
                paginator
                :filterBy="searchQuery"
              >
                <Column
                  field="rowNumber"
                  header="NO"
                  style="text-transform: uppercase; width: 2%"
                  sortable
                ></Column>
                <Column
                  field="ship_name"
                  header="KAPAL"
                  style="text-transform: uppercase; width: 20%"
                  sortable
                ></Column>
                <Column
                  field="responsible_name"
                  header="PENANGGUNG JAWAB"
                  style="text-transform: uppercase; width: 15%"
                  sortable
                ></Column>
                <Column
                  field="device_id"
                  header="DEVICE ID"
                  style="text-transform: uppercase; width: 20%"
                  sortable
                ></Column>
                <Column
                  field="phone"
                  header="NOMOR HP"
                  style="text-transform: uppercase; width: 15%"
                  sortable
                >
                </Column>
                <Column style="width: 5%">
                  <template #body="statusData">
                    <a
                      :href="getWhatsAppLink(statusData.data.phone)"
                      type="button"
                      class="btn btm-sm rounded-pill btn-icon btn-label-success waves-effect"
                      target="_blank"
                    >
                      <span class="ti ti-brand-whatsapp"></span>
                    </a>
                  </template>
                </Column>
              </DataTable>
            </div>
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
    style="width: 730px"
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
                      style="background-color: rgba(0, 0, 0, 0.285)"
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

  <!--Hero area end-->
  <WaveItem />
  <!--Hero area end-->
</template>

<script>
import axios from 'axios'
import WaveItem from '../components/Items/WaveItem.vue'
import * as XLSX from 'xlsx'

export default {
  name: 'pengajuanKapal',
  data() {
    return {
      dataList: [],
      shipDetail: [],
      historyPairing: [],
      searchQuery: '',
      isLoading: true
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
    filteredApproval(data) {
      const query = this.searchQuery.toLowerCase()

      // console.log("qApproval : ", query)

      return data
        .filter((item) => {
          // Add your custom filtering logic here based on the search query
          return (
            item.ship_name.toLowerCase().includes(query) ||
            item.responsible_name.toLowerCase().includes(query) ||
            item.device_id.toLowerCase().includes(query) ||
            item.phone.toLowerCase().includes(query)
          )
        })
        .map((item, index) => {
          return {
            ...item,
            rowNumber: index + 1 // Start from 1
          }
        })
    },

    async fetchData() {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }

      await axios
        .get('api/v1/ship/pairing-request', config)
        .then((response) => {
          this.dataList = response.data.data

          setTimeout(() => {
            this.isLoading = false
          }, 1000)

          console.clear()
          console.log('DATA APPROVAL FETCHED')
        })
        .catch((error) => {
          return
        })
    },

    pendingApproveSubmit(id) {
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

    pendingDeclineSubmit(id) {
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

    fetchShipDetail(deviceId) {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }

      axios
        .get(`/api/v1/ship/pairing/detail/${deviceId}`, config)
        .then((res) => {
          this.shipDetail = res.data.data
          this.historyPairing = res.data.data.history_pairing

          console.log('SHIP DETAIL WAS FETCHED')
        })
        .catch((error) => {
          // console.log('Get detail failure. Retrying in 1 seconds...', error)
          return
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
    },

    exportData(data, status) {
      const jsonFields = ['ship_name', 'responsible_name', 'device_id', 'phone']

      // diganti sek formate nang csv
      const csvStr = this.convertToCSV(data, jsonFields)
      console.log(csvStr)

      // setting blob
      const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' })

      // setup sek
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
      const fileName = `report_${status}_${formattedDate}.csv`

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName

      //download dong
      link.click()
      window.URL.revokeObjectURL(link.href)
    },

    convertToCSV(data, fields) {
      const header = fields.join(',')
      const rows = data.map((item) => fields.map((field) => item[field] || '').join(','))
      return [header, ...rows].join('\n')
    }
  },

  components: {
    WaveItem
  }
}
</script>

<style scoped>
.btn-header {
  background-color: #ffffff00; /* Default background color */
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.7s; /* Smooth transition effect */
  font-weight: bolder;
  margin-right: 10px !important;
}
.btn-header.active {
  color: white;
  background-color: #7367f0;
  font-weight: bolder;
}

.title-pengajuan {
  color: white;
  padding: 10px 10px 0px 10px;
  font-weight: bolder;
}

.btn-export {
  padding-left: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

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

  .btn-export {
    justify-content: flex-start !important;
  }
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
