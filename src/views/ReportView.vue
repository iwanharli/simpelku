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

      <div class="card" v-else>
        <div style="background: red; height: 300px">
          <span class="p-input-icon-right">
            <i class="pi pi-spin pi-spinner" />
            <InputText v-model="value2" />

            <Knob v-model="value2" />
          </span>
        </div>

        <div
          class="card-header align-items-center"
          style="color: white; border-radius: 5px; padding: 10px !important"
        >
          <div
            class="card-action-title mb-0"
            style="background: #b2dbff; padding: 10px; border-radius: 5px"
          >
            <div class="row">
              <div class="col-xl-10">
                <span class="badge bg-primary" style="font-size: x-large">LAPORAN LOG KAPAL</span>
              </div>
              <div
                v-for="category of categories"
                :key="category.key"
                class="flex align-items-center"
              >
                <Checkbox
                  v-model="selectedCategories"
                  :inputId="category.key"
                  name="category"
                  :value="category.name"
                />
                <label :for="category.key">{{ category.name }}</label>
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
            </div>
            <p />
            <input
              type="text"
              class="form-control search-input border-0 search-ship"
              placeholder="Pencarian (Kapal / Status)"
              v-model="searchQuery"
            />
          </div>
        </div>
        <DataTable
          :value="filteredReportData"
          tableStyle="min-width: 50rem"
          style="z-index: 1"
          :rows="10"
          :rowsPerPageOptions="[10, 50, 100]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          stripedRows
          paginator
        >
          <Column field="rowNumber" header="NO"></Column>
          <Column field="ship_name" header="KAPAL" sortable></Column>
          <Column field="status" header="STATUS" style="width: 9%" sortable>
            <template #body="statusData">
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
            </template>
          </Column>
          <Column field="lat" header="LATITUDE" sortable></Column>
          <Column field="long" header="LONGITUDE" sortable></Column>
          <Column field="log_date" header="WAKTU LOG" sortable></Column>
        </DataTable>

        <!-- <div class="row mt-3">
          <div class="col-xl-4 col-sm-6" style="padding: 15px; margin-left: 20px">
            <button type="button" class="btn btn-lg btn-primary active waves-effect waves-light">
              SEMUA
            </button>
            &nbsp;&nbsp;&nbsp;
            <button class="btn btn-secondary btn-md waves-effect waves-light" type="button">
              CHECKIN
            </button>
            &nbsp;&nbsp;&nbsp;
            <button class="btn btn-secondary btn-md waves-effect waves-light" type="button">
              CHECKOUT
            </button>
          </div>
          <div class="col-xl-5 col-sm-6" style="padding: 15px; margin-left: 20px">
            <div
              class="row"
              style="
                background: #b2bfff45;
                color: white;
                padding: 5px;
                border-radius: 5px;
                margin-right: 10px;
              "
            >
              <div class="col-xl-4">
                <input
                  type="date"
                  id="nameWithTitle"
                  class="form-control"
                  v-model="shipSelarMark"
                />
              </div>
              <div class="col-xl-4">
                <input
                  type="date"
                  id="nameWithTitle"
                  class="form-control"
                  v-model="shipSelarMark"
                />
              </div>
              <div class="col-xl-4">
                <div class="d-grid gap-2 col-lg-12 mx-auto">
                  <button type="button" class="btn btn-md btn-primary waves-effect waves-light">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-1 col-sm-6" style="padding: 15px; margin-left: 20px">
            <div
              class="row"
              style="
                /* background: #b2bfff45; */
                color: white;
                padding: 5px;
                border-radius: 5px;
                margin-right: 10px;
              "
            >
              <button type="button" class="btn btn-sm btn-warning waves-effect">
                <span class="ti-md ti ti-download me-1"></span>
              </button>
            </div>
          </div>

          <div class="col-xl-12 col-sm-6">
            <div class="card-datatable text-wrap mt-2" style="overflow-y: auto">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NAMA KAPAL</th>
                    <th>STATUS</th>
                    <th>LATITUDE</th>
                    <th>LONGITUDE</th>
                    <th>WAKTU LOG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(report, index) in this.reports" :key="index++">
                    <td width="1%">{{ index++ }}</td>
                    <td>{{ report.ship_name }}</td>
                    <td>{{ report.status }}</td>
                    <td>{{ report.lat }}</td>
                    <td>{{ report.long }}</td>
                    <td>{{ report.log_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <!--Hero area end-->
    <WaveComponent />
    <!--Hero area end-->
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

import Knob from 'primevue/knob'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import InputText from 'primevue/inputtext'
import WaveComponent from '../components/Items/WaveItem.vue'

export default {
  name: 'pageReport',
  data() {
    return {
      reports: [],
      isLoading: true,
      searchQuery: ''
    }
  },

  computed: {
    filteredReportData() {
      const query = this.searchQuery.toLowerCase()

      console.log('Query:', query)

      return this.reports
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
    }
  },

  mounted() {
    axios
      .get('api/v1/report/ship-docking?type=checkin,checkout', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.reports = res.data.data

        console.log(this.reports)
        this.isLoading = false
      })
      .catch((error) => {
        console.log('Error : ' + error.response.data.meta.message)
      })
  },

  methods: {},

  components: {
    Knob,
    Tag,
    Button,
    Checkbox,
    DataTable,
    Row,
    Column,
    ColumnGroup,
    InputText,
    WaveComponent
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

.wave_area {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
</style>
