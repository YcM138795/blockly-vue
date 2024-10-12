import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import LoginView from '../views/LoginView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/redirect',
    component:HomeView ,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/RedirectIndex.vue')
      }
    ]
  },
  {
    path: '/login',
    name:'login',
    component: LoginView,
    hidden:true
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '*',
    name: '404',
    component: NotFound
  },
]
// 防止连续点击多次路由报错
let routerPush =  VueRouter.prototype.push;
let routerReplace =  VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash', // 如果使用了history模式
  routes
})

export default router
