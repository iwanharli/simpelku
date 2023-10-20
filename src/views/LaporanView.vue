<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row my-4">
      <div class="col">
        <div class="accordion" id="collapsibleSection">
          <!-- Delivery Address -->
          <div class="card accordion-item">
            <h2 class="accordion-header" id="headingDeliveryAddress">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDeliveryAddress"
                aria-expanded="true"
                aria-controls="collapseDeliveryAddress"
              >
                Kapal Fraud
              </button>
            </h2>
            <div
              id="collapseDeliveryAddress"
              class="accordion-collapse collapse show"
              aria-labelledby="headingDeliveryAddress"
              data-bs-parent="#collapsibleSection"
            >
              <div class="accordion-body">
                <div class="row">
                  <div class="card-datatable text-nowrap">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Device ID</th>
                          <th>Nama Kapal</th>
                          <th>Nama Penanggung Jawab</th>
                          <th class="text-center">Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <th>TP1A.220624.014</th>
                          <th>KAPAL 1</th>
                          <th>Budi Sudarsono</th>
                          <th class="text-center">
                            <span class="badge bg-label-secondary">OFFLINE</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>2</th>
                          <th>QQ2A.200305.003</th>
                          <th>KAPAL 2</th>
                          <th>Agus Suprapto</th>
                          <th class="text-center">
                            <span class="badge bg-label-success">CHECK IN</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>3</th>
                          <th>TKQ1.220807.001</th>
                          <th>KAPAL 3</th>
                          <th>Koesnadi Sudibyo</th>
                          <th class="text-center">
                            <span class="badge bg-label-warning">CHECK OUT</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>4</th>
                          <th>RP1A.200720.011</th>
                          <th>KAPAL 4</th>
                          <th>Mat Jaenadi</th>
                          <th class="text-center">
                            <span class="badge bg-label-primary">OUT OF SCOPE</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>5</th>
                          <th>DEMO-001</th>
                          <th>KAPAL 5</th>
                          <th>Bambang Subakir</th>
                          <th class="text-center">
                            <span class="badge bg-label-danger">FRAUD</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mt-1">
                  <button type="submit" class="btn btn-primary me-sm-3 me-1">Export Excel</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Delivery Options -->
          <div class="card accordion-item">
            <h2 class="accordion-header" id="headingDeliveryOptions">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDeliveryOptions"
                aria-expanded="false"
                aria-controls="collapseDeliveryOptions"
              >
                Kapal Check-In
              </button>
            </h2>
            <div
              id="collapseDeliveryOptions"
              class="accordion-collapse collapse"
              aria-labelledby="headingDeliveryOptions"
              data-bs-parent="#collapsibleSection"
            >
              <div class="accordion-body">
                <div class="row">
                  <div class="card-datatable text-nowrap">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Device ID</th>
                          <th>Nama Kapal</th>
                          <th>Nama Penanggung Jawab</th>
                          <th class="text-center">Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <th>TP1A.220624.014</th>
                          <th>KAPAL 1</th>
                          <th>Budi Sudarsono</th>
                          <th class="text-center">
                            <span class="badge bg-label-secondary">OFFLINE</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>2</th>
                          <th>QQ2A.200305.003</th>
                          <th>KAPAL 2</th>
                          <th>Agus Suprapto</th>
                          <th class="text-center">
                            <span class="badge bg-label-success">CHECK IN</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>3</th>
                          <th>TKQ1.220807.001</th>
                          <th>KAPAL 3</th>
                          <th>Koesnadi Sudibyo</th>
                          <th class="text-center">
                            <span class="badge bg-label-warning">CHECK OUT</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>4</th>
                          <th>RP1A.200720.011</th>
                          <th>KAPAL 4</th>
                          <th>Mat Jaenadi</th>
                          <th class="text-center">
                            <span class="badge bg-label-primary">OUT OF SCOPE</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                        <tr>
                          <th>5</th>
                          <th>DEMO-001</th>
                          <th>KAPAL 5</th>
                          <th>Bambang Subakir</th>
                          <th class="text-center">
                            <span class="badge bg-label-danger">FRAUD</span>
                          </th>
                          <th class="text-center">
                            <button class="btn btn-detail-kapal" type="button" id="kapal_detail">
                              <!-- <i class="ti ti-plus me-sm-1"></i>  -->
                              <span class="d-none d-sm-inline-block">Detail Kapal</span>
                            </button>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="mt-1">
                  <button type="submit" class="btn btn-primary me-sm-3 me-1">Export Excel</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Payment Method -->
          <div class="card accordion-item">
            <h2 class="accordion-header" id="headingPaymentMethod">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePaymentMethod"
                aria-expanded="false"
                aria-controls="collapsePaymentMethod"
              >
                Kapal Check-Out
              </button>
            </h2>
            <div
              id="collapsePaymentMethod"
              class="accordion-collapse collapse"
              aria-labelledby="headingPaymentMethod"
              data-bs-parent="#collapsibleSection"
            >
              <div class="accordion-body">
                <div class="card">
                  <div class="card-datatable table-responsive pt-0">
                    <table class="datatables-basic table">
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th>id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Salary</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--Hero area end-->
  <div class="wave_area">
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="#d3ecf9" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="#9ccce8" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="#2e88c7" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#2158a8" />
      </g>
    </svg>
  </div>
  <!--Hero area end-->
</template>
