import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import layout from './views/layout.vue';
import slayout from './views/slayout.vue';
import store from './store/index';
import util from './libs/util';

// 登入
export const login = {
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
    component: resolve => {require(['./views/pages/login.vue'], resolve)}
}
// 404
export const error404 = {
    path: '*',
    name: '404',
    meta: {title: '404-页面未找到！',auth: false},
    component: resolve => {require(['./views/pages/404.vue'], resolve)}
}

// 公共路由
export const commonRouter = {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [{
        path: 'profile',
        name: 'profile',
        meta: {title: '个人中心',icon: 'person'},
        component: resolve => {require(['./views/pages/profile.vue'], resolve)}
    },{
        path: 'password',
        name: 'password',
        meta: {title: '修改密码',icon: 'gear-a'},
        component: resolve => {require(['./views/pages/password.vue'], resolve)}
    },]
}

// siderMenu 路由
export const appRouter = [{
    path: '/panel',
    name: 'panel',
    meta: {title: '我的面板',icon: 'ios-navigate'},
    component: layout,
    children: [
        {
            path: '/home',
            name: 'home',
            meta: {title: '管理首页',icon: 'ios-navigate'},
            component: resolve => {require(['./views/pages/home.vue'], resolve)}
        }
    ]
}, 
{
    path: '/config',
    name: 'config',
    meta: {title: '系统管理',icon: 'ios-navigate'},
    component: layout,
    children: [{
        path: '/admin',
        name: 'admin',
        meta: {title: '管理员设置'},
        component: slayout,
        redirect: {name:'admin-index'},
        children: [{
            path: 'index',
            name: 'admin-index',
            meta: {title: '管理员列表',},
            component: resolve => {require(['./views/admin/index.vue'], resolve)}
        },{
            path: 'create',
            name: 'admin-create',
            meta: {title: '添加管理员',},
            component: resolve => {require(['./views/admin/create.vue'], resolve)}
        },{
            path: 'update/:id',
            name: 'admin-update',
            meta: {title: '编辑管理员',},
            component: resolve => {require(['./views/admin/update.vue'], resolve)}
        }]
    },
    {
        path: '/role',
        name: 'role',
        meta: {title: '角色管理'},
        component: slayout,
        redirect: {name:'role-index'},
        children: [{
            path: 'index',
            name: 'role-index',
            meta: {title: '角色列表',},
            component: resolve => {require(['./views/role/index.vue'], resolve)}
        },{
            path: 'create',
            name: 'role-create',
            meta: {title: '添加角色',},
            component: resolve => {require(['./views/role/create.vue'], resolve)}
        },{
            path: 'update/:id',
            name: 'role-update',
            meta: {title: '编辑角色',},
            component: resolve => {require(['./views/role/update.vue'], resolve)}
        }]
    },
    {
        path: '/permission',
        name: 'permission',
        meta: {title: '权限管理'},
        component: slayout,
        redirect: {name:'permission-index'},
        children: [{
            path: 'index',
            name: 'permission-index',
            meta: {title: '权限列表',},
            component: resolve => {require(['./views/permission/index.vue'], resolve)}
        },{
            path: 'create',
            name: 'permission-create',
            meta: {title: '添加权限',},
            component: resolve => {require(['./views/permission/create.vue'], resolve)}
        },{
            path: 'update/:id',
            name: 'permission-update',
            meta: {title: '编辑权限',},
            component: resolve => {require(['./views/permission/update.vue'], resolve)}
        }]
    }]
}];

// 所有定义的路由
export const routers = [
    login,
    error404,
    commonRouter,
    ...appRouter
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