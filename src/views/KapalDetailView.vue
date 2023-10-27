<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Header -->
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div style="height: 600px">
            <l-map ref="map" v-model:zoom="zoom" :center="[-6.846155, 109.128892]">
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>

              <l-polygon
                :lat-lngs="[
                  [-6.84803, 109.127111],
                  [-6.84493, 109.127213],
                  [-6.844399, 109.127412],
                  [-6.843839, 109.127916],
                  [-6.843522, 109.128222],
                  [-6.843405, 109.128479],
                  [-6.843397, 109.128805],
                  [-6.843378, 109.129482],
                  [-6.843815, 109.130108],
                  [-6.844419, 109.130499],
                  [-6.845571, 109.130567],
                  [-6.848934, 109.130598],
                  [-6.849089, 109.130019],
                  [-6.850875, 109.129794],
                  [-6.851462, 109.129584],
                  [-6.851276, 109.127807],
                  [-6.850367, 109.127907],
                  [-6.850528, 109.12923],
                  [-6.849406, 109.129368],
                  [-6.849238, 109.12804],
                  [-6.848195, 109.12814],
                  [-6.848085, 109.127142]
                ]"
                color="#41b782"
                :fill="true"
                :fillOpacity="0.5"
                fillColor="#41b782"
              />
            </l-map>
          </div>
        </div>
      </div>
    </div>
    <!--/ Header -->

    <!-- User Profile Content -->
    <div class="row">
      <div class="col-xl-6 col-lg-5 col-md-5">
        <!-- About User -->
        <div class="card mb-4">
          <div class="card-body">
            <p class="card-text text-uppercase">DETAIL KAPAL</p>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 10%"><i class="ti ti-ship"></i></th>
                  <th style="width: 40%">Nama Kapal</th>
                  <td><span class="badge bg-label-info">HASIL KARIMUN - III</span></td>
                </tr>
                <tr>
                  <th><i class="ti ti-check"></i></th>
                  <th>Status</th>
                  <td><span class="badge bg-label-success">CHECK IN</span></td>
                </tr>
                <tr>
                  <th><i class="ti ti-user"></i></th>
                  <th>Penanggung Jawab</th>
                  <td>Budi Raharjo</td>
                </tr>
                <tr>
                  <th><i class="ti ti-phone-call"></i></th>
                  <th>Nomor Hp</th>
                  <td>(62) 812 4944 2476</td>
                </tr>
                <tr style="background-color: #25293c">
                  <th colspan="3" class="accordion mt-3 accordion" id="accordionStyle1">
                    <button
                      type="button"
                      class="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordionStyle1-1"
                      aria-expanded="false"
                    >
                      <span class="card-text text-uppercase">BIODATA KAPAL</span>
                    </button>
                  </th>
                </tr>
                <tr>
                  <th colspan="3" style="border: 0px">
                    <div
                      id="accordionStyle1-1"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionStyle1"
                    >
                      <div class="accordion-body">
                        <table class="table table-borderless">
                          <tr>
                            <th style="width: 40%">Jenis</th>
                            <td>KAPAL ANGKUT</td>
                          </tr>
                          <tr>
                            <th>Dimensi (m)</th>
                            <td>21,25 x 5,30</td>
                          </tr>
                          <tr>
                            <th>Pelabuhan Pangkalan</th>
                            <td>PP.Barelang, PPP.Tegalsari</td>
                          </tr>
                          <tr>
                            <th>Nomor Siup</th>
                            <td>02.20.01.0140.10332</td>
                          </tr>
                          <tr>
                            <th>Nomor BKP</th>
                            <td>A011044</td>
                          </tr>
                          <tr>
                            <th>TANDA SELAR</th>
                            <td>TB. KARIMUN/GT.30 No.1645/GGe</td>
                          </tr>
                          <tr>
                            <th>Tanggal Terdaftar</th>
                            <td>12/06/2023</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th colspan="3" style="border: 0px">
                    <div class="d-grid gap-2 col-lg-9 mx-auto">
                      <button
                        class="btn btn-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCenter"
                      >
                        Edit Detail Kapal
                      </button>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalCenterTitle">Detail Kapal</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label">Nama Kapal</label>
                                <input
                                  type="text"
                                  id="nameWithTitle"
                                  class="form-control"
                                  placeholder="HASIL KARIMUN - III"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label"
                                  >Penanggung Jawab</label
                                >
                                <input
                                  type="text"
                                  id="nameWithTitle"
                                  class="form-control"
                                  placeholder="Budi Raharjo"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label"
                                  >Pelabuhan Pangkalan</label
                                >
                                <input
                                  type="text"
                                  id="nameWithTitle"
                                  class="form-control"
                                  placeholder="PP.BARELANG, PPP.TEGALSARI"
                                />
                              </div>
                            </div>
                            <div class="row g-2">
                              <div class="col mb-0">
                                <div class="mb-3">
                                  <label for="defaultSelect" class="form-label">Jenis Kapal</label>
                                  <select id="defaultSelect" class="form-select">
                                    <!-- <option>Default select</option> -->
                                    <option value="1">Kapal Angkut</option>
                                    <option value="1">Kapal Tangkap</option>
                                  </select>
                                </div>
                              </div>
                              <div class="col mb-0">
                                <label for="defaultSelect" class="form-label"
                                  >Dimensi Kapal (P x L)</label
                                >
                                <div class="input-group mb-3">
                                  <input
                                    type="text"
                                    id="nameWithTitle"
                                    class="form-control"
                                    placeholder="21,25"
                                  />
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">x</span>
                                  </div>
                                  <input
                                    type="text"
                                    id="nameWithTitle"
                                    class="form-control"
                                    placeholder="5,30"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row g-2">
                              <div class="col mb-0">
                                <div class="mb-3">
                                  <label for="nameWithTitle" class="form-label">Nomor SIUP</label>
                                  <input
                                    type="email"
                                    id="nameWithTitle"
                                    class="form-control"
                                    placeholder="02.20.01.0140.10332"
                                  />
                                </div>
                              </div>
                              <div class="col mb-0">
                                <div class="mb-3">
                                  <label for="nameWithTitle" class="form-label">Nomor BKP</label>
                                  <input
                                    type="text"
                                    id="nameWithTitle"
                                    class="form-control"
                                    placeholder="A011044"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label">Tanda Selar</label>
                                <input
                                  type="text"
                                  id="nameWithTitle"
                                  class="form-control"
                                  placeholder="TB. KARIMUN/GT.30 NO.1645/GGE"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-label-secondary"
                              data-bs-dismiss="modal"
                            >
                              Tutup
                            </button>
                            <button type="button" class="btn btn-primary">Simpan</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--/ About User -->

        <!-- Profile Overview -->
        <div class="card mb-4">
          <div class="card-body">
            <p class="card-text text-uppercase">BIODATA PEMILIK</p>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 10%"><i class="ti ti-phone-call"></i></th>
                  <th style="width: 40%">Nama</th>
                  <td>ASENG</td>
                </tr>
                <tr>
                  <th><i class="ti ti-mail ti-fade"></i></th>
                  <th>Email</th>
                  <td>aseng2102@gmail.com</td>
                </tr>
                <tr>
                  <th colspan="3" style="border: 0px">
                    <div class="d-grid gap-2 col-lg-9 mx-auto">
                      <button
                        class="btn btn-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modalBiodata"
                      >
                        Edit Biodata Pemilik
                      </button>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="modalBiodata" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalBiodataTitle">
                              Detail Biodata Pemilik
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label">Nama</label>
                                <input
                                  type="text"
                                  id="nameWithTitle"
                                  class="form-control"
                                  value="ASENG"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label">Nomor HP</label>
                                <input type="text" class="form-control" value="081249442476" />
                              </div>
                            </div>
                            <div class="row">
                              <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label">Email</label>
                                <input
                                  class="form-control"
                                  type="email"
                                  value="aseng2102@gmail.com"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-label-secondary"
                              data-bs-dismiss="modal"
                            >
                              Tutup
                            </button>
                            <button type="button" class="btn btn-primary">Simpan</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--/ Profile Overview -->

        <!-- Profile Overview -->
        <div class="card mb-4">
          <div class="card-body">
            <p class="card-text text-uppercase">Tinjauan</p>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 10%"><i class="ti ti-check"></i></th>
                  <th style="width: 40%">Total Fraud</th>
                  <th><span class="badge bg-label-danger">2</span></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-lg-7 col-md-7">
        <div class="col-md-12 col-12 mb-4">
          <input type="text" id="bs-rangepicker-range" class="form-control" />
        </div>
        <!-- Activity Timeline -->
        <div
          class="card card-action mb-4 navbar-dropdown dropdown"
          style="height: 832px !important; overflow-y: scroll"
        >
          <div class="card-header align-items-center">
            <h5 class="card-action-title mb-0">Log Kapal</h5>
            <div class="card-action-element">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn dropdown-toggle hide-arrow p-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="ti ti-dots-vertical text-muted"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="javascript:void(0);">Export Log</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body pb-0">
            <ul class="timeline ms-1 mb-0">
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-success">
                      <i class="fa-solid fa-circle-arrow-down"></i> &nbsp;
                      <strong> CHECK IN </strong>
                    </span>
                    <small class="text-muted">2023-09-14 18:21:30</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-info"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-info">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> CHECK OUT </strong>
                    </span>
                    <small class="text-muted">2023-09-03 18:21:30</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-success">
                      <i class="fa-solid fa-circle-arrow-down"></i> &nbsp;
                      <strong> CHECK IN </strong>
                    </span>
                    <small class="text-muted">2023-08-31 11:45:51</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-info"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-info">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> CHECK OUT </strong>
                    </span>
                    <small class="text-muted">2023-08-31 10:51:17</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-success">
                      <i class="fa-solid fa-circle-arrow-down"></i> &nbsp;
                      <strong> CHECK IN </strong>
                    </span>
                    <small class="text-muted">2023-08-31 10:49:00</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-info"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-info">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> CHECK OUT </strong>
                    </span>
                    <small class="text-muted">2023-08-31 10:46:42</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-success">
                      <i class="fa-solid fa-circle-arrow-down"></i> &nbsp;
                      <strong> CHECK IN </strong>
                    </span>
                    <small class="text-muted">2023-08-31 10:46:33</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-info"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-info">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> CHECK OUT </strong>
                    </span>
                    <small class="text-muted">2023-08-31 03:16:57</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-success">
                      <i class="fa-solid fa-circle-arrow-down"></i> &nbsp;
                      <strong> CHECK IN </strong>
                    </span>
                    <small class="text-muted">2023-08-31 01:14:45</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-info"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-info">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> CHECK OUT </strong>
                    </span>
                    <small class="text-muted">2023-08-30 19:30:50</small>
                  </div>
                  <p class="mb-2">PPP Tegalsari - Tegal</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-warning"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-warning">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> OUT OF SCOPE </strong>
                    </span>
                    <small class="text-muted">2023-08-30 19:30:50</small>
                  </div>
                  <p class="mb-2">-6.228013, 106.811361</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-danger"></span>
                <div class="timeline-event">
                  <div class="timeline-header">
                    <span class="badge bg-label-danger">
                      <i class="fa-solid fa-circle-arrow-up"></i> &nbsp;
                      <strong> FRAUD </strong>
                    </span>
                    <small class="text-muted">2023-08-30 19:30:50</small>
                  </div>
                  <p class="mb-2">-6.218116, 106.802735</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--/ Content -->
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LPolygon, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'ShipDetail',
  components: {
    LMap,
    LTileLayer,
    LPolygon
  },
  data() {
    return {
      zoom: 16
    }
  }
}
</script>
