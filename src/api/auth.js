import util from '../libs/util';
const _url = 'auth'; 
export default {
    login(data) {
        return util.http.post(_url + '/login', data)
    },
    password(data){
    	return util.http.put(_url + '/password', data)
    },
    index() {
        return util.http.get(_url + '/index')
    },
    uploadConfig() {
        return util.http.get(_url + '/upload-config')
    },

}