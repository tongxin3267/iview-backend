import Vue from 'vue'
import Vuex from 'vuex';

import auth from '../api/auth'
import util from '../libs/util'
import menu from './menu'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		apiLoading: true,
		token: util.cookies.get('token') || null, //token凭证;
        userInfo:{}, //身份信息
    	uploadConfig:{}, //上传配置信息
    },
    mutations: {
        token(state, token){
            state.token = token
            if (token) {
                util.cookies.set('token', token,{expires:3})
            }else{
                util.cookies.remove('token')
            }
        },
        userInfo(state, userInfo){ 
            state.userInfo = userInfo
        },
        uploadConfig(state, config){
        	state.config = config
        }
    },
    actions: {
        loginByEamil({commit},{data}){
    		auth.loginByEamil(data,res => {
                commit('token',res)
            },error => {
                
            })
        },
        logout({commit}){
            commit('user',{})
            commit('token',null)
        },
        getUserInfo({commit},cb){
            auth.getUserInfo(res => {
                commit('userInfo',res)
            },error => {
                commit('token',null)
                cb()
            })
        },
        getUploadConfig({commit}){
        	auth.getUploadConfig(res => {
                commit('userInfo',res);
                console.log('getUploadConfig')
            })
        }
    },
    modules: {
        menu,
    }
})