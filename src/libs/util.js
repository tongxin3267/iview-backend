import axios from 'axios';
import env from '../config/env';
import cookies from 'js-cookie';

let util = {

};

util.title = function(title) {
    title = title ? title + ' - Home' : 'iView-Backend';
    window.document.title = title;
};


util.$http = axios.create({
    baseURL: 'http://localhost:100',
    timeout: 30000,
    headers: {'Authorization': 'Bearer ' + cookies.get('token')}
});



























export default util;