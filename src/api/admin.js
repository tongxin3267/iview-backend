import util from '../libs/util';

const _url = 'admin';
export default {
	getItems(params){
		return util.axios.get(_url,{params:params});
	},
	view(id){
		return util.axios.get(_url + '/' + id);
	},
	create(data){
		return util.axios.post(_url,data);
	},
	update(id,data){
		return util.axios.put(_url + '/' + id,data);
	},
	delete(id){
		return util.axios.delete(_url + '/' + id);
	},
	deleteAll(data){
		return util.axios.post(_url + '/delete-all',data);
	},
}