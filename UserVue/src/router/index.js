import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/logIn/logIn'
import register from '@/views/register/register'
import forget from '@/views/forget/forget'
import index from '@/views/index/index'
import car from '@/views/car/car'
import carInfo from '@/views/car/carInfo'
import forum from '@/views/forum/forum'
import forumInfo from '@/views/forum/forumInfo'
import announcement from '@/views/announcement/announcement'
import announcementInfo from '@/views/announcement/announcementInfo'
import seek from '@/views/seek/seek'
import favor from '@/views/favor/favor'
import center from '@/views/center/center'
import error404 from '@/views/error/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/forget',
    name: 'forget',
    component: forget,
  },
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/car',
    name: 'car',
    component: car,
  },
  {
    path: '/carInfo',
    name: 'carInfo',
    component: carInfo,
  },
  {
    path: '/forum',
    name: 'forum',
    component: forum,
  },
  {
    path: '/forumInfo',
    name: 'forumInfo',
    component: forumInfo,
  },
  {
    path: '/announcement',
    name: 'announcement',
    component: announcement,
  },
  {
    path: '/announcementInfo',
    name: 'announcementInfo',
    component: announcementInfo,
  },
  {
    path: '/seek',
    name: 'seek',
    component: seek,
  },
  {
    path: '/favor',
    name: 'favor',
    component: favor,
  },
  {
    path: '/center',
    name: 'center',
    component: center,
  },
  {
    path: '/404',
    name: '404',
    component: error404,
  },
  { 
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
let routerReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
