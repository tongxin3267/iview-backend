import util from '../libs/util'
import auth from '../api/auth'

export default {
	state: {
		token: util.cookies.get('token') || null, //token凭证
		identity: {},  //身份信息
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
        },
        getIdentity({commit}){
        	return new Promise((resolve, reject) => {
	            auth.getIdentity().then(response=>{
	                commit('identity',response.data)
	                resolve(response)
	            }).catch(error=>{
	            	reject(error)
	            })
        	})
        },
	}
}