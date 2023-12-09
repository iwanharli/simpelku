<template>
  <div class="containerPage bg-secondary p-5" style="padding-top: 40px !important">
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="card" data-aos="fade-down" data-aos-delay="110">
          <b-card-header class="bg-warning text-light pb-4">
            <div class="header-title">
              <b-row>
                <b-col xl="9" lg="9" md="9" sm="9">
                  <h4 style="font-weight: bold; color: white">PENGAJUAN MENUNGGU</h4>
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
                    <th class="text-center" style="font-weight: bolder">PENGAJUAN</th>
                    <th style="width: 5%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in filteredPendingData" :key="index++">
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
                      <a @click="pendingApproveSubmit(item.id)" class="btn btn-md btn-success waves-effect waves-light" type="button"> <i class="ti ti-checks me-xs-1"></i> &nbsp; ACC </a>
                      &nbsp;
                      <a @click="pendingDeclineSubmit(item.id)" class="btn btn-md btn-danger waves-effect waves-light" type="button"> <i class="ti ti-ban me-xs-1"></i> &nbsp; TOLAK </a>
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
import AOS from "aos"
import { onMounted, ref } from "vue"

export default {
  name: "PendingPage",
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
      pendingList: [],
      searchQuery: ""
    }
  },

  computed: {
    filteredPendingData() {
      const searchQuery = this.searchQuery.toLowerCase().trim()
      return this.pendingList.filter((item) => item.status === "pending" && Object.values(item).some((value) => value.toString().toLowerCase().includes(searchQuery)))
    }
  },

  mounted() {
    console.clear()
    this.fetchShipPending()
  },

  methods: {
    async fetchShipPending() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("/api/v1/ship/pairing-request", config)
        .then((response) => {
          this.pendingList = response.data.data

          console.log("💚 PENDING FETCHED", this.pendingList)
        })
        .catch((error) => {
          console.error("💥 PENDING ERROR :" + error)
        })
    },

    async pendingApproveSubmit(id) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      const updatedData = {
        pairing_id: parseInt(id),
        status: "approved"
      }

      console.log(updatedData)

      axios
        .put("/api/v1/ship/pairing/action", updatedData, config)
        .then((response) => {
          console.log("💚 ACC SUCCESS", updatedData)

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
            icon: "success",
            title: "Berhasil ACC"
          })

          this.fetchShipPending()
        })
        .catch((error) => {
          console.error("💥 ACC GAGAL :", error)
        })
    },

    async pendingDeclineSubmit(id) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      const updatedData = {
        pairing_id: parseInt(id),
        status: "rejected"
      }
      Swal.fire({
        icon: "warning",
        title: "Yakin ingin menolak?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak"
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put("/api/v1/ship/pairing/action", updatedData, config)
            .then((response) => {
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
                icon: "success",
                title: "Berhasil Menolak"
              })

              console.log("💚 DECLINE SUCCESS", updatedData)
              this.fetchShipPending()
            })
            .catch((error) => {
              console.error("💥 DECLINE GAGAL :", error)
            })
        }
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
      const filteredPendingData = this.filteredPendingData

      if (filteredPendingData.length === 0) {
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

      const header = Object.keys(filteredPendingData[0]).join(",")
      const rows = filteredPendingData.map((ship) => Object.values(ship).join(","))
      const csvContent = `${header}\n${rows.join("\n")}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `PENGAJUAN_PENDING_${formattedDate}.csv`)
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
