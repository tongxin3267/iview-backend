import util from '../libs/util';

const _url = 'admin';
export default {
	login(data){
		return util.axios.post(_url + '/connect',data);
	},
	config(){
		console.log(5);
		return util.axios.get(_url + '/config');
	},
	all(page,prePage){
		let params = {};
		if(page){
			params['page'] = page;
		}
		if (prePage) {
			params['pre-page'] = prePage;
		}
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
	remove(id){
		return util.axios.delete(_url + '/' + id);
	}
}