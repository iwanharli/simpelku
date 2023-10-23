<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col">
        <div class="card mb-3">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item">
                <button
                  class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#form-tabs-mobile-user"
                  role="tab"
                  aria-selected="true"
                >
                  Mobile User
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#form-tabs-account"
                  role="tab"
                  aria-selected="false"
                >
                  Other
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content">
            <!-- Personal Info -->
            <div class="tab-pane fade active show" id="form-tabs-mobile-user" role="tabpanel">
              <form>
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-first-name"
                        >Interval</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-first-name"
                          class="form-control"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-last-name"
                        >Jarak</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-last-name"
                          class="form-control"
                          placeholder="300"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-country"
                        >Metode API</label
                      >
                      <div class="col-sm-9">
                        <select
                          id="formtabs-country"
                          class="select2 form-select"
                          data-allow-clear="true"
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-birthdate"
                        >Versi Minimal APK</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-birthdate"
                          class="form-control dob-picker"
                          placeholder="10.0.0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <div class="row justify-content-end">
                      <div class="col-sm-9">
                        <button class="btn btn-info me-sm-3 me-1">APK DOWNLOAD LINK</button>
                        <button class="btn btn-warning me-sm-3 me-1">RESET</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!-- Account Details -->
            <div class="tab-pane fade" id="form-tabs-account" role="tabpanel">
              <form>
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-username"
                        >Username</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-username"
                          class="form-control"
                          placeholder="john.doe"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-email"
                        >Email</label
                      >
                      <div class="col-sm-9">
                        <div class="input-group input-group-merge">
                          <input
                            type="text"
                            id="formtabs-email"
                            class="form-control"
                            placeholder="john.doe"
                            aria-label="john.doe"
                            aria-describedby="formtabs-email2"
                          />
                          <span class="input-group-text" id="formtabs-email2">@example.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row form-password-toggle">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-password"
                        >Password</label
                      >
                      <div class="col-sm-9">
                        <div class="input-group input-group-merge">
                          <input
                            type="password"
                            id="formtabs-password"
                            class="form-control"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="formtabs-password2"
                          />
                          <span class="input-group-text cursor-pointer" id="formtabs-password2"
                            ><i class="ti ti-eye-off"></i
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row form-password-toggle">
                      <label
                        class="col-sm-3 col-form-label text-sm-end"
                        for="formtabs-confirm-password"
                        >Confirm</label
                      >
                      <div class="col-sm-9">
                        <div class="input-group input-group-merge">
                          <input
                            type="password"
                            id="formtabs-confirm-password"
                            class="form-control"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="formtabs-confirm-password2"
                          />
                          <span
                            class="input-group-text cursor-pointer"
                            id="formtabs-confirm-password2"
                            ><i class="ti ti-eye-off"></i
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <div class="row justify-content-end">
                      <div class="col-sm-9">
                        <button type="submit" class="btn btn-primary me-sm-3 me-1">Submit</button>
                        <button type="reset" class="btn btn-label-secondary">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <!-- Social Links -->
            <div class="tab-pane fade" id="form-tabs-social" role="tabpanel">
              <form>
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-twitter"
                        >Twitter</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-twitter"
                          class="form-control"
                          placeholder="https://twitter.com/abc"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-facebook"
                        >Facebook</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-facebook"
                          class="form-control"
                          placeholder="https://facebook.com/abc"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-google"
                        >Google+</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-google"
                          class="form-control"
                          placeholder="https://plus.google.com/abc"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-linkedin"
                        >Linkedin</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-linkedin"
                          class="form-control"
                          placeholder="https://linkedin.com/abc"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-instagram"
                        >Instagram</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-instagram"
                          class="form-control"
                          placeholder="https://instagram.com/abc"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <label class="col-sm-3 col-form-label text-sm-end" for="formtabs-quora"
                        >Quora</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          id="formtabs-quora"
                          class="form-control"
                          placeholder="https://quora.com/abc"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <div class="row justify-content-end">
                      <div class="col-sm-9">
                        <button type="submit" class="btn btn-primary me-sm-3 me-1">Submit</button>
                        <button type="reset" class="btn btn-label-secondary">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <WaveComponent/>
</template>

<script>
import WaveComponent from '../components/WaveItem.vue'

export default {
  components: {
    WaveComponent
  }
}
</script>

