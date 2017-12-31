import util from '../libs/util';

const _url = 'permission';
export default {
	all(params){
		return util.http.get(_url,{params:params});
	},
	view(id){
		return util.http.get(_url + '/' + id);
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
	appRoute()
	{
		return util.http.get(_url + '/app-route');
	}
}