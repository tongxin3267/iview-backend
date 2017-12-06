export default {
    state:{
    	sideMenu: [], //左侧菜单路由传入
    	openSubmenu: [], //默认打开的左侧菜单
        userMenu: [], //个人菜单路由传入
    },
    mutations: {
        menuInit(state,{sideMenu,openSubmenu,userMenu}) { 
            state.sideMenu = sideMenu;
            state.userMenu = userMenu;
            if (!openSubmenu) {
                sideMenu.forEach((item, index) => {
                    state.openSubmenu.push(item.name);
                })
            }else{
                state.openSubmenu = openSubmenu;
            }
        }
    },
    actions: {
        menuInit({commit},data){
        	commit('menuInit',data);
        }
    }
}