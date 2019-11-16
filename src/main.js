import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMqtt from 'vue-mqtt'

Vue.use(VueMqtt, 'ws://127.0.0.1:9001')
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
