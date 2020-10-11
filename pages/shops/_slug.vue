<template>
  <div>
    <div class="relative">
      <div class="relative flex justify-end pb-1/4 bg-primary-light">
        <img
          v-if="coverImage"
          :src="shop.images.cover"
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
        class="absolute bottom-0 left-20 bg-white border-4 border-white -mb-12 w-1/3 pb-1/5"
      >
        <div v-if="profileImage">
          <img :src="profileImage" class="object-cover" />
        </div>
        <div v-else class="absolute flex h-full w-full bg-grey-lighter">
          <div class="mx-auto my-auto text-center">
            <img class="mx-auto pb-5" src="/img/icons/add-pic.svg" />
            <span>{{ $t('dashboard.upload_profile_image') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary-lightest">
      <div class="container flex">
        <div class="w-1/2 mt-20 text-center">
          <h1 class="text-5xl">{{ shop.name }}</h1>
          <div class="flex flex-wrap justify-center w-full mt-8">
            <div
              v-for="(categoryId, key) in shop.categories"
              :key="key"
              class="category"
            >
              <span class="text-white">{{ categoryName(categoryId) }} </span>
            </div>
          </div>
        </div>
        <div class="w-1/2 py-3 mb-5">
          <div class="flex mt-5 mb-3">
            <div class="w-2/3 font-bold">
              {{ $t('shop.now_open') }} 0:00-15:00
            </div>
            <div class="flex-auto text-xs text-primary">
              <div class="h-8 flex items-center">
                <img src="/img/icons/delivery.svg" />
              </div>
              <span>{{ $t('shop.delivery') }}</span>
            </div>
            <div class="flex-auto text-xs text-primary">
              <div class="h-8 flex items-center">
                <img src="/img/icons/pickup.svg" />
              </div>
              <span>{{ $t('shop.pickup') }}</span>
            </div>
            <div class="flex-auto text-xs text-primary">
              <div class="h-8 flex items-center">
                <img src="/img/icons/ship.svg" />
              </div>
              <span>{{ $t('shop.ship') }}</span>
            </div>
          </div>

          <div class="text-grey-dark">
            {{ shop.description }}
          </div>

          <div class="flex mt-8">
            <button class="bg-primary text-white flex mr-2">
              {{ $t('shop.call') }}
              <eva-icon class="m-auto" name="phone-outline" fill="#fff" />
            </button>
            <button class="bg-primary text-white flex ml-2">
              {{ $t('shop.send_msg') }}
              <eva-icon class="m-auto" name="email-outline" fill="#fff" />
            </button>
          </div>

          <div>show address</div>
        </div>
      </div>
    </div>

    <ProductsSection :products="products" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params: { slug } }) {
    const products = [
      { name: 'Vase', description: 'baumwolle' },
      { name: 'Hundeleine', description: 'baumwolle' },
      { name: 'Shirt', description: 'baumwolle' },
      { name: 'Glas', description: 'baumwolle' },
      { name: 'Schüssel', description: 'baumwolle' },
      { name: 'Bett', description: 'baumwolle' },
    ]
    try {
      const shop = await $axios.get(`/api/shops/5f81cd83ef87a4632cdaa69e`)
      const shopCategories = await $axios.$get('/api/shops/categories')

      console.log(shop)
      return { shop, shopCategories, products }
    } catch (e) {
      console.error(e)
      return {
        shop: {
          _id: '1',
          name: 'Lukas Mauser',
          images: { cover: '/icon.png', profile: '/icon.png' },
          description: 'Decription for store 1',
          address: 'address for store 1',
          slug: 'lukas-mauser',
          categories: ['Auto'],
        },
        shopCategories: {
          Auto: 'w und Motorrad',
        },
        products,
      }
    }
  },
  computed: {
    coverImage() {
      if (this.shop?.images?.cover?.url === 'cdn-link') return null
      return this.shop?.images?.cover?.url
    },
    profileImage() {
      if (this.shop?.images?.profile?.url === 'cdn-link') return null
      return this.shop?.images?.profile?.url
    },
  },
  methods: {
    categoryName(id) {
      return this.shopCategories[id]
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  @apply bg-grey-light text-white rounded-full px-2 py-1 m-1 flex-none select-none;
}
</style>
