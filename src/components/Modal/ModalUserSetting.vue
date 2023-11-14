<template>
  <div
    class="modal fade"
    id="modalChangePwd"
    aria-labelledby="modalToggleLabel"
    tabindex="-1"
    style="display: none; background-color: rgba(0, 109, 164, 0.23)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <div class="app-brand justify-content-center mb-4 mt-2">
              <span
                class="app-brand-text demo menu-text fw-bold"
                style="margin-left: -15px !important"
                >Pengaturan Keamanan</span
              >
            </div>
            <!-- /Header -->

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Nama Anda</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  :placeholder="profile.name"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Email Anda</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  :placeholder="profile.email"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password Baru</label>
                <input
                  v-model="pwd1"
                  type="text"
                  class="form-control"
                  id="pwd"
                  name="pwd"
                  autofocus
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="password">Konfirmasi Password</label>
                <input
                  v-model="pwd2"
                  type="text"
                  id="pwdConfirmation"
                  class="form-control"
                  name="pwdConfirmation"
                />
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit" data-dismiss="modal">
                  Simpan
                </button>
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
  name: 'ModalUserSetting',

  data() {
    return {
      profile: {},
      pwd1: '',
      pwd2: '',
      password: '',
      password_confirmation: ''
    }
  },

  methods: {
    async getProfile() {
      axios
        .get('api/v1/user/get-profile', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          this.profile = res.data.data
        })
        .catch((error) => {
          return
        })
    },

    async handleSubmit() {
      await axios
        .post(
          'api/v1/user/change-password',
          {
            password: this.pwd1,
            password_confirmation: this.pwd2
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          console.log(response.data.meta.message)
          $('#modalChangePwd').modal('hide')
        })
        .catch((error) => {
          console.log(error.response.data.meta.message)
        })
    }
  },

  mounted() {
    this.getProfile()
  }
}
</script>
