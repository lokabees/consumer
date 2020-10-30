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
          <div
            v-if="isSelected(shop._id)"
            class="absolute pl-10 pr-2 bg-white z-5 shadow-md rounded"
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
    getShopCoordinates(shop) {
      return shop?.address?.geometry?.coordinates || [0, 0]
    },
    isSelected(id) {
      return this.selectedShop._id === id
    },
  },
}
</script>
