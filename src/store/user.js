export default {
    state:{
    	token: util.cookies.get('token') || null, //token凭证
    	profile: {}, //个人信息
    	config:{}, //配置信息
    },
    mutations: {
        token(state, token){
            state.token = token; 
            if (token) {
                util.cookies.set('token', token,{expires:3});
            }else{
                util.cookies.remove('token');
            }
        },
        profile(state, user){ 
            state.user = user; 
        },
        config(state, config){
        	state.token = config; 
        }
    },
    actions: {
        loginByEamil({commit},data){
        	commit('profile', data);
            commit('token',data.token);
            return new Promise((resolve,reject)=>{
                util.axios.post('user/login',data).then(res => {
                    
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        loginByCookie({commit},data){
        	commit('profile', data);
        },
        logout({commit}){
            commit('profile',null);
            commit('token',null);
        },
        getConfig({commit}, data){
            commit('config',data);
        },
        upload({commit},{file,maxSize,accepts}){
            return  new Promise((resolve,reject)=>{
                if (!this.state.upConfig) {
                    reject('获取上传配置失败');
                }
                if (maxSize && maxSize < file.size) {
                    reject('文件大小超出限制');
                }
                if (accepts && accepts.indexOf(file.type) === -1) {
                    reject('图片格式不支持');
                }
                let server = this.state.upConfig.server,
                    token = this.state.upConfig.token,
                    domainUrl = this.state.upConfig.domain,
                    formData = new FormData;
                    formData.append('file',file);
                    formData.append('token',token);
                util.upload.post(server,formData).then(res => {
                    resolve(domainUrl + res.data.fkey);
                }).catch(error => {
                    reject('上传至云服务器失败');
                });
            })
        }
    }
}