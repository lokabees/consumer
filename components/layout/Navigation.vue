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
        <button
          class="h-full bg-primary text-white rounded-none"
          @click="$router.push('/login')"
        >
          {{ $t('navbar.login') }}
        </button>
      </div>
    </div>
  </div>
</template>
