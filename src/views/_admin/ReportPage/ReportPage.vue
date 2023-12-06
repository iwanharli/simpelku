<template>
  <div class="containerPage2">
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12" class="mb-3">
        <div class="card-header" style="border-radius: 20px; font-weight: bolder">
          <ul class="nav nav-tabs card-header-tabs bg-soft-dark pt-3 pb-3" role="tablist" style="display: flex; justify-content: center; border-radius: 20px; border: 5px solid white">
            <li class="nav-item" style="padding-right: 10px">
              <button class="nav-link btn-header active" data-bs-toggle="tab" data-bs-target="#form-tabs-labuh" role="tab" aria-selected="false"><i class="ti ti-ship"></i> &nbsp; LOG LABUH</button>
            </li>
            <li class="nav-item" style="padding-right: 10px">
              <button @click="getShipFraud()" class="nav-link btn-header" data-bs-toggle="tab" data-bs-target="#form-tabs-fraud" role="tab" aria-selected="false"><i class="ti ti-alarm"></i> &nbsp; LOG FRAUD / KECURANGAN</button>
            </li>
          </ul>
        </div>
      </b-col>

      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="tab-content">
          <!-- LOG LABUH  -->
          <div class="tab-pane fade active show" id="form-tabs-labuh" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-primary text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">HISTORY LABUH KAPAL</h4>
                    </b-col>
                    <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
                      <button style="display: inline-block" class="btn btn-secondary" type="button" id="kapal_detail" @click="exportDockingToCSV"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
                    </b-col>
                    <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                      <input type="text" class="form-control search-input border-0 search-ship" placeholder="Pencarian (Nama Kapal)" v-model="searchDockingQuery" />
                    </b-col>
                  </b-row>
                </div>
              </b-card-header>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table id="basic-table" class="table table-hover mb-0" role="grid">
                    <thead>
                      <tr class="bg-soft-secondary">
                        <th style="font-weight: bolder; width: 5px" class="text-center">ID</th>
                        <th style="font-weight: bolder">NAMA KAPAL</th>
                        <th style="font-weight: bolder" class="text-center">STATUS</th>
                        <th style="font-weight: bolder; width: 5%">LATITUDE</th>
                        <th style="font-weight: bolder; width: 5%">LONGITUDE</th>
                        <th style="font-weight: bolder; width: 20%" class="text-center">WAKTU LOG</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in filteredReportDocking" :key="index++">
                        <td class="text-center bg-soft-light">
                          {{ index }}
                        </td>
                        <td style="text-transform: uppercase; font-weight: bolder">
                          {{ item.ship_name }}
                        </td>
                        <td class="text-center" style="text-transform: uppercase">
                          <div class="badge bg-primary pt-2 pb-2" v-if="item.status === 'checkin'">
                            <span>{{ item.status }}</span>
                          </div>
                          <div class="badge bg-info pt-2 pb-2" v-else-if="item.status === 'checkout'">
                            <span>{{ item.status }}</span>
                          </div>
                          <div class="badge bg-warning pt-1 pb-1" v-else-if="item.status === 'out of scope'">
                            <span>{{ item.status }}</span>
                          </div>
                        </td>
                        <td>
                          {{ item.lat }}
                        </td>
                        <td>
                          {{ item.long }}
                        </td>
                        <td class="text-center">
                          {{ item.log_date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- FRAUD  -->
          <div class="tab-pane fade" id="form-tabs-fraud" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-danger text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">HISTORY FRAUD / KECURANGAN</h4>
                    </b-col>
                    <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
                      <button style="display: inline-block" class="btn btn-secondary" type="button" id="kapal_detail" @click="exportFraudToCSV"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
                    </b-col>
                    <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                      <input type="text" class="form-control search-input border-0 search-ship" placeholder="Pencarian (Nama Kapal)" v-model="searchFraudQuery" />
                    </b-col>
                  </b-row>
                </div>
              </b-card-header>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table id="basic-table" class="table table-hover mb-0" role="grid">
                    <thead>
                      <tr class="bg-soft-secondary">
                        <th style="font-weight: bolder; width: 5px" class="text-center">ID</th>
                        <th style="font-weight: bolder">NAMA KAPAL</th>
                        <th style="font-weight: bolder" class="text-center">STATUS</th>
                        <th style="font-weight: bolder; width: 5%">LATITUDE</th>
                        <th style="font-weight: bolder; width: 5%">LONGITUDE</th>
                        <th style="font-weight: bolder; width: 20%" class="text-center">WAKTU LOG</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in filteredReportFraud" :key="index++">
                        <td class="text-center bg-soft-light">
                          {{ index }}
                        </td>
                        <td style="text-transform: uppercase; font-weight: bolder">
                          {{ item.ship_name }}
                        </td>
                        <td class="text-center" style="text-transform: uppercase">
                          <div class="badge bg-success" v-if="item.on_ground === 1">
                            <span>{{ item.on_ground === 1 ? "Darat" : "" }}</span>
                          </div>
                          <div class="badge bg-danger pt-2 pb-2" v-if="item.on_ground === 0">
                            <span>{{ item.on_ground === 0 ? "Perairan" : "" }}</span>
                          </div>
                        </td>
                        <td>
                          {{ item.lat }}
                        </td>
                        <td>
                          {{ item.long }}
                        </td>
                        <td class="text-center">
                          {{ item.log_date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "ReportPage",

  data() {
    return {
      dockingReports: [],
      fraudReports: [],
      isLoading: true,

      searchDockingQuery: "",
      searchFraudQuery: ""
    }
  },

  computed: {
    filteredReportDocking() {
      const query = this.searchDockingQuery.toLowerCase()

      console.log("qDocking:", query)

      return this.dockingReports
        .map((item, index) => {
          const rowNumber = index + 1

          if (item.ship_name) {
            if (item.ship_name.toLowerCase().includes(query) || item.status.toLowerCase().includes(query)) {
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

      console.log("qFraud:", query)

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
  },

  methods: {
    async getShipDocking() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("/api/v1/report/ship-docking", config)
        .then((res) => {
          this.dockingReports = res.data.data

          console.clear()
          console.log("💚 LOG DOCKING FETCHED", this.dockingReports)
        })
        .catch((error) => {
          console.error("💥 LOG DOCKING ERROR :", error)
        })
    },

    async getShipFraud() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("/api/v1/report/ship-fraud", config)
        .then((res) => {
          this.fraudReports = res.data.data

          console.clear()
          console.log("💚 LOG FRAUD FETCHED", this.fraudReports)
        })
        .catch((error) => {
          console.log("💥 LOG FRAUD ERROR :", error)
        })
    },

    async fetchShipApprovalDetail(deviceId) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      axios
        .get(`/api/v1/ship/pairing/detail/${deviceId}`, config)
        .then((res) => {
          this.shipDetail = res.data.data
          this.historyPairing = res.data.data.history_pairing

          console.clear()
          console.log("💚 SHIP DETAIL FETCHED", this.shipDetail)
        })
        .catch((error) => {
          console.error("💥 SHIP DETAIL ERROR :" + error)
          return
        })
    },

    exportDockingToCSV() {
      const jsonFields = ["ship_name", "ship_status", "ship_lat", "ship_long", "log_date"]
      const csvStr = this.jsonToCSV(this.ReportDockingToCSV, jsonFields)

      console.log("💚 EXPORT DOCKING SUCCESS")

      // Download CSV
      this.downloadDockingCSV(csvStr)
    },

    exportFraudToCSV() {
      const jsonFields = ["ship_name", "ship_ground", "ship_lat", "ship_long", "log_date"]
      const csvStr = this.jsonToCSV(this.ReportFrudToCSV, jsonFields)

      // console.log(csvStr)
      console.log("💚 EXPORT FRAUD SUCCESS")

      // Download CSV
      this.downloadFraudCSV(csvStr)
    },

    jsonToCSV(jsonArray, jsonFields) {
      let csvStr = jsonFields.join(",") + "\n"

      jsonArray.forEach((element) => {
        const values = jsonFields.map((field) => element[field] || "") // Replace with the actual field names in your report data

        csvStr += values.join(",") + "\n"
      })

      return csvStr
    },

    downloadDockingCSV(csvStr) {
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`

      const hiddenElement = document.createElement("a")
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr)
      hiddenElement.target = "_blank"
      hiddenElement.download = `report_docking_${formattedDate}.csv`
      hiddenElement.click()
    },

    downloadFraudCSV(csvStr) {
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`

      const hiddenElement = document.createElement("a")
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr)
      hiddenElement.target = "_blank"
      hiddenElement.download = `report_fraud_${formattedDate}.csv`
      hiddenElement.click()
    }
  }
}
</script>

<style>
#basic-table tbody tr td:hover {
  background-color: #d2e8ff3a;
  color: black;
}
</style>
