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
          <ShopList :initial-shops="shops" />
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
import _ from 'lodash'
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
      const context = this
      map.on('zoomend', (e) => {
        context.viewChanged(e)
      })
      map.on('moveend', (e) => {
        context.viewChanged(e)
      })
    },
    showDetails(shop) {
      this.selectedShop = shop
      this.showDetail = true
    },
    async positionChanged(target) {
      console.log('load')
      const center = target.getCenter()
      const position = {
        lattitude: center.lat,
        longitude: center.lng,
        zoom: target.getZoom(),
        name: '',
      }

      this.setPosition(position)
      console.log('vie changed')
      console.log(position)
      try {
        await this.getShops()
      } catch (error) {
        console.log(error)
      }
    },
    viewChanged({ target }) {
      console.log('cahnge')
      _.debounce(() => {
        console.log('deb')
      }, 200)
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
