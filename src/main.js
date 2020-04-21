import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from "./utils/http";
import Mock from 'mockjs'
import  './mock/caigou'

//saleMock  start
 import "./mock/sale"
 import "./mock/fp"


 //common function JS
 import tools from "./utils/tools"
 Vue.prototype.$tools = tools;

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')