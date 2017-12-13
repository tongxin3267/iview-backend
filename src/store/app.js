export default {
	state: {
		sideMenu:[],
		openSubmenu:[]
	},
	mutations: {
        sideMenu(state, data){
            state.sideMenu = data
        },
        openSubmenu(state, data){
            state.openSubmenu = data
        },
	},
	actions: {
		menuInit({commit},{sideMenu,openSubmenu}){
			commit('sideMenu',sideMenu)
			if (!openSubmenu) {
				openSubmenu = [];
				sideMenu.forEach((item, index) => {
                    openSubmenu.push(item.name);
                })
			}
			commit('openSubmenu',openSubmenu)
		}
	}
}