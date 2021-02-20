import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

//import axios from 'axios'
//import VueAxios from 'vue-axios'


//Vue.prototype.$axios = axios;

//Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
