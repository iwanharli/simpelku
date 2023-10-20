<template>
  <div class="card">
    <h5 class="card-header">KAPAL TERDAFTAR</h5>
    <div class="card-datatable text-nowrap">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
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
</template>
