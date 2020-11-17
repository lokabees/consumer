<template>
  <div>
    <div class="flex w-full text-center">
      <h1 class="leading-tight">{{ $t('error.error_occured') }}</h1>
      <p>{{ $t('error.continue_home') }}</p>
      <a class="button primary" :href="`${$config.appUrl}`">
        {{ $t('error.go_home') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>
