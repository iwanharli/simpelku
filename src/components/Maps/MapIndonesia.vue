<template>
  <div ref="mapDiv" style="position: absolute; height: 94vh; width: 100vw; margin-top:10px" />
</template>

<script>
/* eslint-disable no-undef */

import { computed, onMounted, ref } from 'vue'
import { useGeolocation } from '../../useGeolocation'
import { Loader } from '@googlemaps/js-api-loader'
// import { Carousel3d, Slide } from 'vue-carousel-3d'

// AIzaSyB-KuyteYp1DYW8KdRT6L1M7nB_GfAER00
const GOOGLE_MAPS_API_KEY = 'AIzaSyB-KuyteYp1DYW8KdRT6L1M7nB_GfAER00'

export default {
  name: 'HomeAdmin',
  data() {
    return {
      stats: [],
      center: { lat: 51.093048, lng: 6.84212 }
    }
  },

  setup() {
    // const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: -6.846155,
      lng: 109.128892
    }))

    // const otherPos = ref(null)
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)

    let map = ref(null)
    let clickListener = null

    onMounted(async () => {
      await loader.load()
      new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 16
      })
      // clickListener = map.value.addListener(
      //   'click',
      //   ({ latLng: { lat, lng } }) =>
      //   (otherPos.value = { lat: lat(), lng: lng() })
      // )
    })
    // onMounted(async () => {
    //   if (clickListener) clickListener.remove()
    // })

    return { currPos, mapDiv }
  },

  mounted() {},

  methods: {}
}
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
