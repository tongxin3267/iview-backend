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
export default util;