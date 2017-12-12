import admin from '../api/admin'

export default { 
	state: {
		loading: true,
		items: [ ],
        meta: {}
	},
	mutations: {
        loading(state,data){
        	state.loading = data
        },
        items(state,data){
        	state.items = data
        },
        meta(state,data){
        	state.meta = data
        }
	},
	actions: {
        getAdminItems({commit},page,size){
        	commit('loading',true)
        	admin.getItems(page,size).then(response=>{
        		commit('items',response.data.items)
        		commit('meta',response.data._meta)
        		commit('loading',false)
            }).catch(error=>{
            	commit('loading',false)
            })
        },
        create({commit}){

        }
    }
}