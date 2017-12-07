import env from '../config/env';
import Vue from 'vue';
import iView from 'iview';
import cookies from 'js-cookie';
import store from '../store/index';
import axios from 'axios';


let util = {};
util.cookies = cookies;


util.title = function(title) {
    title = title ? title + ' - Home' : 'iView-Backend';
    window.document.title = title;
};


//axios配置
util.axios = axios.create({
    baseURL: 'http://localhost:100',
    timeout: 30000,
});
//axios拦截器
util.axios.interceptors.request.use(config => {
    if (store.state.user.token) {
        config.headers.Authorization = 'Bearer ' +  store.state.user.token;
    }
    return config;
}, error => {
    iView.Message.error('服务器未响应！');
    return Promise.reject(error);
})
util.axios.interceptors.response.use(data => { 
	return data;
}, error => {
    if (error.response.data.message) {
        iView.Message.error(error.response.data.message);
    }
    return Promise.reject(error.response.data);
})
//上传方法 需要后台获取上传配置
//['upload'=>['server'=>'上传服务器地址','token'=>'令牌','domain'=>'网址前缀']]
util.upload = function(file){
    return  new Promise((resolve,reject)=>{
        let config =  store.state.user.config.upload;
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
        axios.post(server,formData).then(res => {
            resolve(domain + res.data.fkey);
        }).catch(error => {
            reject('上传至云服务器失败');
        });
    })
}
//php时间戳格式化
util.formatDate = function(time,fmt){
    let date = new Date(time*1000);
    let padLeftZero = function(str) {
        return ('00' + str).substr(str.length);
    }
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth()+1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for(let k in o){    
        let str = o[k]+'';
        if(new RegExp(`(${k})`).test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:padLeftZero(str));
        }
    }
    return fmt;
};

export default util;