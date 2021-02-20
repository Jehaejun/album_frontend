import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './user/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: UserStore
    }
})