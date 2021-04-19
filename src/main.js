import Vue from 'vue'
import App from './App'
import * as api from '@/http/api'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$wx = uni
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
