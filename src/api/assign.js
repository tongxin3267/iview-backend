import util from '../libs/util';

export default {
	assignRole(id,data){
		return util.axios.put('assign-role/'+id, data);
	},
	assignPermission(id,data){
		return util.axios.put('assign-permission/'+id, data);
	}	
}