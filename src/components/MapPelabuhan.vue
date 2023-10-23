<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div style="width: 100vw; height: 93.5vh">
          <l-map ref="map" v-model:zoom="zoom" :center="[-1.167395, 115.80259]">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
          </l-map>
        </div>
      </div>
      <!-- <div class="flip-card-back">
        <h1>INSERT YOUR HEADER FOR BACK OF CARD HERE</h1>
        <p>Include first sentence to appear on back of card</p>
        <p>Include second sentence to appear on back of card</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'LandingPage',
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      zoom: 6
    }
  }
}
</script>

<!-- <style>
.flip-card {
  background-color: transparent;
  width: 2045px;
  height: 1100px;
  border: 2px solid #f1f1f1;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: red;
}

.flip-card-back {
  background-color: red;
  color: white;
  transform: rotateY(180deg);
}
</style> -->
