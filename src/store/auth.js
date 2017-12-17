import util from '../libs/util'
import auth from '../api/auth'
import router from '../router'

export default {
	state: {
		token: util.cookies.get('token') || null, //token凭证
		identity: {},  //身份信息
		filterRouter: {}
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
        identity(state, data){
            state.identity = data
        },
        filterRouter(state, data){
            state.filterRouter = data
        },

	},
	actions: {
		login({commit},data){ 
			return new Promise((resolve, reject) => {
	            auth.login(data).then(response=>{
	                commit('token',response.data.token)
	                resolve(response.data)
	            }).catch(error=>{
	            	reject(error)
	            })
        	})
        },
        logout({commit}){
            commit('identity',{})
            commit('token',null)
            router.push({name:'login'})
        },
        getIdentity({commit}){
        	return new Promise((resolve, reject) => {
	            auth.getIdentity().then(response=>{
	                commit('identity',response.data.identity)
	                commit('filterRouter',response.data.filterRouter)
	                resolve(response)
	            }).catch(error=>{
	            	reject(error)
	            })
        	})
        },
	}
}