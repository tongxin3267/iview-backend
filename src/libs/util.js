import env from '../config/env';
import Vue from 'vue';
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
    if (store.state.auth.token) {
        config.headers.Authorization = 'Bearer ' +  store.state.auth.token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})
util.axios.interceptors.response.use(data => { 
	return data;
}, error => {
    if (!error.response) {
        let error = { message:'Response error!' }
        return Promise.reject(error);
    }
    return Promise.reject(error.response.data);
})
util.upload = axios.create({
    timeout: 100000,
});
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