<template>
  <div>
    <!-- search bar -->
    <FormulateForm class="p-2" @submit="search">
      <div class="flex w-full">
        <FormulateInput
          v-model="searchString"
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
      <div v-if="shopList().length === 0">
        <span>{{ $t('landing_page.shop_list.no_shops') }}</span>
      </div>
      <ShopSearchResult
        v-for="shop in shopList()"
        :key="shop._id"
        :shop="shop"
        :selected="shop._id === selectedShop._id"
        @selectShop="$emit('selectShop', shop)"
      />
    </div>
    <div class="flex py-4">
      <n-link
        v-if="
          ($route.fullPath === '/' && shopList().length > 3) ||
          (shopList().length > 2 && shopSelected)
        "
        class="m-auto text-primary font-bold"
        :to="`/shops?search=${searchString}`"
        >{{ $t('landing_page.shop_list.show_more') }}</n-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchString: null,
      shopSelected: false,
    }
  },
  computed: {
    ...mapGetters('shops', { shops: 'shops', selectedShop: 'selectedShop' }),
  },
  methods: {
    async search({ search }) {
      if (!search || search === 'null') return
      try {
        const location = await this.$axios.$get('/api/maps/suggest', {
          params: { q: search },
        })
        this.$emit('search', location)
      } catch (e) {
        console.error(e)
      }
    },
    shopList() {
      if (this.$route.fullPath !== '/') return this.shops

      const shopList = []

      this.shopSelected =
        this.shops.filter((e) => e._id === this.selectedShop._id).length > 0

      const length = this.shopSelected ? 3 : 4

      this.shops.forEach((element) => {
        if (shopList.length < length) shopList.push(element)
      })
      return shopList
    },
  },
}
</script>
