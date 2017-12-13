import Vue from 'vue';
import iView from 'iview'; 
import App from './app.vue';
import router from './router';
import store from './store/index'; 
import util from './libs/util';

import 'iview/dist/styles/iview.css';
import './theme/main.css';

Vue.use(iView);

//注册axios为 $http
Vue.prototype.$http = util.axios;
Vue.prototype.$upload = util.upload;

new Vue({
    el:'#app',
    router: router,
    store: store,
    render: h => h(App)
});
