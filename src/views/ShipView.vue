<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="ship_content" style="background: rgba(135, 207, 255, 0.245); border-radius: 20px">
      <!-- LOADER -->
      <div class="border-round border-1 surface-border p-4 surface-card" v-if="isLoading">
        <div class="headline">
          <h4 style="color: rgb(81, 0, 139)">Loading ...</h4>
        </div>
        <div class="tableWrapper">
          <table class="table">
            <tr>
              <td class="loading">
                <div class="bar"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="card" style="z-index: 1" v-else>
        <div
          class="card-header align-items-center"
          style="color: white; border-radius: 5px; padding: 10px !important"
        >
          <div
            class="card-action-title mb-0"
            style="background: #b2bfff; padding: 10px; border-radius: 5px"
          >
            <div class="row">
              <div class="col-xl-10">
                <span class="badge bg-primary" style="font-size: x-large">KAPAL TERDAFTAR</span>
              </div>
              <div class="col-xl-2" style="padding-left: 100px; padding-top: 10px">
                <button
                  class="btn btn-warning"
                  type="button"
                  id="kapal_detail"
                  @click="handleClick"
                >
                  <i class="ti ti-external-link me-sm-1"></i> Export
                </button>
              </div>
              <div class="col-xl-12" style="margin-top: 20px">
                <input
                  type="text"
                  class="form-control search-input border-0 search-ship"
                  placeholder="(Kapal / Penanggung Jawab / Device ID / Terdaftar)"
                  v-model="searchQuery"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-datatable table-striped">
          <DataTable
            :value="filteredData"
            :rows="10"
            :rowsPerPageOptions="[10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            stripedRows
            paginator
          >
            <Column field="rowNumber" header="NO" sortable></Column>
            <Column field="ship_name" header="KAPAL" sortable></Column>
            <Column field="responsible_name" header="PENANGGUNG JAWAB" sortable></Column>
            <Column field="device_id" header="DEVICE ID" style="width: 5%" sortable></Column>
            <Column field="created_at" header="TERDAFTAR" style="width: 3%" sortable></Column>
            <Column field="status" header="STATUS" style="width: 9%" sortable>
              <template #body="statusData">
                <div style="text-align: center">
                  <Tag
                    :value="statusData.data.status"
                    severity="success"
                    v-if="statusData.data.status === 'checkin'"
                  />
                  <Tag
                    :value="statusData.data.status"
                    severity="info"
                    v-if="statusData.data.status === 'checkout'"
                  />
                  <Tag
                    :value="statusData.data.status"
                    severity="warning"
                    v-if="statusData.data.status === 'out of scope'"
                  />
                </div>
              </template>
            </Column>
            <Column style="width: 10%">
              <template #body="statusData">
                <div style="text-align: center">
                  <RouterLink :to="{ name: 'detailKapal', params: { shipId: statusData.data.id } }">
                    <button
                      class="btn btn-xs btn-detail-kapal"
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
              TOTAL <b> {{ filteredData ? filteredData.length : 0 }} </b
              ><small> kapal terdaftar. </small>
            </template>
          </DataTable>
          <!-- <table class="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Kapal</th>
                <th>Penanggung Jawab</th>
                <th>Device ID</th>
                <th>Terdaftar</th>
                <th></th>
                <th>Status Saat Ini</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ship, index) in filteredData" :key="index++">
                <td width="1%">{{ index++ }}</td>
                <td>{{ ship.ship_name.toUpperCase() }}</td>
                <td>{{ ship.responsible_name.toUpperCase() }}</td>
                <td>{{ ship.device_id.toUpperCase() }}</td>
                <td>{{ ship.created_at.toUpperCase() }}</td>
                <td width="1%">
                  <div class="avatar avatar-online" v-if="ship.on_ground === 0">
                    <img src="../../../assets/img/sea.png" class="h-auto" />
                  </div>
                  <div class="avatar avatar-offline" v-else>
                    <img src="../../../assets/img/no-connection.png" class="h-auto" />
                  </div>
                </td>
                <td class="text-center">
                  <span :class="getBadgeClass(ship.status)">{{
                    formatShipStatus(ship.status)
                  }}</span>
                </td>
                <td class="text-center">
                  <a @click="handleClick">
                    <RouterLink :to="{ name: 'detailKapal', params: { shipId: ship.id } }">
                      <button class="btn btn-sm btn-detail-kapal" type="button" id="kapal_detail">
                        <i class="ti ti-search me-sm-1"></i>
                      </button>
                    </RouterLink>
                  </a>
                </td>
              </tr>
            </tbody>
          </table> -->
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
// import VueJsonToCsv from 'vue-json-to-csv'

import Button from 'primevue/button'
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import InputText from 'primevue/inputtext'

import WaveComponent from '../components/Items/WaveItem.vue'

export default {
  name: 'detailKapal',
  components: {
    Tag,
    Button,
    DataTable,
    Row,
    Column,
    ColumnGroup,
    InputText,
    WaveComponent
  },

  data() {
    return {
      ships: [],
      isLoading: true,
      searchQuery: ''
    }
  },

  computed: {
    filteredData() {
      const query = this.searchQuery.toLowerCase()

      console.log('Query:', query)

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
    }
  },

  mounted() {
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

          return ship
        })

        this.isLoading = false
        console.log(this.ships)
      })
      .catch((error) => {
        console.error('Error: ' + error.response.data.meta.message)
      })
  },

  methods: {
    async handleClick() {
      this.showLoader = true
      // loader start
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: 'bars',
        color: '#000000',
        backgroundColor: '#aad3dfa8'
      })

      setTimeout(() => {
        loader.hide()
      }, 500)
      // loader end
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

<style module>
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

.tableWrapper {
  width: 100%;

  .table {
    margin: 0 auto;
    text-align: left;
    border-spacing: 0;
    border: 1px solid rgba(255, 0, 0, 0);

    tbody {
      td {
        span {
          color: #fefefe;
        }

        &:last-child {
          border-radius: 0 20px 20px 0;
        }
      }
    }
  }
  .loading {
    position: relative;

    .bar {
      background-color: #6687ff8a;
      height: 14px;
      border-radius: 7px;
      width: 100%;
    }

    &:after {
      position: absolute;
      border-radius: 20px;
      transform: translateY(-50%);
      top: 50%;
      left: 16px;
      content: '';
      display: block;
      width: 100%;
      height: 24px;
      background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.649) 60%,
        rgba(255, 0, 0, 0) 80%
      );
      background-size: 200px 100px;
      background-position: -100px 0;
      background-repeat: no-repeat;
      animation: loading 0.7s infinite;
    }
  }
}

.search-ship::placeholder {
  color: #1cacff; /* Replace with your desired color value */
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
</style>
