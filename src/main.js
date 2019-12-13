import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message,Row,Col,Form,FormItem,Upload,Button,Input,Carousel,CarouselItem,Loading,Avatar,Backtop,Icon,Select,Option } from 'element-ui';

/*引入公共样式*/
import 'animate.css'
import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret)
 
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component(Message.name, Message)
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Upload.name, Upload);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Avatar.name, Avatar);
Vue.component(Backtop.name, Backtop);
Vue.component(Icon.name, Icon);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){ //判断该路由是否需要登录权限
    if(store.state.token){ //通过vuex state获取当前的token是否存在
      next();
    }else{
      Message.error({
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
