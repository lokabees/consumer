<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="title">
        consumer
        <icon name="comments" />
      </h1>
      <div id="map" ref="map">MAP</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$config.test)
  },
}
</script>
