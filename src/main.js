import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers,appRouter} from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);


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

    if (!isLogin && to.path !== '/login') {
        return next({ path: '/login' })
    }
    if (isLogin && (to.path === '/login') || (to.path === '/')) {
        return next({ path: '/home' })
    }
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

//状态管理
const store = new Vuex.Store({
    state: {
        isLogin: (Cookies.get('userName') && Cookies.get('password')) || false,
        menu: [],
        lang: '',
    },
    mutations: {
        login(state,form){
            Cookies.set('userName',form.userName);
            Cookies.set('password',form.password);
            state.isLogin = true;
        },
        logout(state){
            Cookies.remove('userName');
            Cookies.remove('password');
        },
        menuInit(state){
            let menu = [];
            appRouter.forEach((item, index) => {
                menu.push(item)
            })
            state.menu = appRouter;
        }
    },
    actions: {
    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted (){
        this.$store.commit('menuInit');
    }
});