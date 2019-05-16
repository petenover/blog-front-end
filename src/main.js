// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import date_filter from './filter/date_filter'
import store from './store'
import VeeValidate from 'vee-validate'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'highlight.js/styles/monokai-sublime.css'

Vue.config.productionTip = false
const instance = axios.create({
})
instance.interceptors.response.use(function (config) {
  // Do something before request is sent
  if (config.data.code == 403) {router.push("/manager/login")}
  return Promise.resolve(config.data);
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
Vue.filter('datetime',date_filter)
Vue.use(VeeValidate, { events: 'blur' })
Vue.prototype.$axios = instance


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
