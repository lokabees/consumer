<template>
  <div class="w-1/2" :class="{ active: selected }" @click="$emit('selectShop')">
    {{ selected }}
    <div class="prose">
      <div class="flex w-full">
        <img :src="shop.images.cover" class="object-cover w-full" />

        <div v-if="selected">
          <span> {{ $t('landing_page.shop_list.open_until') }}</span>
          <p>{{ shop.description }}</p>
        </div>
      </div>
      <div class="flex">
        <div>
          <h3>{{ shop.name }}</h3>
          <p>{{ shop.address }}</p>
        </div>
        <button v-if="selected" class="secondary">
          {{ $t('landing_page.shop_list.call') }}
        </button>
        <button v-if="selected" class="secondary">
          {{ $t('landing_page.shop_list.email') }}
        </button>
        <button
          v-if="selected"
          class="primary"
          @click="$router.push(`/shops/${shop.slug}`)"
        >
          {{ $t('landing_page.shop_list.go_to_store') }}
        </button>
      </div>
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

<style lang="scss" scoped>
.active {
  @apply col-span-2;
}
</style>
