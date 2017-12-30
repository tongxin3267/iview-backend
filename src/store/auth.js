import util from '../libs/util'
import auth from '../api/auth'
import router from '../router'

export default {
	state: {
		token: util.cookies.get('token') || null, //token凭证
		adminInfo: {},  //身份信息
		route:[],
	},
	mutations: {
		token(state, data){
            state.token = data
            if (data) {
                util.cookies.set('token', data, {expires:3})
            }else{
                util.cookies.remove('token')
            }
        },
        adminInfo(state, data){
            state.adminInfo = data
        },
        route(state, data){
            state.route = data
        },
	},
	actions: {
		login({commit},data){ 
			return new Promise((resolve, reject) => {
	            auth.login(data).then(response=>{
	                commit('token',response.data)
	                resolve(response.data)
	            }).catch(error=>{
	            	reject(error)
	            })
        	})
        },
        logout({commit}){
            commit('adminInfo',{})
            commit('token',null)
            router.push({name:'login'})
        },
        getAdminInfo({commit}){
        	return new Promise((resolve, reject) => {
	            auth.index().then(response=>{
	                commit('adminInfo',response.data.adminInfo)
	                commit('route',response.data.route)
	                resolve(response)
	            }).catch(error=>{
	            	reject(error)
	            })
        	})
        },
	}
}