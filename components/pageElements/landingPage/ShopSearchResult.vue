<template>
  <div
    class="col-span-1"
    :class="{ active: selected }"
    @click="$emit('selectShop')"
  >
    <div>
      <div class="flex w-full">
        <div
          class="relative"
          :class="{
            'w-1/2': selected,
            'pb-1/3': selected,
            'pb-2/3': !selected,
            'w-full': !selected,
          }"
        >
          <img
            :src="shop.images.cover"
            class="absolute top-0 left-0 h-full object-cover w-full rounded-lg"
          />
        </div>
        <div v-if="selected" class="w-1/2">
          <div class="flex">
            <span class="ml-auto bg-primary-lighter p-1 rounded-md">
              {{ $t('landing_page.shop_list.open_until') }}{{ ' 18 Uhr' }}</span
            >
          </div>
          <p class="mt-2">{{ shop.description }}</p>
        </div>
      </div>

      <div class="w-full flex" :class="{ bottomRow: selected }">
        <div class="w-1/2">
          <h3 class="my-0 text-lg font-black">{{ shop.name }}</h3>
          <p class="text-sm">{{ shop.address }}</p>
        </div>
        <div class="flex w-1/2 items-center">
          <div class="flex flex-auto">
            <button v-if="selected" class="p-0 mx-auto">
              <div>
                <eva-icon class="mx-auto" name="phone-outline" />
              </div>
              <div class="text-sm">
                {{ $t('landing_page.shop_list.call') }}
              </div>
            </button>
          </div>
          <div class="flex flex-auto">
            <button v-if="selected" class="p-0 mx-auto">
              <div>
                <eva-icon class="mx-auto" name="email-outline" />
              </div>
              <div class="text-sm">
                {{ $t('landing_page.shop_list.email') }}
              </div>
            </button>
          </div>
          <div class="flex-auto">
            <button
              v-if="selected"
              class="bg-primary text-white w-full"
              @click="$router.push(`/shops/${shop.slug}`)"
            >
              {{ $t('landing_page.shop_list.go_to_store') }}
            </button>
          </div>
        </div>
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
  @apply col-span-2 border border-grey-light rounded-lg rounded-b-lg;
}

.bottomRow {
  @apply bg-primary-lightest rounded-b-lg px-4;
}

.small-heading {
  @apply m-0;
}
</style>
