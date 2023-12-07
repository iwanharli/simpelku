<template>
  <div class="containerPage2 bg-secondary" style="padding-top: 40px !important">
    <div class="card">
      <b-card-header class="bg-primary text-light pb-4">
        <div class="header-title">
          <b-row>
            <b-col xl="9" lg="9" md="9" sm="9">
              <h4 style="font-weight: bold; color: white">SETTING APLIKASI</h4>
            </b-col>
          </b-row>
        </div>
      </b-card-header>
      <div class="card-body p-5">
        <div class="row">
          <div class="col-md-6 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">KODE PELABUHAN</label>
            <input type="text" class="form-control" v-model="harbourCode" required="" />
          </div>
          <div class="col-md-6 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">NAMA PELABUHAN</label>
            <input type="text" class="form-control" v-model="harbourName" required="" />
          </div>
          <div class="col-md-12 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">MODE</label>
            <select class="form-select" v-model="appMode" required="">
              <option value="interval">Interval</option>
              <option value="jarak">Jarak</option>
            </select>
          </div>
          <div class="col-md-6 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">INTERVAL</label>
            <div class="form-floating">
              <input type="number" class="form-control" id="floatingInput" placeholder="30" v-model="appInterval" required="" />
              <label for="floatingInput" style="font-weight: 900">Interval dalam (detik)</label>
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">JARAK</label>
            <div class="form-floating">
              <input type="number" class="form-control" id="floatingInput" placeholder="30" v-model="appRange" required="" />
              <label for="floatingInput" style="font-weight: 900">Jarak dalam (meter)</label>
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">VERSI MINIMAL APK</label>
            <input type="text" class="form-control" v-model="appVersion" required="" />
          </div>
          <div class="col-md-6 mb-4">
            <label class="form-label text-dark" style="font-weight: bolder">URL UNDUH APK</label>
            <input type="text" class="form-control" v-model="appUrl" required="" />
          </div>
          <div class="col-md-8">
            <button class="btn btn-info" type="submit" style="width: 100%" @click="updateMobileSetting">SIMPAN PERUBAHAN</button>
          </div>
          <div class="col-md-4">
            <button class="btn btn-warning" type="submit" style="width: 100%" @click="resetSetting">RESET</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
  data() {
    return {
      harbourCode: "",
      harbourName: "",
      appMode: "",
      appInterval: "",
      appRange: "",
      appVersion: "",
      appUrl: "",
      appGeofence: []
    }
  },

  mounted() {
    this.getSettingApp()
  },

  methods: {
    async getSettingApp() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      await axios
        .get("api/v1/setting/web", config)
        .then((res) => {
          const appSetting = res.data.data

          this.harbourCode = appSetting.harbour_code
          this.harbourName = appSetting.harbour_name
          this.appMode = appSetting.mode
          this.appInterval = appSetting.interval
          this.appRange = appSetting.range
          this.appVersion = appSetting.apk_min_version
          this.appUrl = appSetting.apk_min_download

          this.appGeofence = appSetting.geofences

          console.log("💚 SETTING FETCHED", appSetting)
        })
        .catch((error) => {
          console.log("💥 GET SETTING FAILED")

          setTimeout(this.getSettingApp, 1000)
        })
    },

    async updateMobileSetting() {
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      const updatedData = {
        harbour_code: parseInt(this.harbourCode),
        harbour_name: this.harbourName,
        mode: this.appMode,
        apk_min_version: this.appVersion,
        interval: parseInt(this.appInterval),
        range: parseInt(this.appRange),
        apk_download_link: this.appUrl,
        geofence: []
      }

      await axios
        .post("api/v1/setting/create-or-update", updatedData, config)
        .then((response) => {
          Swal.fire({
            title: "Terimakasih!",
            text: "Setting telah berhasil diupdate 😊",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })

          this.getSettingApp()
          console.log("🚀 UPDATE SUCCESS", response)
        })
        .catch((error) => {
          console.error("💥 UPDATE FAILED:", error)
        })
    },

    async resetSetting() {
      // INITIAL
      this.harbourCode = 919191
      this.harbourName = "PELABUHAN TEGALSARI"
      this.appMode = "interval"
      this.appInterval = 30
      this.appRange = 2
      this.appVersion = "2.5.0"
      this.appUrl = "https://demo.t-hisyam.net/apk/simpel/app-release.apk"
      const coordinate = []

      // UPDATING
      const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }

      const updatedData = {
        harbour_code: parseInt(this.harbourCode),
        harbour_name: this.harbourName,
        mode: this.appMode,
        apk_min_version: this.appVersion,
        interval: parseInt(this.appInterval),
        range: parseInt(this.appRange),
        apk_download_link: this.appUrl,
        geofence: coordinate
      }

      //   console.log(updatedData)

      await axios
        .post("api/v1/setting/create-or-update", updatedData, config)
        .then((response) => {
          Swal.fire({
            title: "Terimakasih!",
            text: "Setting telah berhasil direset 😊",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })

          this.getSettingApp()
          console.log("🚀 RESET SUCCESS", response)
        })
        .catch((error) => {
          console.error("💥 RESET FAILED:", error)
        })

      console.log("FORM HAS BEEN RESET")
    }
  }
}
</script>
