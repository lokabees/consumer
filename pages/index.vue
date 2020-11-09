<template>
  <div>
    <div>
      <div class="pt-8 flex w-full bg-primary-lightest">
        <h1 class="mx-auto leading-tight text-center title pb-5 max-w-lg">
          {{ $t('landing_page.title') }}
        </h1>
      </div>
      <div class="lg:flex">
        <!--list all shops-->
        <div class="w-full lg:w-1/2 p-5">
          <ShopList
            :selected-shop="selectedShop"
            @search="flyTo($event)"
            @selectShop="selectShop($event)"
          />
        </div>
        <div class="w-full lg:w-1/2">
          <no-ssr>
            <Map
              class="map"
              :token="$config.mapboxKey"
              :shops="shops"
              :selected-shop="selectedShop"
              @load="onMapLoad($event)"
              @selectShop="selectShop($event)"
            />
          </no-ssr>
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
  }),
  computed: {
    ...mapState({
      selectedPosition: (state) => state.position.selectedMapPosition,
    }),
    ...mapGetters('shops', {
      shops: 'shops',
    }),
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.map = {}
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
      if (Object.keys(this.map).length > 0) this.flyTo(shop.address, 15)
    },
    onMapLoad({ map }) {
      const viewChanged = debounce(this.viewChanged, 800)

      this.map = map
      this.map.scrollZoom.disable()
      if (this.map.tap) this.map.tap.disable()

      this.map.on('zoomend', (e) => {
        viewChanged(e)
      })
      this.map.on('moveend', (e) => {
        viewChanged(e)
      })
    },
    flyTo(location, zoom) {
      this.map.flyTo({
        center: location?.geometry?.coordinates || [52.268874, 10.52677],
        zoom: zoom || 11,
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
}
</script>
<style lang="scss">
@import '../node_modules/mapbox-gl/dist/mapbox-gl.css';

.map {
  min-height: 500px;
  pointer-events: none;
}
</style>
