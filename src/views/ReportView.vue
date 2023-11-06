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
        <div class="row mt-3">
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
        </div>

        <div class="col-lg-12">
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-end" style="padding-right: 20px">
              <li class="page-item prev">
                <a class="page-link" href="javascript:void(0);"
                  ><i class="ti ti-chevrons-left ti-xs"></i
                ></a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="javascript:void(0);">1</a>
              </li>
              <li class="page-item next">
                <a class="page-link" href="javascript:void(0);"
                  ><i class="ti ti-chevrons-right ti-xs"></i
                ></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!--Hero area end-->
    <WaveComponent />
    <!--Hero area end-->
  </div>

  <WaveComponent />
</template>

<script>
import axios from 'axios'
import WaveComponent from '../components/Items/WaveItem.vue'

export default {
  name: 'pageReport',
  data() {
    return {
      reports: [],
      isLoading: true
    }
  },

  created() {
    this.fetchShipList()
  },

  methods: {
    async fetchShipList() {
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
    }
  },

  components: {
    WaveComponent
  }
}
</script>
