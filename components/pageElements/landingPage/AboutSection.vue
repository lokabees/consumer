<template>
  <div>
    <div class="container prose p-2">
      <h2 class="text-center">{{ $t('landing_page.about.title') }}</h2>
      <div class="flex items-center">
        <div class="w-1/2 pr-2">
          <div class="relative pb-4/5">
            <img
              class="absolute topt-0 left-0 h-full w-full object-cover"
              src="/icon.png"
            />
          </div>
        </div>
        <div class="w-1/2 pl-2">
          <p>{{ $t('landing_page.about.text') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
