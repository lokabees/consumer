<template>
  <div>
    <!-- search bar -->
    <FormulateForm @submit="getShopsNear">
      <FormulateInput
        type="text"
        name="search"
        :placeholder="'SEARCH PLACEHOLDER'"
        validation="required"
      />
      <FormulateInput type="submit" />
    </FormulateForm>
    <!-- shop list -->
    <div class="grid grid-flow-row sm:grid-cols-2 p-2 gap-2">
      <ShopSearchResult
        v-for="shop in shops"
        :key="shop._id"
        :shop="shop"
        :selected="shop._id === selectedShop"
        @selectShop="selectedShop = shop._id"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialShops: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      shops: [],
      selectedShop: '',
    }
  },
  mounted() {
    this.getShopsNear('geohash')
  },
  methods: {
    async getShopsNear({ search }) {
      const geohash = 'u1r3r97xyucn'

      try {
        const q = search
        const { geometry } = await this.$axios.$get('/api/maps/suggest', {
          params: { q },
        })
        const { coordinates } = geometry

        console.log(coordinates)

        const { rows: shops } = await this.$axios.$get(
          `/api/shops/near/${geohash}`
        )
        this.shops = shops
        console.log(shops)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
