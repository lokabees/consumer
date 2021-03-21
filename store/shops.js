export const state = () => ({
  selectedShop: {},
  shops: [],
})

export const mutations = {
  selectShop(state, shop) {
    state.selectedShop = shop || {}
    if (!shop) return
    state.shops = state.shops.filter((item) => item._id !== shop._id)
    state.shops.unshift(shop)
  },
  setShops(state, shops) {
    state.shops = shops
  },
}

export const actions = {
  async getShops({ commit, dispatch, rootState, state }) {
    const { position } = rootState
    const {
      geohash,
      zoom,
      southwestgeohash,
      northeastgeohash,
    } = position?.selectedMapPosition
    console.log('swGeohash:' + southwestgeohash)
    console.log('neGeohash:' + northeastgeohash)
    const boolVal = false
    if (boolVal || southwestgeohash || northeastgeohash) {
      const { rows: shops } = await this.$axios.$get(
        `/api/shops/within/${southwestgeohash}/${northeastgeohash}`
      )
      commit('setShops', shops)
      // select shop
      const selectedShop =
        shops.filter((e) => e._id === state.selectedShop._id).length > 0
          ? state.selectedShop
          : null
      commit('selectShop', selectedShop)
    } else {
      const { rows: shops } = await this.$axios.$get(
        `/api/shops/near/${geohash}`,
        {
          params: { zoom },
        }
      )
      commit('setShops', shops)

      // select shop
      const selectedShop =
        shops.filter((e) => e._id === state.selectedShop._id).length > 0
          ? state.selectedShop
          : null
      commit('selectShop', selectedShop)
    }
  },
}

export const getters = {
  shops: (state) => state.shops,
  selectedShop: (state) => state.selectedShop,
}
