import axios from 'axios';
import env from '../config/env';
import Cookies from 'js-cookie';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});


util.getUserCache = function(){
	return (Cookies.get('userName') && Cookies.get('password')) || false;
}




















export default util;