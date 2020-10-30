<template>
  <div class="bg-primary-lightest border-b border-grey-dark">
    <div class="flex overflow-hidden">
      <div class="w-1/3 overflow-hidden">
        <!-- Column Content -->
      </div>

      <div
        class="flex flex-wrap content-center w-1/3 justify-center overflow-hidden my-6"
      >
        <n-link to="/"><img src="/img/logo.svg" width="130px" /></n-link>
      </div>

      <div
        class="flex flex-wrap content-center justify-end w-1/3 overflow-hidden"
      >
        <a class="h-full" :href="`${shopOwnerUrl}/login`" target="_blank">
          <button class="bg-primary h-full text-white rounded-none">
            {{ $t('navbar.login') }}
          </button></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopOwnerUrl: process.env.SHOP_OWNER_URL,
    }
  },
}
</script>
