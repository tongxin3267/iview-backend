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
		sideMenuInit({commit},data){
			commit('sideMenu', data)
		},
		openSubmenuInit({commit},data){
			commit('openSubmenu',data)
		},
		dropdownItemInit({commit},data){
			commit('dropdownItem',data)
		}
	}
}