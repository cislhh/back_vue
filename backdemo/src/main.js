// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import store from './store'

//全局注册过滤器
import filterObj from "./filters"
for(let k in filterObj){
    Vue.filter(k,filterObj[k])
}

//给JS用的通用地址前缀
Vue.prototype.$host = "http://localhost:3030"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
