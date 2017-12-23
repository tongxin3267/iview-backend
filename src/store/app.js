export default {
	state: {
		show:false,
		sideMenu:[],
		openSubmenu:[],
		dropdownItem:[],
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
        },
        show(state, data){
        	state.show = data
        },
        filerMenu(state,data){
        	state.sideMenu.forEach((menu)=>{
        		menu.children.forEach((item,index)=>{
        			if (item.meta.auth && (data.indexOf(item.meta.auth) === -1)) {
        				menu.children.splice(index,1)
        			}
        		})
        	})
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
		},
		filerMenu({commit},data){
			commit('filerMenu',data)
			commit('show',true)
		}
	}
}