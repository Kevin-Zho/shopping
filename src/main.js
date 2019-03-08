// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

import '@/assets/css/iconfont/iconfont.css' //引入阿里矢量图
import '@/assets/css/reset.css' //引入全局样式
import axios from "axios" //全局引入 axios
Vue.prototype.axios = axios //挂载原型链上
Vue.prototype.bus = new Vue() //引入bus总线

import echarts from 'echarts'
// console.log(echarts);

//全局过滤器
Vue.filter('mycurrency', function (arg1, sym) {
  return sym + parseInt(arg1).toFixed(2);
});


import infiniteScroll from 'vue-infinite-scroll'  //下拉加载刷新插件
Vue.use(infiniteScroll)





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
