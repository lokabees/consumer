<template>
  <div class="container max-w-2xl py-8">
    <h1>{{ $t('contact.title') }}</h1>
    <FormulateForm v-model="contact" @submit="submit">
      <FormulateInput
        name="name"
        type="text"
        :placeholder="$t('contact.name_placeholder')"
        :label="$t('contact.name_label')"
        validation="required"
      />
      <FormulateInput
        name="email"
        type="text"
        :placeholder="$t('contact.email_placeholder')"
        :label="$t('contact.email_label')"
        validation="required|email"
      />
      <FormulateInput
        name="text"
        type="textarea"
        :placeholder="$t('contact.text_placeholder')"
        :label="$t('contact.text_label')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('contact.submit_label')" />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {},
    }
  },
  methods: {
    submit() {
      console.log(this.contact)
    },
  },
}
</script>
