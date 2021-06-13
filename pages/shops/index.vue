<template>
  <div class="container max-w-4xl px-2">
    <PageElementsLandingPageShopList
      :selected-shop="selectedShop"
      @search="viewChanged($event)"
      @selectShop="selectShop($event)"
    />
    <div class="flex py-4">
      <n-link class="m-auto text-primary font-bold" to="/">{{
        $t('landing_page.shop_list.back_to_map')
      }}</n-link>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  async asyncData({ query: { search }, store, $axios }) {
    if (!search || search === 'null') return
    try {
      const location = await $axios.$get('/api/maps/suggest', {
        params: { q: search },
      })
      const position = {
        latitude: location.geometry.coordinates[1],
        longitude: location.geometry.coordinates[0],
        zoom: 11,
        name: '',
      }
      store.commit('setPosition', position)
      await store.dispatch('shops/getShops')
    } catch (e) {
      console.error(e)
    }
  },
  data: () => ({
    selectedShop: {},
  }),
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
      if (process.browser) window.scrollTo(0, 0)
    },
    async viewChanged({ geometry: { coordinates } }) {
      const position = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        zoom: 11,
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
