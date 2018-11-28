import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*引入公共样式*/
import './assets/css/animate.css'
import './assets/css/normalize.css'
import './assets/css/font-awesome.min.css'
import './assets/css/main.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
