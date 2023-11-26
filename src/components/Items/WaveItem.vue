<template>
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
        <use xlink:href="#gentle-wave" x="48" y="0" fill="#c5c0f9" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="#a49df5" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="#8379f2" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#7367f0" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.wave_area {
  z-index: 0 !important;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
