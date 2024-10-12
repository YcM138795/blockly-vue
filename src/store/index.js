// import { createPinia } from 'pinia'
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

// const pinia = createPinia()

export default store