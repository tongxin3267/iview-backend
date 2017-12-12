import auth from '../api/auth'
import util from '../libs/util'
export default {
	state: {
		uploadConfig: {} //上传配置
	},
	mutations: {
        uploadConfig(state, data){
            state.uploadConfig = data
        },
	},
	actions: {
        getUploadConfig({commit}){
            return new Promise((resolve, reject) => {
	            auth.getUploadConfig().then(response=>{
	                commit('uploadConfig',response.data)
	                resolve(response)
	            }).catch(error=>{
	            	reject(error)
	            })
        	})
        },
        upload({state},file){
        	let config = state.uploadConfig;
		    return  new Promise((resolve,reject)=>{
		        if (!config) {
		            reject('获取上传配置失败');
		        }
		        if (config.maxSize && config.maxSize < file.size) {
		            reject('文件大小超出限制');
		        }
		        if (config.accepts && config.accepts.indexOf(file.type) === -1) {
		            reject('图片格式不支持');
		        }
		        let server = config.server,
		            token = config.token,
		            domain = config.domain,
		            formData = new FormData;
		            formData.append('file',file);
		            formData.append('token',token);
		        util.upload.post(server,formData).then(res => {
		            resolve(domain + res.data.fkey);
		        }).catch(error => {
		            reject('上传至云服务器失败');
		        });
		    })
		}
	}
}