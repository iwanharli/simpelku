<template>
  <div
    class="modal fade"
    id="modalToggle"
    aria-labelledby="modalToggleLabel"
    tabindex="-1"
    style="display: none; background-color: rgba(0, 109, 164, 0.23)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="card">
          <div class="card-body">
            <div class="app-brand justify-content-center mb-4 mt-2">
              <span
                class="app-brand-text demo menu-text fw-bold"
                style="margin-left: -15px !important"
                >LOGIN</span
              >
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="userData.email"
                  type="text"
                  class="form-control"
                  id="emailLogin"
                  name="email"
                  placeholder="Masukkan email Anda"
                  autofocus
                />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Password</label>
                  <a
                    href="#"
                    data-bs-target="#modalToggle2"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    tabindex="-1"
                  >
                    <small>Lupa Password?</small>
                  </a>
                </div>
                <div class="input-group input-group-merge">
                  <input
                    v-model="userData.password"
                    type="password"
                    id="password"
                    class="form-control"
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
                  />
                  <span class="input-group-text cursor-pointer">
                    <!-- <i class="ti ti-eye-off"></i> -->
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
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
import Swal from 'sweetalert2'

export default {
  name: 'LoginPage',
  data() {
    return {
      userData: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async handleSubmit() {
      this.showLoader = true
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
        loader: 'bars',
        color: '#000000',
        backgroundColor: '#aad3dfa8'
      })

      setTimeout(() => {
        loader.hide()
      }, 1000)

      await axios
        .post('api/v1/user/login', this.userData)
        .then((response) => {
          console.log(response)
          console.clear('')
          console.log('Login successful!')

          console.log('⚙ \t', response.status)
          console.log('🚀 \t', response.data.data.token_jwt)
          console.log('👽 \t', response.data.data.data_user.name)
          console.log('✨ \t', response.data.data.data_user.email)

          localStorage.setItem('authenticated', true)
          localStorage.setItem('token', response.data.data.token_jwt)
          localStorage.setItem('name', response.data.data.data_user.name)
          localStorage.setItem('email', response.data.data.data_user.email)

          this.$router.push({ name: 'home' })

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer
              toast.onmouseleave = Swal.resumeTimer
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
        .catch((error) => {
          console.error('Failed to login:', error)
        })
    }
  }
}
</script>
