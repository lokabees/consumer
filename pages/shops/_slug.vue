<template>
  <div>
    <div class="relative">
      <div class="relative flex justify-end pb-1/2 md:pb-1/4 bg-primary-light">
        <img
          v-if="coverImage"
          :src="coverImage"
          class="absolute h-full w-full object-cover"
        />
        <div v-else class="absolute flex h-full w-1/2 items-center">
          <div>
            <img class="mx-auto pb-5" src="/img/icons/add-pic.svg" />
            <span class="mx-auto text-center">{{
              $t('dashboard.upload_cover_image')
            }}</span>
          </div>
        </div>
      </div>

      <div
        class="flex md:flex-none w-full justify-items-center bg-primary-lightest"
      >
        <div
          class="mx-auto relative md:absolute md:bottom-0 md:left-20 bg-white border-4 border-white md:-mb-16 -mb-5 w-2/3 md:w-1/3 md:pb-1/5 pb-1/3 -mt-1/4"
        >
          <img
            v-if="profileImage"
            :src="profileImage"
            class="absolute h-full w-full object-cover"
          />

          <div v-else class="absolute flex h-full w-full bg-grey-lighter">
            <div class="mx-auto my-auto text-center">
              <img class="mx-auto pb-5" src="/img/icons/add-pic.svg" />
              <span>{{ $t('dashboard.upload_profile_image') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary-lightest">
      <div class="container md:flex p-2">
        <div class="md:w-1/2 mt-20 text-center">
          <h1 class="text-5xl uppercase leading-tight">{{ shop.name }}</h1>
          <div class="flex flex-wrap justify-center w-full mt-">
            <div
              v-for="(categoryId, key) in shop.categories"
              :key="key"
              class="category"
            >
              <span class="text-white">{{ categoryName(categoryId) }} </span>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 py-3 mb-5">
          <div class="flex mt-5 mb-3">
            <div
              v-for="deliveryOption in shop.delivery"
              :key="deliveryOption"
              class="flex-auto text-xs text-primary"
            >
              <div class="h-8 flex items-center text-center">
                <img
                  :src="
                    deliveryOptions[deliveryOption]
                      ? deliveryOptions[deliveryOption].icon
                      : '/icon.png'
                  "
                />
              </div>
              <span>{{
                $t(
                  deliveryOptions[deliveryOption]
                    ? deliveryOptions[deliveryOption].name
                    : ''
                )
              }}</span>
            </div>
          </div>

          <div class="text-grey-dark">
            {{ shop.description }}
          </div>

          <div class="flex mt-8">
            <a
              :class="{ 'pointer-events-none': !shop.contact.phone }"
              :href="`tel:${shop.contact.phone || ''}`"
            >
              <button
                :class="{ disabled: !shop.contact.phone }"
                class="bg-primary text-white flex mr-2"
              >
                {{ $t('shop.call') }}
                <i class="m-auto ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    class="eva"
                  >
                    <g data-name="phone">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path
                        d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22zM6.6 4A2.61 2.61 0 0 0 4 6.6 13.41 13.41 0 0 0 17.4 20a2.61 2.61 0 0 0 2.6-2.6v-.33L15.36 16l-.29.55c-.45.87-.78 1.5-1.62 1.16a11.85 11.85 0 0 1-7.18-7.21c-.36-.78.32-1.14 1.18-1.59L8 8.64 6.93 4z"
                      ></path>
                    </g>
                  </svg>
                </i>
              </button>
            </a>

            <a
              :class="{ 'pointer-events-none': !shop.contact.email }"
              :href="`mailto:${shop.contact.email || ''}`"
              target="_blank"
            >
              <button
                :class="{ disabled: !shop.contact.email }"
                class="bg-primary text-white flex ml-2"
              >
                {{ $t('shop.send_msg') }}
                <i class="m-auto ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <g data-name="email">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path
                        d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
                      ></path>
                    </g>
                  </svg>
                </i>
              </button>
            </a>
          </div>

          <div
            class="mt-5 text-primary cursor-pointer text-sm font-bold"
            @click="showOpeningHours = !showOpeningHours"
          >
            {{ shop.isOpen ? $t('shop.now_open') : $t('shop.now_closed') }}
            {{ showOpeningHours ? '-' : '+' }}
          </div>
          <div v-if="showOpeningHours">
            <div
              v-for="(hours, day) in shop.openingHours"
              :key="day"
              class="flex text-sm"
              :class="{ 'font-bold': isToday(day) }"
            >
              <div class="w-1/2 sm:w-1/3´">{{ $t(`shop.days.${day}`) }}</div>
              <div>
                {{
                  hours.open
                    ? `${hours.open}-${hours.close}`
                    : $t('shop.now_closed')
                }}
              </div>
            </div>
          </div>

          <div>
            <div v-if="showDetails">
              <div class="py-4">
                <label class="text-sm">{{ $t('shop.address') }}</label>
                <div class="flex border-b">
                  <div>
                    {{ getAddressString() }}
                  </div>
                  <img class="ml-auto" src="/img/icons/map.svg" />
                </div>
              </div>
              <div v-if="shop.contact.website" class="py-4">
                <label class="text-sm">{{ $t('shop.website') }}</label>
                <div class="flex border-b">
                  <a
                    class="text-primary"
                    :href="shop.contact.website"
                    target="_blank"
                  >
                    {{ shop.contact.website }}
                  </a>
                  <img class="ml-auto" src="/img/icons/web.svg" />
                </div>
              </div>
              <div v-if="shop.contact.whatsapp" class="py-4">
                <label class="text-sm">{{ $t('shop.whatsapp') }}</label>
                <div class="flex border-b">
                  <div>
                    {{ shop.contact.whatsapp }}
                  </div>
                  <img class="ml-auto" src="/img/icons/whatsapp.svg" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-5 text-primary cursor-pointer text-sm font-bold"
            @click="showDetails = !showDetails"
          >
            {{
              !showDetails
                ? $t('shop.show_details') + ' +'
                : $t('shop.hide_details') + ' -'
            }}
          </div>
        </div>
      </div>
    </div>

    <PageElementsShopProductsSection :products="products" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, redirect, params: { slug } }) {
    try {
      const { data: shop } = await $axios.get(`/api/shops/${slug}`)
      const shopCategories = await $axios.$get('/api/shops/categories')
      const { rows: products } = await $axios.$get(
        `/api/shops/${shop._id}/products`
      )
      return { shop, shopCategories, products }
    } catch (e) {
      console.error(e)
      redirect('/')
      return {
        shop: {},
        shopCategories: {},
        products: [],
      }
    }
  },
  data() {
    return {
      showDetails: false,
      showOpeningHours: false,
      deliveryOptions: {
        LD: {
          name: 'shop.delivery',
          icon: '/img/icons/delivery.svg',
        },
        PU: {
          name: 'shop.pickup',
          icon: '/img/icons/pickup.svg',
        },
        MD: {
          name: 'shop.ship',
          icon: '/img/icons/ship.svg',
        },
      },
    }
  },
  computed: {
    coverImage() {
      if (this.shop?.images?.cover?.url === 'cdn-link')
        return '/img/shop/cover_placeholder.jpg'
      return this.shop?.images?.cover?.url
    },
    profileImage() {
      if (this.shop?.images?.profile?.url === 'cdn-link')
        return '/img/shop/profile_placeholder.jpg'
      return this.shop?.images?.profile?.url
    },
  },
  methods: {
    categoryName(id) {
      return this.shopCategories[id]
    },
    getAddressString() {
      const { postcode, city, street, number } = this.shop.address
      return `${street} ${number}, ${postcode} ${city}`
    },
    isToday(day) {
      const date = new Date()
      const today = date.getDay()
      const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ]
      return days[today] === day
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  @apply bg-grey-light text-white rounded-full px-2 py-1 m-1 flex-none select-none;
}
.disabled {
  @apply bg-grey cursor-default;
}
</style>
