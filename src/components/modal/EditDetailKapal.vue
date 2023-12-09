<template>
  <div class="modal fade" id="modalEditDetailKapal" aria-labelledby="modalToggleLabel" tabindex="-1" style="display: none">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white" style="font-weight: bold">EDIT DETAIL KAPAL</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateShipDetail">
            <div class="modal-body">
              <div class="row">
                <div class="col mb-3">
                  <label for="shipName" class="form-label">Nama Kapal</label>
                  <input type="text" id="shipName" class="form-control" v-model="ship.ship_name" disabled />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label class="form-label">Penanggung Jawab</label>
                  <input type="text" id="nameWithTitle" class="form-control" v-model="ship.responsible_name" disabled />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label class="form-label">Pelabuhan Pangkalan</label>
                  <input type="text" id="nameWithTitle" class="form-control" v-model="shipHarbour" />
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
                    <input type="text" id="nameWithTitle" class="form-control" v-model="shipWidth" />
                    <div class="input-group-prepend">
                      <span class="input-group-text">x</span>
                    </div>
                    <input type="text" id="nameWithTitle" class="form-control" v-model="shipLength" />
                  </div>
                </div>
              </div>
              <div class="row g-2">
                <div class="col mb-0">
                  <div class="mb-3">
                    <label for="nameWithTitle" class="form-label">Nomor SIUP</label>
                    <input type="text" id="nameWithTitle" class="form-control" v-model="shipSiup" />
                  </div>
                </div>
                <div class="col mb-0">
                  <div class="mb-3">
                    <label for="nameWithTitle" class="form-label">Nomor BKP</label>
                    <input type="text" id="nameWithTitle" class="form-control" v-model="shipBkp" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="nameWithTitle" class="form-label">Tanda Selar</label>
                  <input type="text" id="nameWithTitle" class="form-control" v-model="shipSelarMark" />
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <button class="btn btn-primary d-grid w-100" type="submit">Simpan Perubahan</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
  name: "ModalEditKapal",

  data() {
    return {
      ship: {},

      shipId: "",
      shipType: "",
      shipDimension: "",
      shipHarbour: "",
      shipSiup: "",
      shipBkp: "",
      shipSelarMark: "",
      shipWidth: "",
      shipLength: ""
    }
  },

  computed: {
    mergedDimensions() {
      const widthWithoutSpaces = this.shipWidth.replace(/\s/g, "")
      const lengthWithoutSpaces = this.shipLength.replace(/\s/g, "")

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
            Authorization: "Bearer " + localStorage.getItem("token")
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
          console.error(error)
        })
    },

    updateShipDetail() {
      const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
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
        .put("api/v1/ship/update-detail", updatedData, config)
        .then((response) => {
          console.log("✅ UPDATED SUCCESS", updatedData)

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer
              toast.onmouseleave = Swal.resumeTimer
            }
          })
          Toast.fire({
            icon: "success",
            title: "Berhasil Update Data"
          })

          setTimeout(() => {
            const currentScrollPosition = window.scrollY

            location.reload()
            window.scrollTo(0, currentScrollPosition)
          }, 1000)
        })
        .catch((error) => {
          console.error("❌ FAILED UPDATE:", error)
        })
    },

    // STYLING
    formatShipStatus(status) {
      if (status) {
        return status.toUpperCase()
      } else {
        return ""
      }
    }
  }
}
</script>
