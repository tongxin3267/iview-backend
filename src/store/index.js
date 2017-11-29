import Vue from 'vue'
import Vuex from 'vuex';
import util from '../libs/util';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    	user: null, //获取用户信息 
        token: util.cookies.get('token') || null,
        menu:{
            sideMenu: [], //菜单路由传入
            userMenu: [], //个人菜单路由传入
            openSubmenu: [], //默认打开的菜单
        }
    },
    mutations: {
        login(state, user) { 
            state.user = user; 
            state.token = user.token;
            util.cookies.set('token', user.token,{expires:3});
        },
        logout(state) {
            state.user = null;
            state.token = null;
            util.cookies.remove('token');
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

    }
})
