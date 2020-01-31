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
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = 'http://localhost:8080'

Vue.config.productionTip = false
Vue.use(axios, BootstrapVue, AlertPlugin, BProgress, vuetify)
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
  apiKey: "********",
  authDomain: "********.firebaseapp.com",
  databaseURL: "https://********.firebaseio.com",
  projectId: "********",
  storageBucket: "********.appspot.com",
  messagingSenderId: "********",
  appId: "********",
  measurementId: "********"
};

firebase.initializeApp(config);

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
