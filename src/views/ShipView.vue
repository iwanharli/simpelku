<template>
  <div
    class="container-fluid flex-grow-1 container-p-y mobile"
  >
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
                  KAPAL TERDAFTAR
                </h2>
              </div>
              <div class="col-xl-2 cold-md-12 btn-export">
                <button
                  style="display: inline-block"
                  class="btn btn-warning"
                  type="button"
                  id="kapal_detail"
                  @click="exportShipToCSV"
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
              :value="filteredShipData"
              :rows="10"
              :rowsPerPageOptions="[10, 20, 50]"
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first}-{last} of {totalRecords}"
              paginator
            >
              <Column field="rowNumber" header="NO" sortable></Column>
              <Column
                field="ship_name"
                header="KAPAL"
                style="text-transform: uppercase"
                sortable
              ></Column>
              <Column field="status" header="STATUS" style="text-transform: uppercase" sortable>
                <template #body="statusData">
                  <Tag
                    :value="statusData.data.status"
                    severity="success"
                    style="width: 100px"
                    v-if="statusData.data.status === 'checkin'"
                    rounded
                  />
                  <Tag
                    :value="statusData.data.status"
                    severity="info"
                    style="width: 100px"
                    v-if="statusData.data.status === 'checkout'"
                    rounded
                  />
                  <Tag
                    :value="statusData.data.status"
                    severity="warning"
                    style="width: 100px"
                    v-if="statusData.data.status === 'out of scope'"
                    rounded
                  />
                </template>
              </Column>
              <Column
                field="responsible_name"
                header="PENANGGUNG JAWAB"
                style="text-transform: uppercase"
                sortable
              ></Column>
              <Column
                field="device_id"
                header="DEVICE ID"
                style="text-transform: uppercase; width: 40%"
                sortable
              ></Column>
              <Column
                field="created_at"
                header="TERDAFTAR"
                style="text-transform: uppercase"
                sortable
              ></Column>
              <Column style="width: 10%">
                <template #body="statusData">
                  <div style="text-align: center">
                    <RouterLink
                      :to="{ name: 'detailKapal', params: { shipId: statusData.data.id } }"
                    >
                      <button
                        class="btn btn-sm btn-primary"
                        type="button"
                        id="kapal_detail"
                        @click="handleClick"
                      >
                        <i class="ti ti-search me-sm-1"></i> DETAIL
                      </button>
                    </RouterLink>
                  </div>
                </template>
              </Column>

              <template #footer>
                <div style="text-transform: lowercase !important">
                  TOTAL <b> {{ filteredShipData ? filteredShipData.length : 0 }} </b
                  ><small> kapal terdaftar. </small>
                </div>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <WaveItem />
  </div>
</template>

<script>
import axios from 'axios'
import WaveItem from '@/components/Items/WaveItem.vue'
import LoaderItem from '../components/Items/LoaderItem.vue'

export default {
  name: 'detailKapal',
  components: {
    WaveItem,
    LoaderItem
  },

  data() {
    return {
      ships: [],
      isLoading: true,
      searchQuery: ''
    }
  },

  computed: {
    filteredShipData() {
      const query = this.searchQuery.toLowerCase()

      console.log('qShip:', query)

      return this.ships
        .map((item, index) => {
          const rowNumber = index + 1

          if (item.ship_name) {
            if (
              item.ship_name.toLowerCase().includes(query) ||
              item.responsible_name.toLowerCase().includes(query) ||
              item.device_id.toLowerCase().includes(query) ||
              item.created_at.toLowerCase().includes(query) ||
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
        .filter((ship) => ship !== null)
    },

    ShipToCSV() {
      return this.filteredShipData.map((item) => ({
        ship_name: item.ship_name,
        responsible_name: item.responsible_name,
        device_id: item.device_id,
        created_at: item.created_at,
        status: item.status
      }))
    }
  },

  mounted() {
    this.getShipFetch()
  },

  methods: {
    // async exportShip() {
    //   this.showLoader = true
    //   // loader start
    //   let loader = this.$loading.show({
    //     container: this.fullPage ? null : this.$refs.formContainer,
    //     canCancel: false,
    //     loader: 'bars',
    //     color: '#000000',
    //     backgroundColor: '#aad3dfa8'
    //   })

    //   setTimeout(() => {
    //     loader.hide()
    //   }, 500)
    //   // loader end
    // },

    async getShipFetch() {
      axios
      .get('api/v1/ship/list', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((response) => {
        this.ships = response.data.data.map((ship) => {
          const datetimeString = ship.created_at // "2023-11-03 18:02:23"
          const parts = datetimeString.split(' ') // ["2023-11-03", "18:02:23"]
          ship.created_at = parts[0]

          setTimeout(() => {
            this.isLoading = false
          }, 1000)

          console.clear()
          console.log('DATA SHIP FETCHED')

          return ship
        })
        // console.log(this.ships)
      })
      .catch((error) => {
        setTimeout(this.getShipFetch, 1000)
        console.error('Error: ' + error.response.data.meta.message)

        if (error.response.data.meta.message === 'Unauthorized') {
          localStorage.setItem('authenticated', false.toString())
          localStorage.removeItem('token')

          window.location.reload()
          router.push({ name: 'login' })
        }
      })
    },

    exportShipToCSV() {
      const jsonFields = ['ship_name', 'responsible_name', 'device_id', 'created_at', 'status']
      const csvStr = this.jsonToCSV(this.ShipToCSV, jsonFields)

      console.clear()
      console.log('SHIP EXPORTED')

      // Download CSV
      this.downloadShipCSV(csvStr)
    },

    jsonToCSV(jsonArray, jsonFields) {
      let csvStr = jsonFields.join(',') + '\n'

      jsonArray.forEach((element) => {
        const values = jsonFields.map((field) => element[field] || '') // Replace with the actual field names in your report data

        csvStr += values.join(',') + '\n'
      })

      return csvStr
    },

    downloadShipCSV(csvStr) {
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr)
      hiddenElement.target = '_blank'
      hiddenElement.download = `ship_list_${formattedDate}.csv`
      hiddenElement.click()
    },

    // STYLING
    formatShipStatus(status) {
      if (status) {
        return status.toUpperCase()
      } else {
        return '' // Handle the case when status is undefined
      }
    },

    getBadgeClass(status) {
      // Define classes for different status values
      if (status === 'checkin') {
        return 'badge bg-label-success' // Apply the success class
      } else if (status === 'checkout') {
        return 'badge bg-label-info' // Apply the warning class
      } else if (status === 'out of scope') {
        return 'badge bg-label-warning' // Apply the error class
      } else {
        return 'badge bg-label-danger' // Default class if none of the conditions match
      }
    }
  }
}
</script>

<style scoped>
.btn-export {
  padding-left: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

@media (max-width: 1200px) {
  .btn-export {
    justify-content: flex-start !important;
  }
}

@media only screen and (max-width: 994px) {
    .mobile {
      margin-top: 100px;
    }
  }
</style>
