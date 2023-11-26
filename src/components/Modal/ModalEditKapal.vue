<template>
  <div
    class="modal fade"
    id="modalEditDetailKapal"
    aria-labelledby="modalToggleLabel"
    tabindex="-1"
    style="display: none; background-color: rgba(0, 109, 164, 0.23);"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="card">
          <div class="card-body">
            <div class="app-brand justify-content-center mb-4 mt-2">
              <span
                class="app-brand-text demo menu-text fw-bold"
                style="margin-left: -15px !important"
                >EDIT DETAIL KAPAL</span
              >
            </div>

            <form @submit.prevent="updateShipDetail">
              <div class="modal-body">
                <div class="row">
                  <div class="col mb-3">
                    <label for="shipName" class="form-label">Nama Kapal</label>
                    <input
                      type="text"
                      id="shipName"
                      class="form-control"
                      v-model="ship.ship_name"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="nameWithTitle" class="form-label">Penanggung Jawab</label>
                    <input
                      type="text"
                      id="nameWithTitle"
                      class="form-control"
                      v-model="ship.responsible_name"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="nameWithTitle" class="form-label">Pelabuhan Pangkalan</label>
                    <input
                      type="text"
                      id="nameWithTitle"
                      class="form-control"
                      v-model="shipHarbour"
                    />
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-0">
                    <div class="mb-3">
                      <label for="defaultSelect" class="form-label">Jenis Kapal</label>
                      <select id="defaultSelect" class="form-select" v-model="shipType">
                        <option :value="shipType" style="display: none" selected>
                          {{ formatShipStatus(shipType) }}
                        </option>
                        <option value="kapal angkut">KAPAL ANGKUT</option>
                        <option value="kapal tangkap">KAPAL TANGKAP</option>
                      </select>
                    </div>
                  </div>
                  <div class="col mb-0">
                    <label for="defaultSelect" class="form-label">Dimensi Kapal (P x L)</label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        id="nameWithTitle"
                        class="form-control"
                        v-model="shipWidth"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">x</span>
                      </div>
                      <input
                        type="text"
                        id="nameWithTitle"
                        class="form-control"
                        v-model="shipLength"
                      />
                    </div>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-0">
                    <div class="mb-3">
                      <label for="nameWithTitle" class="form-label">Nomor SIUP</label>
                      <input
                        type="text"
                        id="nameWithTitle"
                        class="form-control"
                        v-model="shipSiup"
                      />
                    </div>
                  </div>
                  <div class="col mb-0">
                    <div class="mb-3">
                      <label for="nameWithTitle" class="form-label">Nomor BKP</label>
                      <input
                        type="text"
                        id="nameWithTitle"
                        class="form-control"
                        v-model="shipBkp"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="nameWithTitle" class="form-label">Tanda Selar</label>
                    <input
                      type="text"
                      id="nameWithTitle"
                      class="form-control"
                      v-model="shipSelarMark"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ModalEditKapal',

  data() {
    return {
      ship: {},

      shipId: '',
      shipType: '',
      shipDimension: '',
      shipHarbour: '',
      shipSiup: '',
      shipBkp: '',
      shipSelarMark: '',
      shipWidth: '',
      shipLength: ''
    }
  },

  computed: {
    mergedDimensions() {
      const widthWithoutSpaces = this.shipWidth.replace(/\s/g, '')
      const lengthWithoutSpaces = this.shipLength.replace(/\s/g, '')

      return `${widthWithoutSpaces} X ${lengthWithoutSpaces}`
    }
  },

  mounted() {
    this.shipId = this.$route.params.shipId

    this.getShipDetail(this.shipId)
  },

  methods: {
    getShipDetail(shipId) {
      axios
        .get(`/api/v1/ship/detail/${shipId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.ship = res.data.data
          this.shipBio = this.ship.detail

          this.shipType = this.shipBio.type
          this.shipDimension = this.shipBio.dimension
          this.shipHarbour = this.shipBio.harbour
          this.shipSiup = this.shipBio.siup
          this.shipBkp = this.shipBio.bkp
          this.shipSelarMark = this.shipBio.selar_mark

          // Split dimension
          const dimensionParts = this.shipDimension.split(/\s*X\s*/)

          if (dimensionParts.length === 2) {
            this.shipWidth = dimensionParts[0].trim()
            this.shipLength = dimensionParts[1].trim()
          } else {
            return
          }
        })
        .catch((error) => {
          console.error(error.response.data.meta.message)
        })
    },

    updateShipDetail() {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const updatedData = {
        ship_id: parseInt(this.shipId),
        type: this.shipType,
        dimension: this.mergedDimensions,
        harbour: this.shipHarbour,
        siup: this.shipSiup,
        bkp: this.shipBkp,
        selar_mark: this.shipSelarMark
      }

      console.log(updatedData, config)

      axios
        .put('api/v1/ship/update-detail', updatedData, config)
        .then((response) => {
          console.log('Data updated successfully', updatedData)

          $('#modalEditDetailKapal').modal('hide')

          const currentScrollPosition = window.scrollY
          
          location.reload()
          window.scrollTo(0, currentScrollPosition)
        })
        .catch((error) => {
          console.error('Error updating data:', error)
        })
    },

    // STYLING
    formatShipStatus(status) {
      if (status) {
        return status.toUpperCase()
      } else {
        return ''
      }
    }
  }
}
</script>
