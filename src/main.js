import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import cookies from 'js-cookie';
import axios from 'axios';
import App from './app.vue';
import {routers,appRouter,userRouter} from './router';
import util from './libs/util';
import store from './store/index';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter); 
Vue.use(iView);

//注册axios为 $http
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:100';
axios.defaults.timeout = 3000;

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    console.log('go router:' + to.name);
    iView.LoadingBar.start();
    util.title(to.meta.title);

    let isLogin = Boolean(store.state.user.userName); //true用户已登录， false用户未登录
    //未登入 且访问的不是登入页面
    if (!isLogin) {
        if (to.meta.auth === false) {
            next();
        }else{
            store.dispatch('checkLogin', next);
        }
    }else{
        if (to.name === 'login') {
            next({ name: 'home' });
        }else{
            next();
        }
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0); 
});


new Vue({
    el:'#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {
        this.$store.commit('menuInit',{sideMenu:appRouter,userMenu:userRouter.children});
    }
});