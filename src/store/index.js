import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import auth from './auth'
import upload from './upload'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        auth,
        upload,
    }
})