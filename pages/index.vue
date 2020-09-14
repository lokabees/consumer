<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="title">consumer</h1>
      <div id="map">MAP</div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  mounted() {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = this.$config.mapboxKey
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // startin
      })
      return map
    }
  },
}
</script>
