<template>
  <div class="containerPage bg-primary p-5" style="padding-top: 40px !important">
    <div>
      <!-- <b-row data-aos="fade-up" data-aos-delay="100">
        <b-col class="col-lg-3 col-md-6">
          <b-card class="bg-primary">
            <div class="d-flex justify-content-between align-items-center">
              <div class="bg-white rounded p-3">
                <i class="ti ti-ship" width="24" height="24" style="font-size: 20px"></i>
              </div>
              <div class="text-end text-white">
                <h2 style="color: white">
                  <Vue3autocounter ref="counter" :startAmount="0" :endAmount="4500" />
                </h2>
                TOTAL KAPAL
              </div>
            </div>
          </b-card>
        </b-col>

        <b-col class="col-lg-3 col-md-6">
          <b-card class="bg-info">
            <div class="d-flex justify-content-between align-items-center">
              <div class="bg-white rounded p-3">
                <i class="ti ti-ship" width="24" height="24" style="font-size: 20px"></i>
              </div>
              <div class="text-end text-white">
                <h2 style="color: white"><Vue3autocounter ref="counter" :startAmount="0" :endAmount="5600" /></h2>
                CHECK IN
              </div>
            </div>
          </b-card>
        </b-col>

        <b-col class="col-lg-3 col-md-6">
          <b-card class="bg-warning">
            <div class="d-flex justify-content-between align-items-center">
              <div class="bg-white rounded p-3">
                <i class="ti ti-ship" width="24" height="24" style="font-size: 20px"></i>
              </div>
              <div class="text-end text-white">
                <h2 style="color: white"><Vue3autocounter ref="counter" :startAmount="0" :endAmount="5600" /></h2>
                CHECK OUT
              </div>
            </div>
          </b-card>
        </b-col>

        <b-col class="col-lg-3 col-md-6">
          <b-card class="card" style="background: #c74f7c">
            <div class="d-flex justify-content-between align-items-center">
              <div class="bg-white rounded p-3">
                <i class="ti ti-ship" width="24" height="24" style="font-size: 20px"></i>
              </div>
              <div class="text-end text-white">
                <h2 style="color: white"><Vue3autocounter ref="counter" :startAmount="0" :endAmount="5600" /></h2>
                OUT OF SCOPE
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row> -->

      <!-- <hr /> -->
      <!-- ISI  -->
      <b-row>
        <b-col xl="12" lg="12" md="12" sm="12" class="bg-soft-light mb-3 p-4" style="border-radius: 20px; border: 2px solid white" data-aos="fade-down" data-aos-delay="110">
          <div class="header-title">
            <b-row>
              <b-col xl="9" lg="8" md="7" sm="7">
                <h4 style="font-weight: bold; color: white">KAPAL TERDAFTAR</h4>
              </b-col>
              <b-col xl="3" lg="4" md="5" sm="5" class="d-flex justify-content-end custom-export">
                <button style="display: inline-block" class="btn btn-warning" type="button" id="kapal_detail" @click="downloadCSV"><i class="ti ti-external-link me-sm-1"></i> EXPORT CSV</button>
              </b-col>
              <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                <input type="text" class="form-control border-0" placeholder="Pencarian (Kapal / Penanggung Jawab / Device ID / Terdaftar)" v-model="searchQuery" />
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col xl="1" lg="1" md="2" sm="2" class="button-prev-next-lg text-end" data-aos="fade-left" data-aos-delay="110">
          <a href="#" @click="previousShip">
            <img src="@/assets/images/previous.png" class="previous" style="width: 60px; height: 60px" />
          </a>
        </b-col>

        <div class="button-prev-next-sm">
          <b-col col="12" class="d-flex align-items-center justify-content-center mt-4 mb-3">
            <b-row class="d-flex">
              <b-col class="text-center">
                <a href="#" @click="previousShip">
                  <img src="@/assets/images/previous.png" class="previous" style="width: 50px; height: 50px" />
                </a>
              </b-col>

              <b-col class="text-center">
                <a href="#" @click="nextShips">
                  <img src="@/assets/images/next.png" class="next" style="width: 50px; height: 50px" />
                </a>
              </b-col>
            </b-row>
          </b-col>
        </div>

        <b-col xl="10" lg="10" md="12" sm="12" style="padding: 0px 25px 25px 25px" :style="{ animation: 'fadeUp 1s ease ' }">
          <b-card no-body class="text-white fade-up mb-2 custom-ship" v-for="(item, index) in filteredShip" :key="item.id">
            <RouterLink :to="{ name: 'admin.shipDetail', params: { shipId: item.id } }">
              <b-card-body style="padding: 5px 5px 5px 5px">
                <b-row style="padding: 15px">
                  <b-col xl="1" lg="1" md="2" sm="2" class="d-flex align-items-center justify-content-center">
                    <div class="bg-soft-secondary rounded p-3 custom-index">
                      <h5 class="text-dark" style="font-weight: bolder;">{{ adjustedIndex(index) }}</h5>
                    </div>
                  </b-col>

                  <b-col xl="3" lg="11" md="10" sm="12" class="d-flex flex-column justify-content-center custom-ship">
                    <h5 style="font-weight: bold; text-transform: uppercase; font-family: poppins">{{ item.ship_name }}</h5>
                    <div style="text-transform: uppercase">
                      <span class="badge bg-primary p-2 custom-label" v-if="item.status === 'checkin'">{{ item.status }}</span>
                      <span class="badge bg-info p-2 custom-label" v-else-if="item.status === 'checkout'">{{ item.status }}</span>
                      <span class="badge bg-warning p-2 custom-label" v-else-if="item.status === 'out of scope'">{{ item.status }}</span>
                    </div>
                  </b-col>

                  <b-col xl="1" lg="2" md="4" sm="12" class="d-flex align-items-center justify-content-center custom-ground" style="position: relative">
                    <div class="circle" style="width: 50px; height: 50px" v-if="item.on_ground === 0">
                      <div class="wave"></div>
                    </div>
                    <div class="circle-walking" style="width: 50px; height: 50px" v-else>
                      <img src="@/assets/images/walk.gif" style="width: 40px; height: 40px" />
                    </div>
                  </b-col>

                  <b-col xl="4" lg="7" md="8" sm="12" class="d-flex flex-column justify-content-center custom-responsible">
                    <h6 style="font-weight: bold; text-transform: uppercase">👲{{ item.responsible_name }}</h6>
                    <small class="text-black" style="margin-left: 0.1%; word-break: break-all">📱 {{ item.device_id }}</small>
                  </b-col>

                  <b-col xl="2" lg="3" md="12" sm="12" class="d-flex align-items-center justify-content-center custom-date">
                    <small class="text-black">📆 {{ item.created_at }}</small>
                  </b-col>

                  <b-col xl="1" lg="12" md="12" sm="12" class="custom-detail">
                    <RouterLink class="btn btn-md btn-primary rounded custom-btn d-flex align-items-center justify-content-center" type="button" :to="{ name: 'admin.shipDetail', params: { shipId: item.id } }">
                      <i class="ti ti-zoom-scan" style="font-size: 20px"></i>
                    </RouterLink>
                  </b-col>
                </b-row>
              </b-card-body>
            </RouterLink>
          </b-card>

          <b-col xl="12" lg="12" md="12" sm="12" class="d-flex align-items-center justify-content-center mt-3">
            <ul class="pagination">
              <li class="paginate_button" :class="{ active: pageNumber === page }" v-for="pageNumber in totalPages" :key="pageNumber" style="border-radius: 20px; padding: 10px">
                <a href="#" class="page-link" @click="goToPage(pageNumber)" style="border-radius: 20px">{{ pageNumber }}</a>
              </li>
            </ul>
          </b-col>
        </b-col>

        <b-col xl="1" lg="1" md="2" sm="2" class="button-prev-next-lg" data-aos="fade-right" data-aos-delay="110">
          <a href="#" @click="nextShips">
            <img src="@/assets/images/next.png" class="next" style="width: 60px; height: 60px" />
          </a>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"
import Vue3autocounter from "vue3-autocounter"
import AOS from "aos"
import { onMounted, ref } from "vue"
import { RouterLink } from "vue-router"

export default {
  name: "Ship Page",
  components: {
    Vue3autocounter,
    RouterLink
  },
  setup() {
    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })
  },

  data() {
    return {
      ships: [],
      searchQuery: "",
      page: 1,
      maxPage: 0,
      pageSize: 10,
      hasPreviousPage: false,
      hasNextPage: false
    }
  },
  computed: {
    filteredShip() {
      const query = this.searchQuery.toLowerCase()

      const startIndex = (this.page - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      return this.ships
        .filter((item) => {
          if (item.ship_name) {
            if (item.ship_name.toLowerCase().includes(query) || item.responsible_name.toLowerCase().includes(query) || item.device_id.toLowerCase().includes(query) || item.created_at.toLowerCase().includes(query) || item.status.toLowerCase().includes(query)) {
              return { ...item }
            }
          }

          return null
        })
        .slice(startIndex, endIndex)
        .filter((ship) => ship !== null)
    },

    totalPages() {
      return Math.ceil(this.ships.length / this.pageSize)
    }
  },

  mounted() {
    this.fetchShip()
  },

  methods: {
    async fetchShip() {
      try {
        const config = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        const params = { page: this.page }

        const response = await axios.get("/api/v1/ship/list", { ...config, params })

        this.ships = response.data.data.map((ship) => {
          const datetimeString = ship.created_at
          const parts = datetimeString.split(" ")
          ship.created_at = parts[0]

          return ship
        })

        this.maxPage = Math.ceil(this.ships.length / this.pageSize)

        this.hasPreviousPage = this.page > 1
        this.hasNextPage = response.data.data.length === this.pageSize

        console.clear()
        console.log("💚 SHIP FETCHED", this.ships)
      } catch (error) {
        console.error("💥 SHIP ERROR :", error)
      }
    },
    adjustedIndex(index) {
      const startIndex = (this.page - 1) * this.pageSize
      return startIndex + index + 1
    },

    goToPage(pageNumber) {
      this.page = pageNumber
      this.fetchShip()
    },
    nextShips() {
      console.log("Next Clicked - Before: page =", this.page)
      this.page++

      if (this.page > this.maxPage) {
        this.page = this.maxPage
      }
      console.log("Next Clicked - After: page =", this.page)
      this.fetchShip()
    },
    previousShip() {
      console.log("Previous Clicked - Before: page =", this.page)
      if (this.page > 1) {
        this.page--
      }
      console.log("Previous Clicked - After: page =", this.page)
      this.fetchShip()
    },

    downloadCSV() {
      if (this.ships.length === 0) {
        console.warn("⚠️ NO APPROVED DATA")
        return
      }

      const header = Object.keys(this.ships[0]).join(",")
      const rows = this.ships.map((ship) => Object.values(ship).join(","))
      const csvContent = `${header}\n${rows.join("\n")}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      const currentDate = new Date()
      const formattedDate = this.formatDate(currentDate)

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `KAPAL_TERDAFTAR_${formattedDate}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        console.error("💥 EXPORT FAILED, BROWSER DOESNT SUPPORT BLOB/DOWNLOAD:")

        const Toast = Swal.mixin({
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "error",
          title: "GAGAL",
          text: "Browser Tidak Support BLOB/Download ! 😊"
        })
      }
    },

    formatDate(date) {
      const options = { day: "numeric", month: "numeric", year: "numeric" }
      return new Date(date).toLocaleDateString("en-GB", options)
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@300;400;500;600;800&display=swap");

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border: 5px solid #70a7ff3d;
  box-shadow: 0 0 0 5px #6d8fff6c;
  border-radius: 50%;
  overflow: hidden;
}
.circle-walking {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 5px solid #a294453d;
  box-shadow: 0 0 0 5px #be96396c;
  border-radius: 50%;
  overflow: hidden;
}
.wave {
  position: relative;
  top: 50;
  width: 100%;
  height: 100%;
  background: #0088ff;
  border-radius: 50%;
  box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.5);
}
.wave:before,
.wave:after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 200%;
  height: 200%;
  background: black;
  transform: translate(-50%, -75%);
}
.wave:before {
  border-radius: 45%;
  background: rgb(120, 167, 255);
  animation: animate 5s linear infinite;
  top: 8px;
}
.wave:after {
  border-radius: 40%;
  background: rgb(219, 240, 255);
  animation: animate 10s linear infinite;
}

.shadow {
  box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.75);
}

img.next:hover {
  animation: nextAnimation 1s infinite;
  border: 5px solid white;
  border-radius: 50px;
}

img.previous:hover {
  animation: previousAnimation 1s infinite;
  border: 5px solid white;
  border-radius: 50px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(150px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes nextAnimation {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes previousAnimation {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes animate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}

.custom-btn {
  width: 100%;
}

.custom-label {
  width: 60%;
}

.custom-index {
  box-shadow: 5px 5px 15px 0px #7070705e;
  -webkit-box-shadow: 8px 8px 15px 0px rgba(135, 135, 135, 0.75);
  -moz-box-shadow: 8px 8px 15px 0px rgba(166, 166, 166, 0.75);
  border: 3px solid white;
}

.button-prev-next-sm {
  display: none;
}

.page-link.active,
.active > .page-link {
  background-color: #4abc96;
}

/* _____________________________________________________________________ */

@media (max-width: 1200px) {
  .custom-label {
    width: 30%;
  }

  .custom-ground {
    margin-top: 30px;
  }

  .circle {
    left: 80%;
  }

  .circle-walking {
    left: 80%;
  }

  .custom-responsible {
    margin-top: 30px;
    padding-left: 50px;
  }

  .custom-date {
    margin-top: 30px;
  }

  .custom-detail {
    margin-top: 30px;
  }

  .custom-btn {
    width: 92%;
    float: right;
  }
}

@media (max-width: 992px) {
  .custom-label {
    width: 50%;
  }

  .circle {
    left: 80%;
  }

  .circle-walking {
    left: 80%;
  }

  .custom-responsible {
    padding-left: 15px;
    padding-right: 15px;
  }

  .custom-btn {
    width: 85%;
    float: right;
  }

  .button-prev-next-lg {
    display: none;
  }

  .button-prev-next-sm {
    display: contents;
  }
}

@media (max-width: 768px) {
  .custom-ship {
    margin-top: 20px;
  }

  .custom-ground {
    margin-top: 50px;
  }

  .circle {
    left: 12%;
  }

  .circle-walking {
    left: 12%;
  }

  .custom-responsible {
    margin-top: 50px;
  }

  .custom-detail {
    margin-top: 20px;
  }

  .custom-btn {
    width: 100%;
    float: center;
  }

  b-card:hover {
    background: red !important;
  }
}

@media (max-width: 575.2px) {
  .custom-export {
    margin-top: 13px;
  }
}
</style>

<!-- <script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
  name: "ShipPage",

  data() {
    return {
      ships: [],
      searchQuery: ""
    }
  },

  computed: {
    filteredShip() {
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
    },

    downloadCSV() {
      if (this.ships.length === 0) {
        console.warn("⚠️ NO APPROVED DATA")
        return
      }

      const header = Object.keys(this.ships[0]).join(",")
      const rows = this.ships.map((ship) => Object.values(ship).join(","))
      const csvContent = `${header}\n${rows.join("\n")}`
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")

      const currentDate = new Date()
      const formattedDate = this.formatDate(currentDate)

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `KAPAL_TERDAFTAR_${formattedDate}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        console.error("💥 EXPORT FAILED, BROWSER DOESNT SUPPORT BLOB/DOWNLOAD:")

        const Toast = Swal.mixin({
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "error",
          title: "GAGAL",
          text: "Browser Tidak Support BLOB/Download ! 😊"
        })
      }
    },

    formatDate(date) {
      const options = { day: "numeric", month: "numeric", year: "numeric" }
      return new Date(date).toLocaleDateString("en-GB", options)
    }
  }
}
</script> -->
