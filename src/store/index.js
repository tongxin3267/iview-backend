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
        },
        logout(state) {
            state.user = {};
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
        login({commit}, data){
            console.log('login')
            axios.get('/user/login').then(function (res) {
                commit('login',res.data);
                next();
            }).catch(function (error) {
                commit('logout');
                next({name:'login'});
            });          
        },
        logout({commit}) { 
            console.log('logout')
            axios.get('/user/logout').then(function (res) {
                commit('logout');
                next();
            }).catch(function (error) {
                commit('logout');
                next();
            });
        },
        checkLogin({commit}, next){
            console.log('checkLogin')
            axios.get('/user/login').then(function (res) {
                console.log(res);
                console.log(res.data);
                commit('login',res.data);
                next();
            }).catch(function (error) {
                console.log(error);
                commit('logout');
                next({name:'login'});
            });          
        }
    }
})