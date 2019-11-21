import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

/*引入公共样式*/
import './assets/css/animate.css'
import './assets/css/normalize.css'
import './assets/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){ //判断该路由是否需要登录权限
    if(store.state.token){ //通过vuex state获取当前的token是否存在
      next();
    }else{
      ElementUI.Message.error({
        customClass:'my-message',
        message:'该页面需登录，即将自动跳转登录页。',
        onClose: ()=>next({
          path: '/signin',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      })
    }
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
