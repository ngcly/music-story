import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import SignIn from './views/sign-in.vue'
import SignUp from './views/sign-up.vue'
import Layout from './components/Layout'
import Create from './views/Create.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{
        path: '/',
        name: 'home',
        component: Home
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        requireAuth: true //表示进入该路由需要登录
      },
      component: Create
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404')
    },
    { 
      path: '*', 
      redirect: '/404', 
      hidden: true 
    }
  ]
})
