<template>
  <div>
    <div class="">Shop details</div>
    cover img:
    <img :src="shop.images.cover" width="150px" />
    profile img:
    <img :src="shop.images.profile" width="150px" />
    <h1>{{ shop.name }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params: { slug } }) {
    try {
      console.log(slug)
      const shop = await $axios.get(`/api/shops/5f5f3146cf1c611658a47dc8`)
      console.log(shop)
      return { shop }
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
        },
      }
    }
  },
}
</script>
