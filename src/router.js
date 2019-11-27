import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: ()=> import('./components/Layout'),
      children: [{
        path: '/',
        name: 'home',
        component: ()=> import('./views/Home.vue')
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: ()=> import('./views/Index.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: ()=> import('./views/sign-in.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: ()=> import('./views/sign-up.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        requireAuth: true //表示进入该路由需要登录
      },
      component: ()=> import('./views/Create.vue')
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
