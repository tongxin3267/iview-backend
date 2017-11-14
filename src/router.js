import Main from './views/main.vue';
// siderMenu 路由
export const appRouter = [
    { 
        path: '/panel', 
        name: 'panel', 
        meta: { title: '我的面板',icon: 'ios-navigate'},
        component: Main,
        children:[
            { 
                path: '/home', 
                name: 'home', 
                meta: { title: '管理首页',icon: 'ios-navigate'},
                component: resolve => { require(['./views/pages/home.vue'], resolve); }
            },
        ]
    },

];
// main组件路由
export const commonRouter = [
    {
        path:'/',
        component: Main,
        redirect: '/home',
        children:[
            { 
                path: '/user', 
                name: 'user', 
                meta: { title: '个人中心'},
                component: resolve => { require(['./views/pages/home.vue'], resolve); }
            },
            { 
                path: '/user/update-password', 
                name: 'update-password', 
                meta: { title: '修改密码'},
                component: resolve => { require(['./views/pages/updatePassword.vue'], resolve); }
            },
        ]
    },
    { 
        path: '/login', 
        name: 'login', 
        meta: { title: '登入', requiresAuth: false },
        component: resolve => { require(['./views/pages/login.vue'], resolve); }
    },
];
// 所有定义的路由
export const routers = [
    ...commonRouter,
    ...appRouter,
];
