<template>
  <div class="flex flex-col min-h-screen">
    <navigation class="md:block sticky top-0 z-30" />
    <CookiesConsent />
    <nuxt />
    <Footer />
    <!--  <navbar class="block md:hidden fixed bottom-0 w-full" />-->
  </div>
</template>
<script>
export default {}
</script>
