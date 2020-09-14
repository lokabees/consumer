<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="title pb-5">{{ $t('landing_page.title') }}</h1>
      <div id="map" class="map" />
      <ShopList />
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  async asyncData() {},
  mounted() {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = this.$config.mapboxKey
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [10.45, 51.16], // starting position [lng, lat]
        zoom: 5, // startin
      })
      return map
    }
  },
}
</script>
<style scoped>
.map {
  height: 600px;
}
</style>
