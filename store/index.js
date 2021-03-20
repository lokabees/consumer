import geohash from 'ngeohash'

export const state = () => ({
  position: {
    selectedMapPosition: {
      latitude: 52.268874,
      longitude: 10.52677,
      geohash: 'u1r3rd9r4t6',
      zoom: 12,
      name: null,
      swLatitude: 50.361319072409344,
      swLongitude: 8.437194824220597,
      neLatitude: 52.08127728275616,
      neLongitude: 11.749572753908495,
      southwestgeohash: 'u0vyrzzzb',
      northeastgeohash: 'u322735g2',
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
