<template>
  <div class="">Shop details</div>
</template>

<script>
export default {
  async asyncData({ $axios, params: { slug } }) {
    try {
      console.log(slug)
      const shop = await $axios.get(`/api/shops/${slug}`)
      console.log(shop)
      return { shop }
    } catch (e) {
      console.error(e)
      return {
        shop: {},
      }
    }
  },
}
</script>
