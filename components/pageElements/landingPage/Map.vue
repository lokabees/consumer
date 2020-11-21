<template>
  <div class="h-full">
    <MglMap
      class="map"
      :center.sync="center"
      :access-token="token"
      map-style="mapbox://styles/mapbox/streets-v11"
      :zoom="zoom"
      :attribution-control="false"
      @load="$emit('load', $event)"
    >
      <MglNavigationControl />
      <MglMarker
        v-for="(shop, key) in shopsReversed()"
        :key="key"
        class="cursor-pointer"
        :coordinates="getShopCoordinates(shop)"
        color="blue"
      >
        <div slot="marker" class="flex">
          <img
            src="/icon.png"
            class="w-10 h-10 cursor-pointer z-10"
            @click="$emit('selectShop', shop)"
          />
          <div
            v-if="isSelected(shop._id)"
            class="absolute pl-10 pr-2 bg-white shadow-md rounded"
          >
            <span class="font-bold">{{ shop.name }}</span>
          </div>
        </div>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    token: {
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
  computed: {
    ...mapGetters('shops', { shops: 'shops', selectedShop: 'selectedShop' }),
  },

  methods: {
    shopsReversed() {
      const array = []
      this.shops.forEach((shop) => array.unshift(shop))
      return array
    },
    getShopCoordinates(shop) {
      return shop?.address?.geometry?.coordinates || [0, 0]
    },
    isSelected(id) {
      return this.selectedShop._id === id
    },
  },
}
</script>
