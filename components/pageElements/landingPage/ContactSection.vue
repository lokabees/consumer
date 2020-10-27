<template>
  <div class="bg-white">
    <div class="container prose text-center py-10 px-2">
      <h2>{{ $t('landing_page.contact.title') }}</h2>
      <p>{{ $t('landing_page.contact.text') }}</p>
      <div class="flex w-full justify-center">
        <div class="p-1">
          <a
            class="button primary"
            href="http://eepurl.com/hc1I0v"
            target="_blank"
            style="color: white"
          >
            {{ $t('landing_page.contact.button') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
}
</script>
