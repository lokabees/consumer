<template>
  <div>
    <div class="mt-5">
      <h1 class="text-center title pb-5">{{ $t('landing_page.title') }}</h1>
      <div class="flex">
        <!--list all shops-->
        <ShopList class="w-1/2" :shops="exampleShops" />
        <!--Map component-->
        <!--<div id="map" class="md:w-1/2 map" />-->
      </div>

      <!--about section-->
      <AboutSection />

      <!--contact section-->
      <!--

      <SponsorsSection />
    -->
      <!--contact section-->
      <ContactSection />
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  asyncData() {
    return {
      exampleShops: [
        {
          _id: '1',
          name: 'Lukas Mauser',
          images: { cover: '/icon.png' },
          description: 'Decription for store 1',
          address: 'address for store 1',
          slug: 'lukas-mauser',
        },
        {
          _id: '2',
          name: 'Example Store 2',
          images: { cover: '/icon.png' },
          description: 'Decription for store 2',
          address: 'Address for store 2',
          slug: 'example-2',
        },
        {
          _id: '3',
          name: 'Example Store 3',
          images: { cover: '/icon.png' },
          description: 'Decription for store 3',
          address: 'Address for store 3',
          slug: 'example-3',
        },
        {
          _id: '4',
          name: 'Example Store 4',
          images: { cover: '/icon.png' },
          description: 'Decription for store 4',
          address: 'Address for store 4',
          slug: 'example-4',
        },
      ],
    }
  },
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = this.$config.mapboxKey
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [10.45, 51.16], // starting position [lng, lat]
        zoom: 5, // startin
      })
    }
  },
}
</script>
<style scoped>
.map {
  height: 600px;
}
</style>
