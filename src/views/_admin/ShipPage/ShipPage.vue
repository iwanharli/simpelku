<template>
  <div class="containerPage">
    <div class="card">
      <b-card-header class="bg-primary text-light pb-4">
        <div class="header-title">
          <b-row>
            <b-col xl="9" lg="9" md="9" sm="9">
              <h4 style="font-weight: bold; color: white">DAFTAR PENGAJUAN KAPAL</h4>
            </b-col>
            <b-col xl="3" lg="3" md="3" sm="3" class="d-flex justify-content-end">
              <button style="display: inline-block" class="btn btn-warning" type="button" id="kapal_detail" @click="handleClick"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
            </b-col>
            <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
              <input type="text" class="form-control search-input border-0 search-ship" placeholder="Pencarian (Kapal / Penanggung Jawab / Device ID / Terdaftar)" v-model="searchQuery" />
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
                <th class="text-center" style="font-weight: bolder">STATUS</th>
                <th style="font-weight: bolder">PENANGGUNG JAWAB</th>
                <th style="font-weight: bolder">TERDAFTAR</th>
                <th style="width: 5%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredData" :key="index++">
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
                  <span style="font-weight: bold; text-transform: uppercase">{{ item.responsible_name }}</span> <br />
                  <small>{{ item.device_id }}</small>
                </td>
                <td>
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
</template>

<script>
import axios from "axios"

export default {
  name: "ShipPage",

  data() {
    return {
      ships: [],
      isLoading: true,
      searchQuery: ""
    }
  },

  computed: {
    filteredData() {
      const query = this.searchQuery.toLowerCase()

      return this.ships
        .map((item, index) => {
          const rowNumber = index + 1

          if (item.ship_name) {
            if (item.ship_name.toLowerCase().includes(query) || item.responsible_name.toLowerCase().includes(query) || item.device_id.toLowerCase().includes(query) || item.created_at.toLowerCase().includes(query) || item.status.toLowerCase().includes(query)) {
              return {
                ...item,
                rowNumber
              }
            }
          }

          return null
        })
        .filter((ship) => ship !== null)
    }
  },

  mounted() {
    this.fetchShip()
  },

  methods: {
    fetchShip() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      axios
        .get("/api/v1/ship/list", config)
        .then((response) => {
          this.ships = response.data.data.map((ship) => {
            const datetimeString = ship.created_at
            const parts = datetimeString.split(" ")
            ship.created_at = parts[0]

            return ship
          })

          console.clear()
          console.log("💚 SHIP FETCHED", this.ships)
        })
        .catch((error) => {
          console.error("💥 SHIP ERROR :", error)
        })
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
