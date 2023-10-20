<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row g-4 mb-4">
      <div class="col-sm-6 col-xl-3">
        <div class="card text-white mb-3" style="background-color: #67b167">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Total Kapal</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">1,600</h1>
                </div>
              </div>
              <span class="badge bg-label-info rounded p-2">
                <i class="ti ti-ship ti-sm"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-primary text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Kapal Fraud</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">3</h1>
                </div>
              </div>
              <a href="">
                <span class="badge bg-label-danger rounded p-2">
                  <i class="ti ti-bug ti-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-warning text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Pengajuan Menunggu</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">23</h1>
                </div>
              </div>
              <a href="">
                <span class="badge bg-label-info rounded p-2">
                  <i class="ti ti-user-check ti-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3">
        <div class="card bg-danger text-white mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="content-left">
                <span>Pengajuan Ditolak</span>
                <div class="d-flex align-items-center my-1">
                  <h1 class="mb-0 me-2 text-white">5</h1>
                </div>
              </div>
              <a href="">
                <span class="badge bg-label-warning rounded p-2">
                  <i class="ti ti-user-exclamation ti-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h5 class="card-header">KAPAL TERDAFTAR</h5>
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
              <th class="text-center"><span class="badge bg-label-secondary">OFFLINE</span></th>
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
              <th class="text-center"><span class="badge bg-label-success">CHECK IN</span></th>
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
              <th class="text-center"><span class="badge bg-label-warning">CHECK OUT</span></th>
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
              <th class="text-center"><span class="badge bg-label-primary">OUT OF SCOPE</span></th>
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
              <th class="text-center"><span class="badge bg-label-danger">FRAUD</span></th>
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
  </div>
</template>
