import Main from './views/main.vue';

// 特殊的页面组件
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['./views/page/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['./views/error_page/404.vue'], resolve); }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => { require(['./views/error_page/401.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => { require(['./views/error_page/500.vue'], resolve); }
};


// main组件子页面 不在左侧菜单展示
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: '管理首页', name: 'home_index', component: resolve => { require(['./views/page/home.vue'], resolve); } },
    ]
};


// main组件子页面 在左侧菜单展示
export const appRouter = [



];

// 所有定义的路由
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page401,
    page404
];
