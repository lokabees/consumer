<template>
  <div>
    <div class="container p-10">
      <h2 class="text-center leading-tight text-grey-dark text-2xl py-5">
        {{ $t('landing_page.about.title') }}
      </h2>
      <div class="md:flex items-center">
        <div class="md:w-1/2 md:pr-2">
          <div class="relative pb-3/5">
            <img
              class="absolute topt-0 left-0 h-full w-full object-cover"
              src="/icon.png"
            />
          </div>
        </div>
        <div class="md:w-1/2 pl-2 pt-8 md:pt-0">
          <p>{{ $t('landing_page.about.text') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
