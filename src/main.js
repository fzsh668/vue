// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible';
Vue.config.productionTip = false;
var Less = require('Less');
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import store from './store';
import { api,myAxios } from "./Api/Public";
Vue.prototype.api = api;
Vue.prototype.$axios = myAxios;
Vue.prototype.$http = myAxios;
Vue.config.productionTip = false; // 阻止启动生产消息

//使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
    let role = store.getters.gettoken;
    let routes = ['login','register'];
    if(routes.indexOf(to.name)!=-1&&!role) {
        next();
    }else if(!role){
        next('/');
    }else {
        next();
    }
    //}
})
/*let that = this;
//响应拦截器
myAxios.interceptors.response.use(
    response => {
        if(response.data.code==-100){
            this.$router.push('/');
        }
    return response;

}, error => {
    return Promise.resolve(error.response)
})*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
