<template>
  <div class="containerPage bg-secondary p-5" style="padding-top: 40px !important">
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="card">
          <b-card-header class="bg-info text-light pb-4">
            <div class="header-title">
              <b-row>
                <b-col xl="9" lg="9" md="9" sm="9">
                  <h4 style="font-weight: bold; color: white">PENGAJUAN DISETUJUI</h4>
                </b-col>
                <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
                  <button style="display: inline-block" class="btn btn-secondary" type="button" id="kapal_detail" @click="downloadCSV()"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
                </b-col>
                <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                  <input type="text" class="form-control search-input border-0 search-ship" placeholder="Pencarian (Kapal / Penanggung Jawab / Device ID / No HP)" v-model="searchQuery" />
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
                    <th style="font-weight: bolder">PENANGGUNG JAWAB</th>
                    <th class="text-center" style="font-weight: bolder; width: 5%">NOMOR HP</th>
                    <th class="text-center" style="font-weight: bolder">TERDAFTAR</th>
                    <th style="width: 5%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredApprovedData" :key="index++">
                    <td class="text-center bg-soft-light">
                      {{ index }}
                    </td>
                    <td style="text-transform: uppercase; font-weight: bolder">
                      {{ item.ship_name }}
                    </td>
                    <td>
                      <span style="font-weight: bold; text-transform: uppercase">{{ item.responsible_name }}</span> <br />
                      <small>{{ item.device_id }}</small>
                    </td>
                    <td style="text-transform: uppercase; font-weight: bolder">
                      <a :href="getWhatsAppLink(item.phone)" type="button" class="btn btn-sm" target="_blank">
                        <img src="@/assets/images/whatsapp.png" width="25" height="25" />
                      </a>
                      {{ item.phone }}
                    </td>
                    <td class="text-center">
                      {{ item.created_at }}
                    </td>
                    <td class="text-center bg-soft-dark">
                      <RouterLink :to="{ name: 'admin.shipDetail', params: { shipId: item.id } }">
                        <button class="btn btn-md btn-primary" type="button" id="kapal_detail"><i class="ti ti-search me-sm-1"></i> DETAIL</button>
                      </RouterLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
  name: "AcceptedPage",

  data() {
    return {
      acceptedList: [],
      shipDetail: [],
      historyPairing: [],
      searchQuery: ""
    }
  },

  computed: {
    filteredApprovedData() {
      const searchQuery = this.searchQuery.toLowerCase().trim()
      return this.acceptedList.filter((item) => item.status === "approved" && Object.values(item).some((value) => value.toString().toLowerCase().includes(searchQuery)))
    }
  },

  mounted() {
    console.clear()
    this.fetchShipAccepted()
  },

  methods: {
    async fetchShipAccepted() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("/api/v1/ship/pairing-request", config)
        .then((response) => {
          this.acceptedList = response.data.data

          console.log("💚 ACCEPTED FETCHED", this.acceptedList)
        })
        .catch((error) => {
          console.error("💥 ACCEPTED ERROR :" + error)
        })
    },

    async fetchShipAcceptedDetail(deviceId) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      axios
        .get(`/api/v1/ship/pairing/detail/${deviceId}`, config)
        .then((res) => {
          this.shipDetail = res.data.data
          this.historyPairing = res.data.data.history_pairing

          console.log("💚 SHIP DETAIL FETCHED", this.shipDetail)
        })
        .catch((error) => {
          console.error("💥 SHIP DETAIL ERROR :", error)
          return
        })
    },

    getWhatsAppLink(phoneNumber) {
      phoneNumber = phoneNumber.replace(/[-\s]/g, "")

      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+62" + phoneNumber.slice(1)
      }

      return `https://wa.me/${phoneNumber}?text=`
    },

    formatDate(date) {
      const options = { day: "numeric", month: "numeric", year: "numeric" }
      return new Date(date).toLocaleDateString("en-GB", options)
    },

    downloadCSV() {
      const filteredApprovedData = this.filteredApprovedData

      if (filteredApprovedData.length === 0) {
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
          icon: "warning",
          title: "DATA KOSONG"
        })
        return
      }

      const currentDate = new Date()
      const formattedDate = this.formatDate(currentDate)

      const header = Object.keys(filteredApprovedData[0]).join(",")
      const rows = filteredApprovedData.map((ship) => Object.values(ship).join(","))
      const csvContent = `${header}\n${rows.join("\n")}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `PENGAJUAN_DISETUJUI_${formattedDate}.csv`)
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
    }
  }
}
</script>
