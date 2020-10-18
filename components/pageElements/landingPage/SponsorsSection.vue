<template>
  <div class="bg-primary-lightest py-10">
    <div class="container text-center">
      <h2 class="pb-5">{{ $t('landing_page.sponsors.title') }}</h2>

      <div class="grid md:grid-cols-3 grid-cols-2">
        <div
          v-for="sponsor in sponsors"
          :key="sponsor.name"
          class="relative pb-1/2"
        >
          <img
            class="absolute h-full w-full object-contain m-0"
            :src="sponsor.img"
          />
        </div>
      </div>
    </div>
    <div class="mt-14 flex">
      <p class="text-center mx-auto prose">
        {{ $t('landing_page.sponsors.subtext') }}
        <a href="mailto:hello@lokabees.com">hello@lokabees.com</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sponsors: [
        {
          name: 'heroku',
          img: '/img/logos/heroku-logo-253x300.png',
        },
        {
          name: 'contentful',
          img: '/img/logos/commercetools-logo-300x152.png',
        },
        {
          name: 'regierung',
          img: '/img/logos/figma-logo-150x150.png',
        },
        {
          name: 'x',
          img: '/img/logos/phrase-logo-300x119.png',
        },
        {
          name: 'y',
          img: '/img/logos/contentful-logo-300x62.png',
        },
        {
          name: 'z',
          img: '/img/logos/heroku-logo-253x300.png',
        },
      ],
    }
  },
}
</script>
