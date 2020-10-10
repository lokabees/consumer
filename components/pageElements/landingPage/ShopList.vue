<template>
  <div class="pt-10">
    <!-- search bar -->
    <FormulateInput
      type="text"
      name="search"
      :placeholder="'SEARCH PLACEHOLDER'"
      validation="required"
    />
    {{ selectedShop }}
    <!-- shop list -->
    <div class="grid grid-flow-row grid-cols-2">
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
    shops: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedShop: '',
    }
  },
}
</script>
