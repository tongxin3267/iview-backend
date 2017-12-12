import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import auth from './auth'
import upload from './upload'
import admin from './admin'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        auth,
        upload,
        admin
    }
})