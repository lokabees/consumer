<template>
  <div
    v-click-outside="unselectShop"
    class="col-span-2 sm:col-span-1"
    :class="{ active: selected }"
    tabindex="1"
    @click="selectShop"
  >
    <div>
      <div class="sm:flex w-full">
        <div
          class="relative pb-1/2 w-full"
          :class="{
            'sm:w-1/2': selected,
            'sm:pb-1/4': selected,
          }"
        >
          <img
            :src="coverImage"
            class="absolute top-0 left-0 h-full object-cover w-full rounded-lg"
          />
          <div v-if="!selected" class="flex absolute top-0 right-0 z-10">
            <span class="ml-auto bg-primary-lighter p-1 rounded-md">
              {{
                shop.isOpen ? $t('shop.now_open') : $t('shop.now_closed')
              }}</span
            >
          </div>
        </div>

        <div v-if="selected" class="sm:w-1/2 overflow-hidden">
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

      <div class="w-full sm:flex py-2" :class="{ bottomRow: selected }">
        <div :class="{ 'sm:w-1/2': selected }">
          <h3 class="my-0 text-lg text-grey-dark font-black">
            {{ shop.name }}
          </h3>
          <p class="text-sm text-grey-dark leading-tight">
            {{ getAddressString() }}
          </p>
        </div>
        <div v-if="selected" class="flex py-2 sm:py-0 sm:w-1/2 items-center">
          <div class="flex flex-auto">
            <a
              v-if="selected"
              :href="`tel:${shop.contact.phone}`"
              target="_blank"
              class="p-0 mx-auto"
              :class="{ 'pointer-events-none': !shop.contact.phone }"
            >
              <button
                v-if="selected"
                class="p-0 mx-auto"
                :class="{
                  disabled: !shop.contact.phone,
                  'text-grey-dark': true,
                  'hover:text-primary': true,
                  'focus:text-primary': true,
                }"
              >
                <div class="flex">
                  <i class="mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g data-name="phone">
                        <rect width="24" height="24" opacity="0"></rect>
                        <path
                          d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22zM6.6 4A2.61 2.61 0 0 0 4 6.6 13.41 13.41 0 0 0 17.4 20a2.61 2.61 0 0 0 2.6-2.6v-.33L15.36 16l-.29.55c-.45.87-.78 1.5-1.62 1.16a11.85 11.85 0 0 1-7.18-7.21c-.36-.78.32-1.14 1.18-1.59L8 8.64 6.93 4z"
                        ></path>
                      </g>
                    </svg>
                  </i>
                </div>
                <div class="hidden sm:block text-sm text-grey-dark">
                  {{ $t('landing_page.shop_list.call') }}
                </div>
              </button>
            </a>
          </div>
          <div class="flex flex-auto">
            <a
              v-if="selected"
              :href="`mailto:${shop.contact.email}`"
              target="_blank"
              class="p-0 mx-auto"
              :class="{ 'pointer-events-none': !shop.contact.email }"
            >
              <button
                :class="{
                  disabled: !shop.contact.email,
                  'text-grey-dark': true,
                  'hover:text-primary': true,
                  'focus:text-primary': true,
                }"
              >
                <div class="flex">
                  <i class="mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <g data-name="email">
                        <rect width="24" height="24" opacity="0"></rect>
                        <path
                          d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
                        ></path>
                      </g>
                    </svg>
                  </i>
                </div>
                <div class="hidden sm:block text-sm text-grey-dark">
                  {{ $t('landing_page.shop_list.email') }}
                </div>
              </button>
            </a>
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
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside,
  },
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
    selectShop() {
      if (!this.selected) this.$emit('selectShop', this.shop)
    },
    unselectShop() {
      if (this.selected) this.$emit('selectShop', null)
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
