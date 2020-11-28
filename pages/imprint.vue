<template>
  <div class="container prose mb-5 mt-5 md:mt-24">
    <div class="card w-full markdown-body p-2">
      <div v-if="content.content" v-html="$md.render(content.content)"></div>
      <div
        v-if="content.contentMore"
        v-html="$md.render(content.contentMore)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Imprint',
  async asyncData({ $errorHandler, $contentful }) {
    try {
      const { fields } = await $contentful('383HaOpwTeaZpMV4nvJVTp')

      return { content: fields }
    } catch (error) {
      $errorHandler(error)
      return { content: { content: {} } }
    }
  },
  head() {
    return {
      title: this.content.title,
    }
  },
}
</script>
