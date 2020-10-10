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

      <div class="ml-auto w-1/2 bg-primary-lightest py-3 mb-5">
        <div class="flex">
          <div>Open now</div>
          <div>
            <img src="/img/icons/delivery.svg" />
            <span>abhol</span>
          </div>
          <div>
            <img src="/img/icons/pickup.svg" />
            <span>abhol</span>
          </div>
          <div>
            <img src="/img/icons/ship.svg" />
            <span>abhol</span>
          </div>
        </div>

        <div>description</div>

        <div>
          <button>anruf</button>
          <button>mail</button>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-8 bg-white border-4 border-white -mb-5 w-1/3 pb-1/5"
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
    {{ shop }}
    <h1>{{ shop.name }}</h1>
    <div class="flex items-center w-full">
      <div class="flex flex-wrap justify-end w-full">
        <div
          v-for="(categoryId, key) in shop.categories"
          :key="key"
          class="category"
        >
          <span class="text-white">{{ categoryName(categoryId) }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params: { slug } }) {
    try {
      console.log(slug)
      const shop = await $axios.get(`/api/shops/5f81cd83ef87a4632cdaa69e_ABCDE`)
      const shopCategories = await $axios.$get('/api/shops/categories')
      console.log(shop)
      return { shop, shopCategories }
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
          Auto: 'Auto und Motorrad',
        },
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
      console.log(id)
      console.log(this.shopCategories[id])
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
