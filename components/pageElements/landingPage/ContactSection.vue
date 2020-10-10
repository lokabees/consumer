<template>
  <div class="bg-white">
    <div class="container prose text-center py-10 px-2">
      <h2>{{ $t('landing_page.contact.title') }}</h2>
      <p>{{ $t('landing_page.contact.text') }}</p>
      <FormulateForm @submit="submit">
        <div class="flex w-full justify-center">
          <div class="p-1">
            <FormulateInput
              type="text"
              :placeholder="$t('landing_page.contact.placeholder')"
              validation="required|email"
            />
          </div>
          <div class="p-1">
            <FormulateInput
              type="submit"
              :label="$t('landing_page.contact.button')"
            />
          </div>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      console.log('submit')
    },
  },
}
</script>
