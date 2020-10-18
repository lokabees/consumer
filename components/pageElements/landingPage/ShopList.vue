<template>
  <div>
    <!-- search bar -->
    <FormulateForm @submit="search">
      <div class="flex w-full">
        <FormulateInput
          class="flex-grow"
          type="text"
          name="search"
          :placeholder="'SEARCH LOCATION'"
          validation="required"
        />
        <FormulateInput type="submit" label="SUCHE" />
      </div>
    </FormulateForm>
    <!-- shop list -->
    <div class="grid grid-flow-row sm:grid-cols-2 p-2 gap-2">
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
  props: {
    selectedShop: { type: Object, default: () => {} },
  },
  computed: {
    ...mapGetters(['shops']),
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
