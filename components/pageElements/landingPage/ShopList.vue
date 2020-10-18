<template>
  <div>
    <!-- search bar -->
    <FormulateForm @submit="$emit('x')">
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
        :selected="shop._id === selectedShop._id"
        @selectShop="selectedShop = shop"
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
}
</script>
