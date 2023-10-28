<template>
  <div
    class="modal fade"
    id="modalToggle"
    aria-labelledby="modalToggleLabel"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="card">
          <div class="card-body">
            <!-- Logo -->
            <div class="app-brand justify-content-center mb-4 mt-2">
              <span
                class="app-brand-text demo menu-text fw-bold"
                style="margin-left: -15px !important"
                >LOGIN</span
              >
            </div>
            <!-- /Logo -->

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="email"
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
                  >
                    <small>Forgot Password?</small>
                  </a>
                </div>
                <div class="input-group input-group-merge">
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    class="form-control"
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
                  />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
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

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('api/v1/user/login', {
          email: this.email,
          password: this.password
        })
        
        localStorage.setItem('token', response.data.data.token_jwt)
        this.$router.push({ name: 'home' })
        localStorage.setItem('authenticated', true)

        console.log(localStorage.getItem('token'))

      } catch (error) {
        if(error.response.status === 400){
          console.log(error.response.data.meta.code)
          console.log(error.response.data.meta.message)

        } else if(error.response.status === 422) {
          console.log(error.response.data.meta.code)
          console.log(error.response.data.meta.message)

          if(this.email === null){
            console.log(error.response.data.data.errors[0])
          }else if(this.password === null) {
            console.log(error.response.data.data.errors[1])
          }else {
            console.log(error.response.data.data.errors[0])
            console.log(error.response.data.data.errors[1])
          }
        }
      }
    }
  }
}
</script>
