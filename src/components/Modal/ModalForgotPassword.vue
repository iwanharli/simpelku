<template>
  <div
    class="modal fade"
    id="modalToggle2"
    aria-hidden="true"
    aria-labelledby="modalToggleLabel2"
    tabindex="-1"
    style="display: none; background-color: rgba(0, 109, 164, 0.23)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Forgot Password -->
        <div class="card">
          <div class="card-body">
            <h4 class="mb-1 pt-2">Lupa Password? 🔒</h4>
            <p class="mb-4">
              Masukkan email Anda dan Kami akan mengirimkan instruksi untuk mereset password Anda.
            </p>
            <form
              id="formAuthentication"
              class="mb-3"
              action="auth-reset-password-basic.html"
              method="POST"
            >
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  placeholder="Masukkan Email"
                  autofocus
                />
              </div>
              <button class="btn btn-primary d-grid w-100">Kirim Reset Link</button>
            </form>
            <div class="text-center">
              <a
                href="auth-login-basic.html"
                class="d-flex align-items-center justify-content-center"
                data-bs-target="#modalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                <i class="ti ti-chevron-left scaleX-n1-rtl"></i>
                Kembali ke login
              </a>
            </div>
          </div>
        </div>
        <!-- /Forgot Password -->
      </div>
    </div>
  </div>
</template>
