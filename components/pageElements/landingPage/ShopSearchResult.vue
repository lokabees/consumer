<template>
  <div>
    <img :src="shop.images.cover" />
    <h3>{{ shop.name }}</h3>
    <p>{{ shop.address }}</p>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      required: true,
      validator: (shop) => {
        return shop.name && shop.images && shop.address
      },
      default: () => {},
    },
  },
}
</script>
