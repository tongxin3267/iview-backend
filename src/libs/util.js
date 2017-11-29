import env from '../config/env';
import Vue from 'vue';
import iView from 'iview';
import store from '../store/index';
import axios from 'axios';
import cookies from 'js-cookie';


let util = {};
util.cookies = cookies;


util.title = function(title) {
    title = title ? title + ' - Home' : 'iView-Backend';
    window.document.title = title;
};
util.axios = axios.create({
    baseURL: 'http://localhost:100',
    timeout: 30000,
});
util.axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' +  (store.state.token || 'null');
    return config;
}, error => {
    iView.Message.error('服务器未响应，请稍后再试！');
    return Promise.reject(error);
})
util.axios.interceptors.response.use(data => { 
	return data;
}, error => {
	iView.Message.error(error.response.data.message);
    return Promise.reject(error.response.data);
})


util.formatDate = function(time,fmt){
    let date = new Date(time);
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