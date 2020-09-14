<template>
  <div class="pt-10">
    <h2>shop list</h2>
    <!-- search bar -->
    <FormulateInput
      type="text"
      name="search"
      :placeholder="'PLACEHOLDER'"
      validation="required"
    />

    <ShopSearchResult
      v-for="shop in exampleShops"
      :key="shop._id"
      :shop="shop"
      :selected="shop._id === selectedShop"
      @selectShop="selectedShop = shop._id"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedShop: '',
      exampleShops: [
        {
          _id: '1',
          name: 'Example Store 1',
          images: { cover: '/icon.png' },
          description: 'Decription for store 1',
          address: 'address for store 1',
        },
        {
          _id: '2',
          name: 'Example Store 2',
          images: { cover: '/icon.png' },
          description: 'Decription for store 2',
          address: 'Address for store 2',
        },
      ],
    }
  },
}
</script>
