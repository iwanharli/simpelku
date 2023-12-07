<template>
  <div class="containerPage bg-secondary p-5" style="padding-top: 40px !important">
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="card">
          <b-card-header class="bg-danger text-light pb-4">
            <div class="header-title">
              <b-row>
                <b-col xl="9" lg="9" md="9" sm="9">
                  <h4 style="font-weight: bold; color: white">PENGAJUAN DITOLAK</h4>
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
                    <th class="text-center" style="font-weight: bolder">PENGAJUAN</th>
                    <th class="text-center" style="font-weight: bolder; width: 5%">NOMOR HP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredRejectedData" :key="index++">
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
                    <td class="text-center">
                      {{ item.created_at }}
                    </td>
                    <td class="text-center bg-soft-dark">
                      <a :href="getWhatsAppLink(item.phone)" class="btn btn-sm btn-success p-2" style="width: 100%" type="button" target="_blank"> <img src="@/assets/images/whatsapp.png" width="20" height="20" /> &nbsp; {{ item.phone }} </a>
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
  name: "RejectedPage",

  data() {
    return {
      rejectedList: [],
      searchQuery: ""
    }
  },

  computed: {
    filteredRejectedData() {
      const searchQuery = this.searchQuery.toLowerCase().trim()
      return this.rejectedList.filter((item) => item.status === "rejected" && Object.values(item).some((value) => value.toString().toLowerCase().includes(searchQuery)))
    }
  },

  mounted() {
    console.clear()
    this.fetchShipRejected()
  },

  methods: {
    async fetchShipRejected() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("/api/v1/ship/pairing-request", config)
        .then((response) => {
          this.rejectedList = response.data.data

          console.log("💚 REJECTED FETCHED", this.rejectedList)
        })
        .catch((error) => {
          console.error("💥 REJECTED ERROR :" + error)
        })
    },

    async fetchShipRejectedDetail(deviceId) {
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
      const filteredRejectedData = this.filteredRejectedData

      if (filteredRejectedData.length === 0) {
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

      const header = Object.keys(filteredRejectedData[0]).join(",")
      const rows = filteredRejectedData.map((ship) => Object.values(ship).join(","))
      const csvContent = `${header}\n${rows.join("\n")}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `PENGAJUAN_DITOLAK_${formattedDate}.csv`)
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
