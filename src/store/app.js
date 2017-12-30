export default {
	state: {
		title:'',
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
        	let sideMenu = state.sideMenu;
        	sideMenu.forEach((menu)=>{
        		sideMenu.children.forEach((item,index)=>{
        			if (item.meta.auth && (data.indexOf(item.meta.auth) === -1)) {
        				sideMenu.children.splice(index,1)
        			}
        		})
        	})
        	state.sideMenu = sideMenu;
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