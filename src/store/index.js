import Vue from 'vue'
import Vuex from 'vuex';
import util from '../libs/util';

Vue.use(Vuex);

export default new Vuex.Store({ 
    state: {
    	user: null, //用户信息 
        token: util.cookies.get('token') || null, // token
        upConfig: null, // 上传的配置
        menu:{
            sideMenu: [], //菜单路由传入
            userMenu: [], //个人菜单路由传入
            openSubmenu: [], //默认打开的菜单
        }
    },
    mutations: {
        user(state, user) { 
            state.user = user; 
        },
        token(state,token){
            state.token = token; 
            if (token) {
                util.cookies.set('token', token,{expires:3});
            }else{
                util.cookies.remove('token');
            }
        },
        upConfig(state,config){
            state.upConfig = config; 
        },
        menu(state,{sideMenu,userMenu,openSubmenu}) { 
            state.menu.sideMenu = sideMenu;
            state.menu.userMenu = userMenu;
            if (!openSubmenu) {
                sideMenu.forEach((item, index) => {
                    state.menu.openSubmenu.push(item.name);
                })
            }else{
                state.menu.openSubmenu = openSubmenu;
            }
        }
    },
    actions: {
        loginByEamil({commit},data){
            return new Promise((resolve,reject)=>{
                util.axios.post('user/login',data).then(res => {
                    commit('user',res.data);
                    commit('token',res.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        loginByCookie({commit}){
            return  new Promise((resolve,reject)=>{
                util.axios.post('user/auth').then(res => {
                    commit('user',res.data);
                    resolve();
                }).catch(error => {
                    this.dispatch('logout');
                    reject(error);
                })
            })
        },
        logout({commit}){
            commit('user',null);
            commit('token',null);
        },
        getUpConfig({commit}){
            util.axios.post('attachment/token').then(res => {
                commit('upConfig',res.data);
            }).catch(() => {
            });
        },
        upload({commit},file){
            return  new Promise((resolve,reject)=>{
                if (!this.state.upConfig) {
                    reject();
                }
                let server = this.state.upConfig.server,
                    token = this.state.upConfig.token,
                    domainUrl = this.state.upConfig.domain,
                    formData = new FormData;
                    formData.append('file',file);
                    formData.append('token',token);
                util.upload.post(server,formData).then(res => {
                    resolve({url:domainUrl + '/' + res.data.fkey});
                }).catch(error => {
                    reject(error);
                });
            })
        }
    }
})
