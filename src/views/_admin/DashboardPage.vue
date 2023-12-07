<template>
  <b-card no-body style="margin-bottom: 0px !important">
    <b-card-body style="padding: 0px !important">
      <MapDashboard />
    </b-card-body>
  </b-card>
</template>
<script>
import MapDashboard from "@/components/map/MapDashboard.vue"

export default {
  components: {
    MapDashboard
  }
}
</script>
