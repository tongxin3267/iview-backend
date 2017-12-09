import util from '../libs/util'

export default {
    state:{
        profile: {}, //个人信息
    	token: util.cookies.get('token') || null, //token凭证;
    	config:{}, //配置信息
    },
    mutations: {
        profile(state, user){ 
            state.profile = user; 
        },
        token(state, token){
            state.token = token; 
            if (token) {
                util.cookies.set('token', token,{expires:3});
            }else{
                util.cookies.remove('token');
            }
        },
        config(state, config){
        	state.config = config; 
        }
    },
    actions: {
        login({commit},data){
            commit('token',data.token);
        },
        logout({commit}){
            commit('profile',{});
            commit('token',null);
        },
        profile({commit},data){
            commit('profile', data);
        },
        config({commit}, data){
            commit('config',data);
        }
    }
}