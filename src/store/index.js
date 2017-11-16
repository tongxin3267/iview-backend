import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
import cookies from 'js-cookie';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    	user: {}, //获取用户信息 
        sideMenu: [], //菜单路由传入
        openSubmenu: [], //默认打开的菜单
        userMenu: [], //个人菜单路由传入
    },
    mutations: {
        login(state, user) {
            state.user = user;
            cookies.set('_auth',JSON.stringify(user));
        },
        logout(state) {
            state.user = {};
            cookies.remove('_auth');
        },
        menuInit(state,{sideMenu,userMenu}) { 
            state.sideMenu = sideMenu;
            state.userMenu = userMenu;
            sideMenu.forEach((item, index) => {
                state.openSubmenu.push(item.name);
            })
        }
    },
    actions: {
        autoLogin({commit}, next){
            if (cookies.get('_auth')) {
                axios.get('./static/user.json').then(function (res) {
                    commit('login',res.data.data);
                    next();
                }).catch(function (error) {
                    commit('logout');
                    next({name:'login'});
                });   
            }else{
                next({name:'login'});
            }          
        }
    }
})