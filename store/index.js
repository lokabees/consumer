import geohash from 'ngeohash'

export const state = () => ({
  position: {
    selectedMapPosition: {
      latitude: 52.268874,
      longitude: 10.52677,
      geohash: 'u1r3rd9r4t6',
      zoom: 12,
      name: null,
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
  setPosition(state, { latitude, longitude, name, zoom }) {
    const userGeohash = geohash.encode(latitude, longitude)
    state.position.selectedMapPosition = {
      latitude,
      longitude,
      zoom,
      geohash: userGeohash,
      name,
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
