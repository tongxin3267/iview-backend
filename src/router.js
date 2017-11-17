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
export const userRouter = {
    path:'/use',
    component: Main,
    redirect: '/home',
    children:[
        { 
            path: '/user/:username', 
            name: 'user', 
            meta: { title: '个人中心',icon:'person'},
            component: resolve => { require(['./views/pages/user.vue'], resolve); }
        },
        { 
            path: '/user/update-password', 
            name: 'update-password', 
            meta: { title: '修改密码',icon:'gear-a'},
            component: resolve => { require(['./views/pages/updatePassword.vue'], resolve); }
        },
        { 
            path: '/user/logout', 
            name: 'logout', 
            meta: { title: '退出登入',icon:'log-out',divided: true},
            redirect: '/login',
        },
    ]
};

export const commonRouter=[
    {
        path:'/',
        redirect: '/home',
    },
    { 
        path: '/login', 
        name: 'login', 
        meta: { title: '登入', auth: false },
        component: resolve => { require(['./views/pages/login.vue'], resolve); }
    },
    { 
        path: '*', 
        name: '404', 
        meta: { title: '404-页面未找到！', auth: false },
        component: resolve => { require(['./views/pages/404.vue'], resolve); }
    },

]
// 所有定义的路由
export const routers = [
    ...appRouter,
    userRouter,
    ...commonRouter
];
