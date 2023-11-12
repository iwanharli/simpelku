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
          <li class="nav-item" style="padding-right: 10px">
            <button
              class="nav-link active btn-header"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-labuh"
              role="tab"
              aria-selected="true"
              @click="getShipDocking()"
            >
              <i class="ti ti-ship"></i> &nbsp; LOG LABUH
            </button>
          </li>
          <li class="nav-item" style="padding-right: 10px">
            <button
              class="nav-link btn-header"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-fraud"
              role="tab"
              aria-selected="false"
              @click="getShipFraud()"
            >
              <i class="ti ti-alarm"></i> &nbsp; LOG FRAUD / KECURANGAN
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="tab-content">
      <!-- LABUH -->
      <div class="tab-pane fade active show" id="form-tabs-labuh" role="tabpanel">
        <div class="col-xl-12 col-md-12 col-sm-12">
          <div class="card" style="z-index: 1">
            <div
              class="card-header align-items-center"
              style="border-radius: 5px; padding: 10px !important"
            >
              <div
                class="card-action-title mb-0"
                style="background: #8379f2; padding: 10px; border-radius: 5px"
              >
                <div class="row">
                  <div class="col-xl-10 col-md-12">
                    <h2 class="title-history-labuh" style="">HISTORY LABUH KAPAL</h2>
                  </div>
                  <div class="col-xl-2 cold-md-12 btn-export">
                    <button
                      style="display: inline-block"
                      class="btn btn-warning"
                      type="button"
                      @click="exportDockingToCSV"
                    >
                      <i class="ti ti-external-link me-sm-1"></i> Export
                    </button>
                  </div>
                  <div class="col-xl-12" style="margin-top: 20px">
                    <input
                      type="text"
                      class="form-control search-input border-0 search-ship"
                      placeholder="Pencarian (Kapal / Status)"
                      v-model="searchDockingQuery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-datatable table-striped">
              <!-- SKELETON -->
              <div v-if="isLoading">
                <div v-for="row in 5" :key="row" class="row" style="padding: 10px">
                  <div v-for="col in 6" :key="col" class="col-xl-{{ col === 4 ? 4 : 2 }}">
                    <Skeleton class="border-round h-2rem" />
                  </div>
                </div>
              </div>

              <!-- ISI -->
              <div v-else>
                <DataTable
                  :value="filteredReportDocking"
                  tableStyle="min-width: 50rem"
                  style="z-index: 1"
                  :rows="10"
                  :rowsPerPageOptions="[10, 50, 100]"
                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  stripedRows
                  paginator
                >
                  <Column
                    field="rowNumber"
                    header="NO"
                    style="width: 5%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="ship_name"
                    header="KAPAL"
                    style="width: 20%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="status"
                    header="STATUS"
                    style="width: 15%; text-transform: uppercase"
                    sortable
                  >
                    <template #body="statusData">
                      <Tag
                        :value="statusData.data.status"
                        severity="success"
                        v-if="statusData.data.status === 'checkin'"
                        style="width: 100px"
                        rounded
                      />
                      <Tag
                        :value="statusData.data.status"
                        severity="danger"
                        v-if="statusData.data.status === 'checkout'"
                        style="width: 100px"
                        rounded
                      />
                      <Tag
                        :value="statusData.data.status"
                        severity="warning"
                        v-if="statusData.data.status === 'out of scope'"
                        style="width: 100px"
                        rounded
                      />
                    </template>
                  </Column>
                  <Column
                    field="lat"
                    header="LATITUDE"
                    style="width: 15%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="long"
                    header="LONGITUDE"
                    style="width: 15%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="log_date"
                    header="WAKTU LOG"
                    style="width: 20%; text-transform: uppercase"
                    sortable
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FRAUD -->
      <div class="tab-pane fade" id="form-tabs-fraud" role="tabpanel">
        <div class="col-xl-12 col-md-6">
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
                      HISTORY FRAUD / KECURANGAN
                    </h2>
                  </div>
                  <div class="col-xl-2 cold-md-12 btn-export">
                    <button
                      style="display: inline-block"
                      class="btn btn-warning"
                      type="button"
                      id="kapal_detail"
                      @click="exportFraudToCSV"
                    >
                      <i class="ti ti-external-link me-sm-1"></i> Export
                    </button>
                  </div>
                  <div class="col-xl-12" style="margin-top: 20px">
                    <input
                      type="text"
                      class="form-control search-input border-0 search-ship"
                      placeholder="Pencarian (Kapal)"
                      v-model="searchFraudQuery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-datatable table-striped">
              <!-- SKELETON -->
              <div v-if="isLoading">
                <div v-for="row in 5" :key="row" class="row" style="padding: 10px">
                  <div v-for="col in 6" :key="col" class="col-xl-{{ col === 4 ? 4 : 2 }}">
                    <Skeleton class="border-round h-2rem" />
                  </div>
                </div>
              </div>

              <!-- ISI -->
              <div v-else>
                <DataTable
                  :value="filteredReportFraud"
                  tableStyle="min-width: 50rem"
                  style="z-index: 1"
                  :rows="10"
                  :rowsPerPageOptions="[10, 50, 100]"
                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  stripedRows
                  paginator
                >
                  <Column
                    field="rowNumber"
                    header="NO"
                    style="width: 5%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="ship_name"
                    header="KAPAL"
                    style="width: 20%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="on_ground"
                    header="STATUS"
                    style="width: 15%; text-transform: uppercase"
                    sortable
                  >
                    <template #body="statusData">
                      <Tag
                        value="DARAT"
                        severity="success"
                        v-if="statusData.data.on_ground === 1"
                        style="width: 100px"
                      />
                      <Tag
                        value="PERAIRAN"
                        severity="danger"
                        v-if="statusData.data.on_ground === 0"
                        style="width: 100px"
                      />
                    </template>
                  </Column>
                  <Column
                    field="lat"
                    header="LATITUDE"
                    style="width: 15%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="long"
                    header="LONGITUDE"
                    style="width: 15%; text-transform: uppercase"
                    sortable
                  ></Column>
                  <Column
                    field="log_date"
                    header="WAKTU LOG"
                    style="width: 20%; text-transform: uppercase"
                    sortable
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Hero area end-->
    <WaveComponent />
    <!--Hero area end-->
  </div>
</template>

<script>
import axios from 'axios'
import WaveComponent from '../components/Items/WaveItem.vue'


export default {
  name: 'pageReport',
  data() {
    return {
      dockingReports: [],
      fraudReports: [],
      isLoading: true,
      searchDockingQuery: '',
      searchFraudQuery: ''
    }
  },

  computed: {
    filteredReportDocking() {
      const query = this.searchDockingQuery.toLowerCase()

      console.log('qDocking:', query)

      return this.dockingReports
        .map((item, index) => {
          const rowNumber = index + 1

          if (item.ship_name) {
            if (
              item.ship_name.toLowerCase().includes(query) ||
              item.status.toLowerCase().includes(query)
            ) {
              return {
                ...item,
                rowNumber
              }
            }
          }

          return null
        })
        .filter((report) => report !== null)
    },

    filteredReportFraud() {
      const query = this.searchFraudQuery.toLowerCase()

      console.log('qFraud:', query)

      return this.fraudReports
        .map((item, index) => {
          const rowNumber = index + 1

          if (item.ship_name) {
            if (item.ship_name.toLowerCase().includes(query)) {
              return {
                ...item,
                rowNumber
              }
            }
          }

          return null
        })
        .filter((report) => report !== null)
    },

    ReportDockingToCSV() {
      return this.filteredReportDocking.map((item) => ({
        ship_name: item.ship_name,
        ship_status: item.status,
        ship_lat: item.lat,
        ship_long: item.long,
        log_date: item.log_date
      }))
    },

    ReportFrudToCSV() {
      return this.filteredReportFraud.map((item) => ({
        ship_name: item.ship_name,
        ship_ground: item.on_ground,
        ship_lat: item.lat,
        ship_long: item.long,
        log_date: item.log_date
      }))
    }
  },

  mounted() {
    this.getShipDocking()
    // this.getShipFraud()
  },

  methods: {
    async getShipDocking() {
      await axios
        .get('api/v1/report/ship-docking', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.dockingReports = res.data.data

          // console.log(this.reports)
          console.clear()
          console.log('DATA DOCKING FETCHED')
          this.isLoading = false
        })
        .catch((error) => {
          setTimeout(this.getShipDocking, 1000)

          console.log('ERROR GET SHIP DOCKING : ' + error)
        })
    },

    async getShipFraud() {
      await axios
        .get('api/v1/report/ship-fraud', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.fraudReports = res.data.data

          // console.log(this.fraudReports)
          console.clear()
          console.log('DATA FRAUD FETCHED')
          this.isLoading = false
        })
        .catch((error) => {
          setTimeout(this.getShipDocking, 1000)

          console.log('ERROR GET SHIP DOCKING : ' + error)
        })
    },

    exportDockingToCSV() {
      const jsonFields = ['ship_name', 'ship_status', 'ship_lat', 'ship_long', 'log_date']
      const csvStr = this.jsonToCSV(this.ReportDockingToCSV, jsonFields)

      console.log('REPORT DOCKING EXPORTED')

      // Download CSV
      this.downloadDockingCSV(csvStr)
    },

    exportFraudToCSV() {
      const jsonFields = ['ship_name', 'ship_ground', 'ship_lat', 'ship_long', 'log_date']
      const csvStr = this.jsonToCSV(this.ReportFrudToCSV, jsonFields)

      // console.log(csvStr)
      console.log('REPORT FRAUD EXPORTED')

      // Download CSV
      this.downloadFraudCSV(csvStr)
    },

    jsonToCSV(jsonArray, jsonFields) {
      let csvStr = jsonFields.join(',') + '\n'

      jsonArray.forEach((element) => {
        const values = jsonFields.map((field) => element[field] || '') // Replace with the actual field names in your report data

        csvStr += values.join(',') + '\n'
      })

      return csvStr
    },

    downloadDockingCSV(csvStr) {
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr)
      hiddenElement.target = '_blank'
      hiddenElement.download = `report_docking_${formattedDate}.csv`
      hiddenElement.click()
    },

    downloadFraudCSV(csvStr) {
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr)
      hiddenElement.target = '_blank'
      hiddenElement.download = `report_fraud_${formattedDate}.csv`
      hiddenElement.click()
    }
  },

  components: {
    WaveComponent
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

.btn-export {
  padding-left: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 1200px) {
  .btn-export {
    justify-content: flex-start !important;
  }
}

.title-history-labuh {
  color: white;
  padding: 10px 10px 0px 10px;
  font-weight: bolder;
}

@keyframes loading {
  40% {
    background-position: 100% 0;
  }
  100% {
    background-position: 100% 1;
  }
}

.headline {
  text-align: center;
  margin-bottom: 20px;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation:
    typing 1s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 30%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}

.wave_area {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
</style>
