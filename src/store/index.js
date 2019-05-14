import Vuex from 'vuex';
import Vue from 'vue';

const state = {
  user: null
}

const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations
})

export default store
