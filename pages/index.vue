<template>
  <div>
    <div>
      <div class="pt-8 flex w-full bg-primary-lightest">
        <h1 class="mx-auto leading-tight text-center title pb-5 max-w-lg">
          {{ $t('landing_page.title') }}
        </h1>
      </div>
      <div class="md:flex">
        <!--list all shops-->
        <div class="w-full md:w-1/2 p-5">
          <ShopList
            :selected-shop="selectedShop"
            @search="flyTo($event)"
            @selectShop="selectShop($event)"
          />
        </div>
        <div class="w-full md:w-1/2">
          <Map
            class="map"
            :token="$config.mapboxKey"
            :shops="shops"
            :selected-shop="selectedShop"
            @load="onMapLoad($event)"
            @selectShop="selectShop($event)"
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
    await store.dispatch('shops/getShops', params)
  },
  data: () => ({
    selectedShop: {},
    map: {},
  }),
  computed: {
    ...mapState({
      selectedPosition: (state) => state.position.selectedMapPosition,
    }),
    ...mapGetters('shops', {
      shops: 'shops',
    }),
  },
  methods: {
    ...mapMutations('shops', {
      selectShopInStore: 'selectShop',
    }),
    ...mapMutations({
      setPosition: 'setPosition',
    }),
    ...mapActions('shops', {
      getShops: 'getShops',
    }),
    selectShop(shop) {
      this.selectShopInStore(shop)
      this.flyTo(shop.address)
    },
    onMapLoad({ map }) {
      const viewChanged = debounce(this.viewChanged, 800)

      this.map = map

      this.map.on('zoomend', (e) => {
        viewChanged(e)
      })
      this.map.on('moveend', (e) => {
        viewChanged(e)
      })
    },
    flyTo(location) {
      this.map.flyTo({
        center: location?.geometry?.coordinates || [52.268874, 10.52677],
        zoom: 11,
      })
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
  height: 620px;
}
</style>
