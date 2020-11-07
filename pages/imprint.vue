<template>
  <div class="container prose mb-5 mt-5 md:mt-24">
    <div class="card w-full markdown-body">
      <div v-if="content.content" v-html="$md.render(content.content)"></div>
      <div
        v-if="content.contentMore"
        v-html="$md.render(content.contentMore)"
      ></div>
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/modules/contentful.server.js'
const client = createClient()

export default {
  name: 'Imprint',
  async asyncData({ params, $config, $errorHandler }) {
    try {
      const { fields } = await client.getEntry('383HaOpwTeaZpMV4nvJVTp')
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
