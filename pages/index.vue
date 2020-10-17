<template>
  <div>
    <div class="mt-5">
      <div class="flex w-full">
        <h1 class="mx-auto leading-tight text-center title pb-5 max-w-lg">
          {{ $t('landing_page.title') }}
        </h1>
      </div>
      <div class="container md:flex">
        <!--list all shops-->
        <ShopList class="md:w-1/2" :initial-shops="shops" />

        <div class="w-full md:w-1/2 p-5">
          <Map
            :token="$config.mapboxKey"
            map-style="mapbox://styles/mapbox/streets-v11"
            :shops="shops"
          />
        </div>
      </div>

      <!--about section-->
      <AboutSection />

      <!--sponsors section-->
      <SponsorsSection />

      <!--contact section-->
      <ContactSection />
    </div>
  </div>
</template>

<script>
// import mapboxgl from 'mapbox-gl'
export default {
  async asyncData({ $axios }) {
    try {
      const geohash = 'u1r3r97xyucn' // default = Braunschweig
      const { rows: shops } = await $axios.$get(`/api/shops/near/${geohash}`)
      return { shops }
    } catch (e) {
      return {
        shops: [
          {
            _id: '1',
            name: 'Lukas Mauser',
            images: { cover: '/icon.png' },
            description: 'Decription for store 1',
            address: { geometry: { coordinates: [10.515, 52.265] } },
            slug: 'lukas-mauser',
            parsedOpeningHours: {
              monday: { open: null, close: null },
              sunday: { open: null, close: null },
            },
          },
          {
            _id: '2',
            name: 'Example Store 2',
            images: { cover: '/icon.png' },
            description: 'Decription for store 2',
            address: { geometry: { coordinates: [10.518, 52.265] } },
            slug: 'example-2',
          },
          {
            _id: '3',
            name: 'Example Store 3',
            images: { cover: '/icon.png' },
            description: 'Decription for store 3',
            address: { geometry: { coordinates: [10.52, 52.265] } },
            slug: 'example-3',
          },
          {
            _id: '4',
            name: 'Example Store 4',
            images: { cover: '/icon.png' },
            description: 'Decription for store 4',
            address: { geometry: { coordinates: [10.525, 52.265] } },
            slug: 'example-4',
          },
        ],
      }
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css',
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.css',
        },
      ],
      script: [
        {
          src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js',
        },
        {
          type: 'text/javascript',
          src:
            'https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.min.js',
        },
      ],
    }
  },
}
</script>
<style scoped>
.map {
  height: 600px;
}
</style>
