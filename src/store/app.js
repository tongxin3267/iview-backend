export default {
	state: {
		dropdownItem:[],
		sideMenu:[],
		openSubmenu:[]
	},
	mutations: {
		dropdownItem(state, data){
            state.dropdownItem = data
        },
        sideMenu(state, data){
            state.sideMenu = data
        },
        openSubmenu(state, data){
            state.openSubmenu = data
        },
	},
	actions: {
		menuInit({commit},{dropdownItem,sideMenu,openSubmenu}){
			commit('dropdownItem',dropdownItem)
			commit('sideMenu',sideMenu)
			if (!openSubmenu) {
				openSubmenu = [];
				sideMenu.forEach((item, index) => {
                    openSubmenu.push(item.name);
                })
                commit('openSubmenu',openSubmenu)
			}else{

			}
		}
	}
}