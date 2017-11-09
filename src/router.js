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

// main组件子页面 不在左侧菜单展示
export const otherRouter = {
    path: '/',
    component: Main,
    children: [
        {
            path: '/home', 
            meta: {
                title: '首页'
            }, 
            name: 'home',
            component: resolve => { require(['./views/page/home.vue'], resolve)} 
        },
    ]
};


// main组件子页面 在左侧菜单展示
export const appRouter = [
    {
        path: '/home',
        component: Main,
        children: [
            {
                path: '/home', 
                meta: {
                    title: '首页'
                }, 
                name: 'home',
                component: resolve => { require(['./views/page/home.vue'], resolve)} 
            },
        ]
    }


];

// 所有定义的路由
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page404
];
