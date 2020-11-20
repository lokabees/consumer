<template>
  <div
    class="col-span-1"
    :class="{ active: selected }"
    @click="$emit('selectShop', shop)"
    @blur="blur"
  >
    <div>
      <div class="flex w-full">
        <div
          class="relative"
          :class="{
            'w-1/2': selected,
            'pb-1/4': selected,
            'pb-1/2': !selected,
            'w-full': !selected,
          }"
        >
          <img
            :src="coverImage"
            class="absolute top-0 left-0 h-full object-cover w-full rounded-lg"
          />
        </div>
        <div v-if="selected" class="w-1/2 overflow-hidden">
          <div class="flex">
            <span class="ml-auto bg-primary-lighter p-1 rounded-md">
              {{
                shop.isOpen ? $t('shop.now_open') : $t('shop.now_closed')
              }}</span
            >
          </div>
          <p class="my-2 mx-4">{{ getDescription() }}</p>
        </div>
      </div>

      <div class="w-full flex" :class="{ bottomRow: selected }">
        <div :class="{ 'w-1/2': selected }">
          <h3 class="my-0 text-lg text-grey-dark font-black">
            {{ shop.name }}
          </h3>
          <p class="text-sm text-grey-dark leading-tight">
            {{ getAddressString() }}
          </p>
        </div>
        <div v-if="selected" class="flex w-1/2 items-center">
          <div class="flex flex-auto">
            <button v-if="selected" class="p-0 mx-auto">
              <div class="flex">
                <eva-icon class="mx-auto" fill="#2b2b2b" name="phone-outline" />
              </div>
              <div class="text-sm text-grey-dark">
                {{ $t('landing_page.shop_list.call') }}
              </div>
            </button>
          </div>
          <div class="flex flex-auto">
            <button v-if="selected" class="p-0 mx-auto">
              <div class="flex">
                <eva-icon class="mx-auto" fill="#2b2b2b" name="email-outline" />
              </div>
              <div class="text-sm text-grey-dark">
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
  data() {
    return {
      weekdays: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    }
  },
  computed: {
    coverImage() {
      if (this.shop?.images?.cover?.url === 'cdn-link')
        return '/img/shop/cover_placeholder.jpg'
      return this.shop?.images?.cover?.url
    },
  },
  methods: {
    getAddressString() {
      const { street, city, postcode, number } = this.shop.address
      return `${street} ${number}, ${postcode} ${city}`
    },
    blur() {
      console.log('blur')
    },
    getDescription() {
      if (!this.shop || !this.shop.description) return
      return this.shop.description?.length > 150
        ? this.shop.description.slice(0, 150) + '...'
        : this.shop.description
    },
    getOpeningTime() {
      const date = new Date()
      const day = date.getDay()
      const weekdays = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ]
      const weekday = weekdays[day]

      // TODO opeingHours instead parsedOpeningHours
      if (!this.shop.openingHours) return null
      const { open, close } = this.shop.openingHours[weekday]

      // TODO breaks

      return open !== 'NaN:NaN' && close !== 'NaN:NaN'
        ? `${open}-${close}`
        : null
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
