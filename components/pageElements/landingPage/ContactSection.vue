<template>
  <div class="bg-white">
    <div class="container prose text-center py-10 px-2">
      <h2>{{ $t('landing_page.contact.title') }}</h2>
      <p>{{ $t('landing_page.contact.text') }}</p>
      <a
        href="https://lokabees.us17.list-manage.com/subscribe?u=1d9f91ed93a76745bb2f66d4e&id=546725ca15"
        target="_blank"
      >
        <button class="primary w-full">
          {{ $t('landing_page.contact.button') }}
        </button>
      </a>
      <!--
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
    --></div>
  </div>
</template>
