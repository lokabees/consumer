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
      :key="shop.name"
      :shop="shop"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      exampleShops: [
        {
          name: '123',
          images: { cover: '/icon.png' },
          address: 'Hallo',
        },
        {
          name: '345',
          images: { cover: '/icon.png' },
          address: 'Hallo',
        },
      ],
    }
  },
}
</script>
