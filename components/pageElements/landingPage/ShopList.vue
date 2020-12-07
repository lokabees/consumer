<template>
  <div>
    <!-- search bar -->
    <FormulateForm @submit="search">
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
          :class="{ 'spinner-dark': searching }"
          element-class="h-full flex"
          wrapper-class="h-full"
          input-class="my-4 button bg-grey-dark text-white w-full hide-on-spinner"
          type="submit"
          :label="$t('landing_page.shop_list.search')"
        />
      </div>
    </FormulateForm>
    <!-- shop list -->
    <div class="grid grid-flow-row-dense overflow-hidden sm:grid-cols-2 gap-2">
      <div v-if="shopList().length === 0">
        <span>{{ $t('landing_page.shop_list.no_shops') }}</span>
      </div>

      <ShopSearchResult
        v-for="shop in shopList()"
        :key="shop._id"
        :shop="shop"
        :selected="shop._id === selectedShop._id"
        @selectShop="$emit('selectShop', $event)"
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
      searching: false,
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
        this.searching = true
        const location = await this.$axios.$get('/api/maps/suggest', {
          params: { q: search },
        })
        this.$emit('search', location)
        this.searching = false
      } catch (e) {
        console.error(e)
        this.searching = false
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

<style lang="scss">
.spinner-dark .hide-on-spinner {
  @apply text-grey-dark;
}
</style>
