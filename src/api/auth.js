import util from '../libs/util';
const _url = 'auth'; 
export default {
    login(data) {
        return util.axios.post(_url + '/login', data)
    },
    getIdentity() {
        return util.axios.get(_url + '/identity')
    },
    getUploadConfig() {
        return util.axios.get(_url + '/upload-config')
    },
}