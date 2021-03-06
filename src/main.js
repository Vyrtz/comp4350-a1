import Vue from 'vue'
import BootstrapVue from "bootstrap-vue";
import {BootstrapVueIcons } from "bootstrap-vue";
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons);

new Vue({
  render: h => h(App),
}).$mount('#app')
