<template>
  <section class="login-content">
    <b-row class="m-0 align-items-center bg-white h-100">
      <b-col md="6">
        <b-row class="justify-content-center">
          <b-col md="10">
            <b-card class="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form">
              <div class="navbar-brand d-flex align-items-center mb-5 text-primary">
                <brand-logo></brand-logo>
                <h4 class="logo-title ms-3 mb-0" data-setting="app_name">SIMPEL</h4>
              </div>
              <h2 class="mb-2 text-center">MASUK</h2>
              <p class="text-center">Login to stay connected.</p>

              <form @submit.prevent="submitLogin">
                <div class="row mb-4">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="email" class="form-label">Email</label>
                      <input v-model="userData.email" type="email" class="form-control" id="email" aria-describedby="email" placeholder=" " />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="password" class="form-label">Password</label>
                      <input v-model="userData.password" type="password" class="form-control" id="password" aria-describedby="password" placeholder=" " />
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center mt-5">
                  <button type="submit" class="btn btn-primary">Sign In</button>
                </div>
                <!-- <p class="mt-3 text-center"><a href="/register" class="text-underline">Klik disini untuk mendaftar.</a></p> -->
              </form>
            </b-card>
          </b-col>
        </b-row>
        <div class="sign-bg">
          <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05">
              <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
              <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
              <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
              <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
            </g>
          </svg>
        </div>
      </b-col>
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/images/auth/01.png" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
    </b-row>
  </section>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
  name: "LoginPage",
  data() {
    return {
      userData: {
        email: "",
        password: ""
      }
    }
  },

  methods: {
    async submitLogin() {
      console.log(this.userData)

      try {
        const response = await axios.post("/api/v1/user/login", {
          email: this.userData.email,
          password: this.userData.password
        })

        // console.log(response)
        console.clear('')
        console.log("Login successful!")
        console.log("⚙ \t", response.status)
        console.log("🚀 \t", response.data.data.token_jwt)
        console.log("⌚ \t", response.data.data.expired_at)
        console.log("🐣 \t", response.data.data.data_user.id)
        console.log("👽 \t", response.data.data.data_user.name)
        console.log("📧 \t", response.data.data.data_user.email)

        localStorage.setItem("token", response.data.data.token_jwt)
        localStorage.setItem("uid", response.data.data.data_user.id)
        localStorage.setItem("uname", response.data.data.data_user.name)
        localStorage.setItem("uemail", response.data.data.data_user.email)
        localStorage.setItem("authenticated", true)

        this.$router.push({ name: "admin.dashboard" })

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        })
      } catch (error) {
        localStorage.setItem("authenticated", false)
        console.error("Login failed:", error.message)

        Swal.fire({
          title: "Error!",
          text: "Email / Password anda salah!",
          icon: "error",
          confirmButtonText: "😪 COBA LAGI"
        })

        this.userData.email = '',
        this.userData.password = ''
      }
    }
  }
}
</script>
