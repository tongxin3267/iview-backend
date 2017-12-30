import util from '../libs/util';

const page = 'admin';
export default {
	all(params){
		return util.http.get(_url,{params:params});
	},
	view(id,{params:params}){
		return util.http.get(_url + '/' + id,{params:params});
	},
	create(data){
		return util.http.post(_url,data);
	},
	update(id,data){
		return util.http.put(_url + '/' + id,data);
	},
	delete(id){
		return util.http.delete(_url + '/' + id);
	},
	batch(data){
		return util.http.post(_url + '/batch',data);
	},
}