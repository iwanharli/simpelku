<template>
  <div class="containerPage bg-secondary p-5" style="padding-top: 40px !important">
    <div class="card" data-aos="fade-down" data-aos-delay="110">
      <b-card-header class="bg-danger text-light pb-4">
        <div class="header-title">
          <b-row>
            <b-col xl="9" lg="9" md="9" sm="9">
              <h4 style="font-weight: bold; color: white">HISTORY FRAUD / KECURANGAN</h4>
            </b-col>
            <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
              <button style="display: inline-block" class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#modalDownload"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
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
                <th style="width: 5%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredFraudReports" :key="index++">
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
                <td class="text-center bg-soft-dark">
                  <RouterLink :to="{ name: 'admin.shipDetail', params: { shipId: item.ship_id } }">
                    <button class="btn btn-sm btn-primary" type="button" id="kapal_detail"><i class="ti ti-search me-sm-1"></i> DETAIL</button>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalDownload" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white" style="font-weight: bold">Export CSV</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="col-12 mb-3">
            <label class="form-label" style="font-weight: bolder">PILIH KAPAL</label>
            <select class="form-select" v-model="selectedShip">
              <option v-for="ship in uniqueShipNames" :key="ship.value" :value="ship.value" style="text-transform: uppercase">
                {{ ship.label }}
              </option>
            </select>
          </div>
          <div class="row mt-4">
            <label class="form-label" style="font-weight: bolder">TANGGAL</label>
            <div class="col-6 mb-3">
              <input type="date" class="form-control" v-model="inputDateStart" required="" />
            </div>
            <div class="col-6 mb-3">
              <input type="date" class="form-control" v-model="inputDateEnd" required="" />
            </div>
          </div>
        </div>
        <div class="modal-footer mt-4">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="validationDownload()">Download</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"
import AOS from "aos"
import { onMounted, ref } from "vue"

export default {
  name: "FraudPage",
  setup() {
    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })
  },

  data() {
    return {
      fraudReports: [],
      searchFraudQuery: "",

      selectedShip: "",
      inputDateStart: "",
      inputDateEnd: ""
    }
  },

  computed: {
    filteredFraudReports() {
      const searchQuery = this.searchFraudQuery.toLowerCase().trim()
      return this.fraudReports.filter((report) => report.ship_name.toLowerCase().includes(searchQuery))
    },

    uniqueShipNames() {
      const uniqueNames = [...new Set(this.fraudReports.map((report) => report.ship_name))]
      return uniqueNames.map((name) => ({ label: name, value: name }))
    }
  },

  mounted() {
    this.getShipFraud()
  },

  methods: {
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

    validationDownload() {
      if (!this.selectedShip) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "error",
          title: "SILAHKAN PILIH KAPAL"
        })
        return
      }

      if (!this.inputDateStart) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "error",
          title: "SILAHKAN ISI RENTANG TANGGAL"
        })
        return
      }

      if (!this.inputDateEnd) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "error",
          title: "SILAHKAN ISI RENTANG TANGGAL"
        })
        return
      }

      this.checkDockingData()
    },

    checkDockingData() {
      console.log("🐊", this.selectedShip, this.inputDateStart, this.inputDateEnd)

      // Filter by ship name
      let filteredReports = this.fraudReports.filter((report) => {
        return report.ship_name === this.selectedShip
      })

      // Filter by date range
      filteredReports = filteredReports.filter((report) => {
        const reportDate = new Date(report.log_date)
        return reportDate >= new Date(this.inputDateStart) && reportDate <= new Date(this.inputDateEnd)
      })

      console.log("↪️", filteredReports)

      // Check if filteredReports is null or empty
      if (!filteredReports || filteredReports.length === 0) {
        console.error("💥 EXPORT FAILED, DATA NULL")

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "warning",
          title: "GAGAL",
          text: "DATA KOSONG !"
        })

        ;(this.selectedShip = ""), (this.inputDateStart = ""), (this.inputDateEnd = "")

        return
      }

      const header = Object.keys(filteredReports[0]).join(",")
      const rows = filteredReports.map((report) => Object.values(report).join(","))
      const csvContent = `${header}\n${rows.join("\n")}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      const currentDate = new Date()
      const formattedDate = this.formatDate(currentDate)

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `LOG_FRAUD_${formattedDate}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        console.error("💥 EXPORT FAILED, BROWSER DOESNT SUPPORT BLOB/DOWNLOAD:")

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "error",
          title: "GAGAL",
          text: "Browser Tidak Support BLOB/Download ! 😊"
        })
      }
    },

    formatDate(date) {
      const options = { day: "numeric", month: "numeric", year: "numeric" }
      return new Date(date).toLocaleDateString("en-GB", options)
    }
  }
}
</script>
