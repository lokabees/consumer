<template>
  <div class="p-2">
    <div class="container py-20 max-w-4xl">
      <h2 class="text-center mb-10 text-grey-dark">
        {{ $t('shop.product_highlights') }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="product in products"
          :key="product.name"
          class="w-full h-full"
        >
          <div class="relative pb-4/3">
            <img
              class="absolute object-cover h-full w-full"
              :src="product.image"
            />
          </div>
          <div class="text-grey-dark">
            <h3 class="text-lg font-bold">{{ product.name }}</h3>
            <p class="text-lg">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
