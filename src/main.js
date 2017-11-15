import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {
    routers,
    appRouter,
    userRouter
} from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView);
//状态管理
const store = new Vuex.Store({
    state: {
        isLogin: Util.autoLogin(), //登入判断
        user: Util.getUser(), //获取用户信息
        sideMenu: [], //菜单路由传入
        userMenu: [], //个人菜单路由传入
        open: [], //默认打开的菜单
    },
    mutations: {
        login(state, form) {
            Cookies.set('userName', form.userName);
            Cookies.set('password', form.password);
            state.isLogin = true;
        },
        logout(state) {
            Cookies.remove('userName');
            Cookies.remove('password');
            state.isLogin = false;
        },
        menuInit(state) {
            state.sideMenu = appRouter;
            state.userMenu = userRouter.children;
            appRouter.forEach((item, index) => {
                state.open.push(item.name);
            })
        }
    },
    actions: {}
});
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    let isLogin = Boolean(store.state.isLogin); //true用户已登录， false用户未登录
    if (!isLogin && to.name !== 'login') {
        next('login')
    }
    if (isLogin && to.name === 'login') {
        next('home')
    }
    if (to.name === 'logout') {
        store.commit('logout');
        next('login');
    }
    if (to.name === 'user') {

    }
    console.log('beforeEach')
    next();
});
router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {
        this.$store.commit('menuInit');
    }
});