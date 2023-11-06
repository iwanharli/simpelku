<template>
  <div
    class="modal fade"
    id="modalFilterLog"
    aria-labelledby="modalToggleLabel"
    tabindex="-1"
    style="display: none; background-color: rgba(0, 109, 164, 0.23)"
  >
    <div class="modal-dialog" style="margin-top: 100px">
      <div class="modal-content">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="">
              <div class="modal-body">
                <div class="col-md-12 col-12 mb-4">
                  <label for="dateRangePicker" class="form-label">Masukkan Tanggal</label>
                  <div class="input-group input-daterange" id="bs-datepicker-daterange">
                    <input
                      type="text"
                      id="dateRangePicker"
                      placeholder="MM/DD/YYYY"
                      class="form-control"
                    />
                    <span class="input-group-text">to</span>
                    <input type="text" placeholder="MM/DD/YYYY" class="form-control" />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3">
                    <button
                      class="btn btn-primary d-grid w-100"
                      type="submit"
                      @click="updateShipDetail"
                    >
                      Lihat History
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="card">
          <div class="card-header align-items-center head-history">
            <h5
              class="card-action-title mb-0"
              style="color: white; background: #515b91; padding: 5px; border-radius: 5px"
            >
              HISTORY KELUAR MASUK KAPAL
            </h5>
          </div>
          <div class="card-body card-body-filter">
            <table class="table">
              <thead>
                <tr>
                  <th>LOG ID</th>
                  <th>STATUS</th>
                  <th>LOKASI</th>
                  <th>TANGGAL TERCATAT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in locationLogs" :key="log.log_id">
                  <td>{{ log.log_id }}</td>
                  <td>
                    <template v-if="log.is_mocked === 1">
                      <div class="avatar" v-if="log.on_ground === 0">
                        <img src="../../../assets/img/fraud2.png" class="h-auto" />
                      </div>
                    </template>
                    <template v-else>
                      <template v-if="log.on_ground === 1">
                        <div class="avatar">
                          <img src="../../../assets/img/no-connection.png" class="h-auto" />
                        </div>
                      </template>
                      <template v-else>
                        <div class="avatar">
                          <img src="../../../assets/img/sea.png" class="h-auto" />
                        </div>
                      </template>
                    </template>
                  </td>
                  <td>
                    <button class="btn btn-light btn-xs" type="button" id="locationDrirection">
                      <i class="ti ti-rss me-xs"></i>&nbsp; &nbsp; MAP
                    </button>
                  </td>
                  <td>{{ log.created_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalEditKapal',
  props: {
    dockLogs: {
      type: Array,
      default: () => []
    },
    locationLogs: {
      type: Array,
      default: () => []
    }
  },

  methods: {}
}
</script>

<style>
.head-history {
  color: white;
  text-align: center;
}

.card-body-filter {
  max-height: 700px;
  overflow-y: auto;
}

.card-body-filter::-webkit-scrollbar {
  width: 10px;
}

.card-body-filter::-webkit-scrollbar {
  background: rgba(0, 132, 255, 0.204);
}

.card-body-filter::-webkit-scrollbar-thumb {
  background-color: rgb(63, 124, 162);
  border-radius: 20px;
}
</style>
