<template>
  <nav
    class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
    id="layout-navbar"
    style="z-index: 9999"
  >
    <div class="container-xxl">
      <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
        <a href="javascript:void(0);" class="app-brand-link gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="61"
            height="40"
            viewBox="0 0 61 58"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M53.4649 20.2188L30.6945 1.35718L7.92407 20.2188L18.8518 29.2697L7.92407 38.3235L30.6945 57.1851L53.4649 38.3235L42.5372 29.2726L53.4649 20.2188Z"
              fill="#3895EF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M46.8043 32.8048L42.5372 29.2726L45.4478 26.8627L26.8776 14.5522L28.4753 10.788L43.8385 12.2931L43.8792 12.2815L30.6945 1.35718L7.92407 20.2188L14.5847 25.7375L18.8518 29.2697L15.9412 31.6796L34.5114 43.9901L32.9137 47.7543L17.5505 46.2492L17.5098 46.2637L30.6945 57.1851L53.4649 38.3235L46.8043 32.8048Z"
              fill="black"
              fill-opacity="0.14902"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.4905 9.18718L43.8966 12.2931L30.6945 1.35718L7.92407 20.2188L27.4905 9.18718Z"
              fill="#4D89EF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.7774 9.43078L32.9137 3.19578L30.6945 1.35718L7.92407 20.2188L27.4905 9.18718L28.7774 9.43078Z"
              fill="black"
              fill-opacity="0.14902"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.9537 49.358L17.5505 46.2492L30.7498 57.1851L53.5231 38.3235L33.9537 49.358Z"
              fill="#4D89EF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.9537 49.358L32.6175 49.1028L28.4956 55.3175L30.7497 57.1851L52.1287 39.4748L53.3604 38.4134L33.9537 49.358Z"
              fill="black"
              fill-opacity="0.14902"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.92407 20.2188L36.2281 43.6653L30.6945 57.1851L53.4649 38.3235L25.1609 14.877L30.6945 1.35718L7.92407 20.2188Z"
              fill="#A1B4FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30.6946 1.35718L24.0369 9.91508L17.3472 18.4469L17.3211 18.1975C19.5752 20.0651 21.8293 21.9327 24.0659 23.8177L30.7905 29.464L37.483 35.1451L44.1582 40.8465L44.3092 40.9741L44.1843 41.1249L37.4598 49.1724L30.6946 57.1851L37.2652 49.0129L43.8764 40.8726L43.9026 41.151L37.1664 35.5192L30.4448 29.87L23.758 24.1831C21.5214 22.2923 19.305 20.3841 17.0887 18.473L16.9551 18.357L17.0655 18.2236L23.8626 9.77878L30.6946 1.35718Z"
              fill="white"
            />
          </svg>
          <span class="app-brand-text demo menu-text fw-bold" style="margin-left: -15px !important"
            >IMPEL</span
          >
        </a>

        <a
          href="javascript:void(0);"
          class="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
        >
          <i class="ti ti-x ti-sm align-middle"></i>
        </a>
      </div>

      <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
          <i class="ti ti-menu-2 ti-sm"></i>
        </a>
      </div>

      <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <!-- Search -->
          <li class="nav-item navbar-search-wrapper me-2 me-xl-0">
            <a class="nav-link search-toggler" href="javascript:void(0);">
              <i class="ti ti-search ti-md"></i>
            </a>
          </li>
          <!-- /Search -->

          <!-- Style Switcher -->
          <li class="nav-item me-2 me-xl-0">
            <a class="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
              <i class="ti ti-md"></i>
            </a>
          </li>
          <!--/ Style Switcher -->
          <li class="menu-item active">
            <button
              type="button"
              class="btn rounded-pill btn-primary waves-effect waves-light"
              data-bs-toggle="modal"
              data-bs-target="#modalToggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-login-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"
                ></path>
                <path d="M3 12h13l-3 -3"></path>
                <path d="M13 15l3 -3"></path>
              </svg>
              &nbsp; LOGIN
            </button>
          </li>
        </ul>
      </div>

      <!-- Search Small Screens -->
      <div class="navbar-search-wrapper search-input-wrapper container-xxl d-none">
        <input
          type="text"
          class="form-control search-input border-0"
          placeholder="Search..."
          aria-label="Search..."
        />
        <i class="ti ti-x ti-sm search-toggler cursor-pointer"></i>
      </div>
    </div>
  </nav>
</template>
