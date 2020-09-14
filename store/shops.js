export const state = () => ({
  shops: null,
})

export const mutations = {
  setShops(state, shops) {
    state.shops = shops
  },
}

export const actions = {
  getShops() {},
}

export const getters = {}
