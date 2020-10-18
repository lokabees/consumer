<template>
  <div class="h-full">
    <MglMap
      class="h-full"
      :center.sync="center"
      :access-token="token"
      map-style="mapbox://styles/mapbox/streets-v11"
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
        <div slot="marker" class="flex">
          <img
            src="/icon.png"
            class="w-10 cursor-pointer z-10"
            @click="$emit('selectShop', shop)"
          />
          <div v-if="isSelected(shop._id)" class="absolute pl-10 bg-white z-5">
            <span class="font-bold">{{ shop.name }}</span>
          </div>
        </div>
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
    selectedShop: {
      type: Object,
      default: () => {},
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
    isSelected(id) {
      return this.selectedShop._id === id
    },
  },
}
</script>
