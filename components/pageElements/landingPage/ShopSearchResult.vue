<template>
  <div @click="$emit('selectShop')">
    <img :src="shop.images.cover" />
    <h3>{{ shop.name }}</h3>
    <p>{{ shop.address }}</p>

    <div v-if="selected">
      <span> {{ $t('landing_page.shop_list.open_until') }}</span>
      <p>{{ shop.description }}</p>
      <button>{{ $t('landing_page.shop_list.call') }}</button>
      <button>{{ $t('landing_page.shop_list.email') }}</button>
      <button @click="$router.push(`/shops/${shop.slug}`)">
        {{ $t('landing_page.shop_list.go_to_store') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      required: true,
      validator: (shop) => {
        return (
          shop._id &&
          shop.name &&
          shop.description &&
          shop.images &&
          shop.slug &&
          shop.address
        )
      },
      default: () => {},
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
