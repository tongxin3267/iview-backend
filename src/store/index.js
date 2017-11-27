import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
import cookies from 'js-cookie';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    	user: null, //获取用户信息 
        token: cookies.get('token') || null,
        sideMenu: [], //菜单路由传入
        openSubmenu: [], //默认打开的菜单
        userMenu: [], //个人菜单路由传入
    },
    mutations: {
        login(state, user) { 
            state.user = user; 
            cookies.set('token', user.token);
        },
        logout(state) {
            state.user = null;
            cookies.remove('token');
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
        checkAuth({commit},next){
            axios.post('/user/login').then(function (res) {
                commit('login',res.data);
                next();
            }).catch(function (error) {
                
                commit('logout');
                next({'name':'login'});
            });          
        }
    }
})
