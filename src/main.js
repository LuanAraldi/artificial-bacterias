// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Hello from './components/Hello'
import router from './router'
import Bacteria from './components/Bacteria'

Vue.config.productionTip = false

Vue.component('hello', Hello)
Vue.component('bacteria', Bacteria)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
