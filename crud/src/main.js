import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import {ModalPlugin} from 'bootstrap-vue'
import {ButtonPlugin} from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = 'http://localhost:8080'

Vue.config.productionTip = false
Vue.use(axios, BootstrapVue)
Vue.use(ModalPlugin, ButtonPlugin)
Vue.prototype.$axios = axios




new Vue({
  render: h => h(App),
}).$mount('#app')