import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import Main from '../views/main.vue';
import store from '../store/index';
import util from '../libs/util';
// siderMenu 路由
export const appRouter = [{
    path: '/panel',
    name: 'panel',
    meta: {title: '我的面板',icon: 'ios-navigate'},
    component: Main,
    children: [
        {
            path: '/home',
            name: 'home',
            meta: {title: '管理首页',icon: 'ios-navigate'},
            component: resolve => {require(['../views/pages/home.vue'], resolve)}
        }
    ]
}, 
{
    path: '/content',
    name: 'content',
    meta: {title: '内容管理',icon: 'ios-navigate'},
    component: Main,
    children: [{
        path: '/page',
        name: 'page',
        meta: {title: '单页管理',},
        component: resolve => {require(['../views/pages/page-index.vue'], resolve)},
        children:[{
            path: 'create',
            name: 'page-create',
            meta: {title: '添加页面',},
            component: resolve => {require(['../views/pages/page-create.vue'], resolve)}
        }]
    }]
},{
    path: '/config',
    name: 'config',
    meta: {title: '系统管理',icon: 'ios-navigate'},
    component: Main,
    children: [{
        path: '/admin',
        name: 'admin',
        meta: {title: '管理员设置',},
        component: resolve => {require(['../views/pages/admin.vue'], resolve)},
    }]
}];
// 用户路由
export const userRouter = {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [{
        path: '/profile',
        name: 'profile',
        meta: {title: '个人中心',icon: 'person'},
        component: resolve => {require(['../views/pages/profile.vue'], resolve)}
    }, {
        path: '/profile/password',
        name: 'password',
        meta: {title: '修改密码',icon: 'gear-a'},
        component: resolve => {require(['../views/pages/profile-password.vue'], resolve)}
    }]
};
export const commonRouter = [
    {
        path: '/',
        redirect: '/home',
    }, {
        path: '/login',
        name: 'login',
        meta: {title: '登入',auth: false},
        beforeEnter: (to, from, next) => {
            if (store.state.auth.token) {
                next({name:'home'});
            }else{
                next()
            }
        },
        component: resolve => {require(['../views/pages/login.vue'], resolve)}
    }, {
        path: '*',
        name: '404',
        meta: {title: '404-页面未找到！',auth: false},
        component: resolve => {require(['../views/pages/404.vue'], resolve)}
    }
];
    
// 所有定义的路由
export const routers = [
    ...appRouter,
    userRouter, 
    ...commonRouter
];
Vue.use(VueRouter);
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    util.title(to.meta.title)

    let isLogin = Boolean(store.state.auth.token) //true用户已登录， false用户未登录
    if (!isLogin && to.meta.auth !== false) {
        next({name: 'login', query: {redirect: to.fullPath}})
    } else {
        next()
    }
});
router.afterEach(() => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
});
export default router;