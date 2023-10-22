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

            <!-- <form id="formAuthentication" class="mb-3" action="http://103.139.192.254:9016/api/v1/user/login" method="POST"> -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="emailLogin"
                name="email-username"
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
              <button @click="login" class="btn btn-primary d-grid w-100" type="submit">
                Sign in
              </button>
            </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LoginModal',
  setup() {
    const router = useRouter()
    const login = () => {
      localStorage.setItem('authenticated', true);
      router.push({ name: 'home' })
    }

    return { login }
  }
}
</script>