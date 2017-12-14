export default {
	state: {
		sideMenu:[],
		openSubmenu:[],
		dropdownItem:[]
	},
	mutations: {
        sideMenu(state, data){
            state.sideMenu = data
        },
        openSubmenu(state, data){
            state.openSubmenu = data
        },
        dropdownItem(state, data){
        	state.dropdownItem = data
        }
	},
	actions: {
		menuInit({commit},{sideMenu,openSubmenu,dropdownItem}){
			commit('sideMenu',sideMenu)
			commit('dropdownItem',dropdownItem)
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