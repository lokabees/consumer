<template>
  <div class="h-full">
    <MglMap
      class="h-full"
      :center.sync="center"
      :access-token="token"
      :map-style="mapStyle"
      :zoom="zoom"
      @load="$emit('load', $event)"
    >
      <MglMarker
        v-for="(shop, key) in shops"
        :key="key"
        class="cursor-pointer"
        :coordinates="getShopCoordinates(shop)"
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
  data() {
    return {
      center: [10, 51.16],
      zoom: 5,
    }
  },
  methods: {
    getShopCoordinates(shop) {
      return shop?.address?.geometry?.coordinates || [0, 0]
    },
  },
}
</script>
