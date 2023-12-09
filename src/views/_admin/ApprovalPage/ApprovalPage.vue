<template>
  <div class="containerPage bg-secondary p-5" style="padding-top: 40px !important;">
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12" class="mb-3">
        <div class="card-header" style="border-radius: 20px; font-weight: bolder">
          <ul class="nav nav-tabs card-header-tabs bg-soft-dark pt-3 pb-3" role="tablist" style="display: flex; justify-content: center; border-radius: 20px; border: 5px solid white">
            <li class="nav-item" style="padding-right: 10px">
              <button class="nav-link btn-header" data-bs-toggle="tab" data-bs-target="#form-tabs-approved" role="tab" aria-selected="false"><i class="ti ti-check"></i> &nbsp; DISETUJUI</button>
            </li>
            <li class="nav-item" style="padding-right: 10px">
              <button class="nav-link btn-header active" data-bs-toggle="tab" data-bs-target="#form-tabs-pending" role="tab" aria-selected="false"><i class="ti ti-alarm"></i> &nbsp; PENDING</button>
            </li>
            <li class="nav-item" style="padding-right: 10px">
              <button class="nav-link btn-header" data-bs-toggle="tab" data-bs-target="#form-tabs-rejected" role="tab" aria-selected="false"><i class="ti ti-ban"></i> &nbsp; DITOLAK</button>
            </li>
          </ul>
        </div>
      </b-col>

      <b-col xl="12" lg="12" md="12" sm="12">
        <div class="tab-content">
          <!-- DISETUJUI  -->
          <div class="tab-pane fade" id="form-tabs-approved" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-info text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">PENGAJUAN DISETUJUI</h4>
                    </b-col>
                    <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
                      <button style="display: inline-block" class="btn btn-secondary" type="button" id="kapal_detail" @click="handleClick"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
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
                      <tr v-for="(item, index) in addRowNumbers(approvedData)" :key="index++">
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
          </div>

          <!-- PENDING  -->
          <div class="tab-pane fade active show" id="form-tabs-pending" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-warning text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">PENGAJUAN MENUNGGU</h4>
                    </b-col>
                    <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
                      <button style="display: inline-block" class="btn btn-secondary" type="button" id="kapal_detail" @click="handleClick"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
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
                      <tr v-for="(item, index) in addRowNumbers(pendingData)" :key="index++">
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
          </div>

          <!-- DITOLAK  -->
          <div class="tab-pane fade" id="form-tabs-rejected" role="tabpanel">
            <div class="card">
              <b-card-header class="bg-danger text-light pb-4">
                <div class="header-title">
                  <b-row>
                    <b-col xl="9" lg="9" md="9" sm="9">
                      <h4 style="font-weight: bold; color: white">PENGAJUAN DITOLAK</h4>
                    </b-col>
                    <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
                      <button style="display: inline-block" class="btn btn-secondary" type="button" id="kapal_detail" @click="handleClick"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in addRowNumbers(rejectedData)" :key="index++">
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
  name: "ApprovalPage",

  data() {
    return {
      approvalList: [],
      shipDetail: [],
      historyPairing: [],

      searchQuery: "",
      isLoading: true
    }
  },

  computed: {
    approvedData() {
      return this.approvalList.filter((item) => item.status === "approved")
    },
    pendingData() {
      return this.approvalList.filter((item) => item.status === "pending")
    },
    rejectedData() {
      return this.approvalList.filter((item) => item.status === "rejected")
    }
  },

  mounted() {
    this.fetchShipApproval()
  },

  methods: {
    addRowNumbers(data) {
      const query = this.searchQuery.toLowerCase()

      // console.log(query)

      return data
        .filter((item) => {
          // Add your custom filtering logic here based on the search query
          return item.ship_name.toLowerCase().includes(query) || item.responsible_name.toLowerCase().includes(query) || item.device_id.toLowerCase().includes(query) || item.phone.toLowerCase().includes(query)
        })
        .map((item, index) => {
          return {
            ...item,
            rowNumber: index + 1 // Start from 1
          }
        })
    },

    async fetchShipApproval() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("/api/v1/ship/pairing-request", config)
        .then((response) => {
          this.approvalList = response.data.data

          console.clear()
          console.log("💚 APPROVAL FETCHED", this.approvalList)
        })
        .catch((error) => {
          console.error("💥 APPROVAL ERROR :" + error)
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
          console.error("💥 SHIP DETAIL ERROR :", error)
          return
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
          this.fetchShipApproval()
        })
        .catch((error) => {
          console.error("💥 ACC GAGAL :", error)
        })
    },

    pendingDeclineSubmit(id) {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      const updatedData = {
        pairing_id: parseInt(id),
        status: "rejected"
      }

      axios
        .put("/api/v1/ship/pairing/action", updatedData, config)
        .then((response) => {
          console.log("💚 DECLINE SUCCESS", updatedData)
          this.fetchShipApproval()
        })
        .catch((error) => {
          console.error("💥 DECLINE GAGAL :", error)
        })
    },

    getWhatsAppLink(phoneNumber) {
      phoneNumber = phoneNumber.replace(/[-\s]/g, "")

      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+62" + phoneNumber.slice(1)
      }

      return `https://wa.me/${phoneNumber}?text=`
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
