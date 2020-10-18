<template>
  <div>
    <div>
      <div class="pt-8 flex w-full bg-primary-lightest">
        <h1 class="mx-auto leading-tight text-center title pb-5 max-w-lg">
          {{ $t('landing_page.title') }}
        </h1>
      </div>
      {{ shops }}
      <div class="flex">
        <!--list all shops-->
        <div class="md:w-1/2 p-5">
          <ShopList :selected-shop="selectedShop" />
        </div>
        <div class="w-full md:w-1/2">
          <Map
            :token="$config.mapboxKey"
            map-style="mapbox://styles/mapbox/streets-v11"
            :shops="shops"
            @load="onMapLoad($event)"
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
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { debounce } from 'lodash'
export default {
  async fetch({ store, params }) {
    await store.dispatch('getShops', params)
  },
  data: () => ({
    showDetail: false,
    selectedShop: {},
  }),
  computed: {
    ...mapState({
      selectedPosition: (state) => state.position.selectedMapPosition,
    }),
    ...mapGetters({
      shops: 'shops',
    }),
  },
  methods: {
    ...mapMutations({
      setPosition: 'setPosition',
    }),
    ...mapActions({
      getShops: 'getShops',
    }),
    onMapLoad({ map }) {
      const viewChanged = debounce(this.viewChanged, 400)

      map.on('zoomend', (e) => {
        viewChanged(e)
      })
      map.on('moveend', (e) => {
        viewChanged(e)
      })
    },
    showDetails(shop) {
      this.selectedShop = shop
      this.showDetail = true
    },
    async viewChanged({ target }) {
      const center = target.getCenter()
      const position = {
        latitude: center.lat,
        longitude: center.lng,
        zoom: target.getZoom(),
        name: '',
      }

      this.setPosition(position)
      try {
        await this.getShops()
      } catch (error) {
        console.log(error)
      }
    },
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
