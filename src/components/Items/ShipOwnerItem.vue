<template>
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
                      <h5 class="modal-title" id="modalBiodataTitle">Detail Biodata Pemilik</h5>
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
                          <input class="form-control" type="email" value="aseng2102@gmail.com" />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
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
</template>
