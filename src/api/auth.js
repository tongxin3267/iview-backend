import util from '../libs/util';
const _url = 'auth';
export default {
    loginByEamil(data, cb, errorCb) {
        util.axios.post(_url + '/loginByEamil', data).then(res => {
            cb(res.data)
        }).catch(error => {
            errorCb(error)
        })
    },
    getUserInfo(cb, errorCb) {
        util.axios.post(_url + '/getUserInfo').then(res => {
            cb(res.data)
        }).catch(error => {
            errorCb(error)
        })
    },
    getUploadConfig(cb) {
        util.axios.get(_url + '/getUploadConfig').then(res => {
            cb(res.data)
        }).catch(error=>{

        });
    },
}