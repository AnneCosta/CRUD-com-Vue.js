import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';
import BootstrapVue, { BFormInput, BFormGroup, BLink, BButtonClose} from 'bootstrap-vue'
import {ModalPlugin, AlertPlugin, BForm, BButton, BAlert, BProgress} from 'bootstrap-vue'

import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {firestorePlugin} from 'vuefire'

import router from './router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = 'http://localhost:8080'

Vue.config.productionTip = false
Vue.use(axios, BootstrapVue, AlertPlugin, BProgress)
Vue.use(ModalPlugin, BForm, VueRouter, firestorePlugin, firebase)
Vue.prototype.$axios = axios
Vue.component('b-button',BButton)
Vue.component('b-alert', BAlert)
Vue.component('b-progress', BProgress)
Vue.component('b-form-input', BFormInput)
Vue.component('b-form-group',BFormGroup)
Vue.component('b-form', BForm)
Vue.component('b-link', BLink)
Vue.component('b-button-close', BButtonClose)


var config = {
  apiKey: "AIzaSyAz98EuYpMN7vX6CgOh6YNDBbsEKIwjWjk",
  authDomain: "crud-vue-4e470.firebaseapp.com",
  databaseURL: "https://crud-vue-4e470.firebaseio.com",
  projectId: "crud-vue-4e470",
  storageBucket: "crud-vue-4e470.appspot.com",
  messagingSenderId: "346353484914",
  appId: "1:346353484914:web:8b5c30c65b14097b386eeb",
  measurementId: "G-066T42NZ4M"
};

firebase.initializeApp(config);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')