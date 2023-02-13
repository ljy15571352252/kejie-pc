import Vue from 'vue'
import Vuex from 'vuex'
import actions from './param/actions'
import mutations from './param/mutations'
import state from './param/state'
import getters from './param/getter'

Vue.use(Vuex)

const createStore = () => new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export default createStore
