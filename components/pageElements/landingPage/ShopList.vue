<template>
  <div>
    <!-- search bar -->
    <FormulateForm class="p-2" @submit="search">
      <div class="flex w-full">
        <FormulateInput
          class="flex-grow pr-1"
          type="text"
          name="search"
          :placeholder="$t('landing_page.shop_list.search_placeholder')"
          validation="required"
        />
        <FormulateInput
          class="pl-1"
          type="submit"
          :label="$t('landing_page.shop_list.search')"
        />
      </div>
    </FormulateForm>
    <!-- shop list -->
    <div
      class="grid grid-flow-row-dense overflow-hidden sm:grid-cols-2 p-2 gap-2"
    >
      <div v-if="shops.length === 0">
        <span>{{ $t('landing_page.shop_list.no_shops') }}</span>
      </div>
      <ShopSearchResult
        v-for="shop in shops"
        :key="shop._id"
        :shop="shop"
        :selected="shop._id === selectedShop._id"
        @selectShop="$emit('selectShop', shop)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('shops', { shops: 'shops', selectedShop: 'selectedShop' }),
  },
  methods: {
    async search({ search }) {
      try {
        const location = await this.$axios.$get('/api/maps/suggest', {
          params: { q: search },
        })
        this.$emit('search', location)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
