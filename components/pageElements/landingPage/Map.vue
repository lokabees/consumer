<template>
  <div>
    <MglMap style="height: 600px" :access-token="token" :map-style="mapStyle">
      <MglMarker
        v-for="shop in shops"
        :key="shop.slug"
        class="cursor-pointer"
        :coordinates="shop.address.geometry.coordinates"
        color="blue"
      >
        <template v-slot:marker>
          <button>hallo</button>
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
export default {
  props: {
    shops: {
      type: Array,
      required: true,
      default: () => [],
    },
    token: {
      type: String,
      required: true,
      default: '',
    },
    mapStyle: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>
