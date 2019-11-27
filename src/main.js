import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMqtt from 'vue-mqtt'

// Vue.use(VueMqtt, 'ws://10.1.1.110:9001')
Vue.use(VueMqtt, 'ws://172.19.0.1:9001')
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
