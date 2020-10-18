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
    },
    {
      code: 'de',
      name: 'German',
    },
  ],
  shops: [],
  locale: 'en',
})

export const mutations = {
  setLang(state, locale) {
    if (state.locales.find((el) => el.code === locale)) {
      state.locale = locale
    }
  },
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
  setShops(state, shops) {
    state.shops = shops
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

  async getShops({ commit, dispatch, state }) {
    const { position } = state
    const { geohash, zoom } = position?.selectedMapPosition
    const { rows: shops } = await this.$axios.$get(
      `/api/shops/near/${geohash}`,
      {
        params: { zoom },
      }
    )
    commit('setShops', shops)
  },
}

export const getters = {
  shops: (state) => state.shops,
}
