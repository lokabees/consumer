<template>
  <div class="container max-w-2xl py-8">
    <Modal :visible="isVisible" :message="$t('contact.success')">
      <template v-slot:buttons>
        <button @click="isVisible = false">{{ $t('contact.close') }}</button>
      </template>
    </Modal>
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
        validation="bail|required|email"
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
      isVisible: false,
    }
  },
  methods: {
    async submit() {
      try {
        await this.$axios.post(this.$config.formSpreeURL, this.contact)
        this.isVisible = true
      } catch (error) {
        this.$errorHandler({ prefix: 'contact', suffix: 'internal', error })
      }
    },
  },
}
</script>
