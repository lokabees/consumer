<template>
  <div class="">
    <ShopList
      :selected-shop="selectedShop"
      @search="viewChanged($event)"
      @selectShop="selectShop($event)"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
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
    },
    async viewChanged({ geometry: { coordinates } }) {
      const position = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        zoom: 11,
        name: '',
      }
      console.log(position)
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
