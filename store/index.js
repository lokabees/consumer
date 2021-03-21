import geohash from 'ngeohash'

export const state = () => ({
  position: {
    selectedMapPosition: {
      latitude: 52.268874,
      longitude: 10.52677,
      geohash: 'u1r3rd9r4t6',
      zoom: 12,
      name: null,
      swLatitude: 41.1670647199104,
      swLongitude: -3.604334102356688,
      neLatitude: 58.139392488946555,
      neLongitude: 24.652501835143283,
      southwestgeohash: 'ezm6jyprs',
      northeastgeohash: 'ud3d8zzqs',
    },
  },
  locales: [
    {
      code: 'en',
      name: 'English',
      icon: '/img/icons/united-states.png',
    },
    {
      code: 'de',
      name: 'German',
      icon: '/img/icons/germany.png',
    },
  ],
})

export const mutations = {
  setPosition(
    state,
    {
      latitude,
      longitude,
      name,
      zoom,
      swLatitude,
      swLongitude,
      neLatitude,
      neLongitude,
    }
  ) {
    console.log('swLatitude' + swLatitude)
    console.log('swLongitude' + swLongitude)
    console.log('neLatitude' + neLatitude)
    console.log('neLongitude' + neLongitude)
    const userGeohash = geohash.encode(latitude, longitude)
    const swGeohash = geohash.encode(swLatitude, swLongitude)
    const neGeohash = geohash.encode(neLatitude, neLongitude)
    state.position.selectedMapPosition = {
      latitude,
      longitude,
      zoom,
      geohash: userGeohash,
      name,
      southwestgeohash: swGeohash,
      northeastgeohash: neGeohash,
    }
  },
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch, state }, { app }) {},

  async nuxtClientInit({ commit }, context) {
    try {
      const { coords } = await this.$geolocation.getCurrentPosition()
      commit('setPosition', coords)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  locales: (state) => state.locales,
}
