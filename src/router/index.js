import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Home from '../views/Home.vue'
import Temp from '../views/Temp.vue'
import Login from '../views/user/Login.vue'
import Main from '../views/album/Main.vue'
import AlbumReg from '../views/album/AlbumReg.vue'

import Store from '../store/user/user.js'
import UserApi from '../Api/user/UserApi.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { unauthorized : true }
  },
  {
    path: '/temp',
    name: 'temp',
    component: Temp
  },
  {
    path: '/user/login',
    name: 'login',
    component: Login,
    meta: {unauthorized : true}
  },
  {
    path: '/album/main',
    name: 'main',
    component: Main
  },
  {
    path: '/album/reg',
    name: 'albumReg',
    component: AlbumReg
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
/*
router.beforeEach(async(to, from, next) => {

  if(VueCookies.get('access_token') === null && VueCookies.get('refresh_token') !== null){
    await UserApi.refreshToken();
  }

  if(VueCookies.get('access_token') !== null && Store.state.userCode == ''){
    // console.log(UserApi)
    await UserApi.getUserData();
   }

  if(to.matched.some(record => record.meta.unauthorized) && VueCookies.get('access_token')){
  //  return next('/album/main');
  }

  if (to.matched.some(record => record.meta.unauthorized) || VueCookies.get('access_token')){
    
    return next();
  }

  

    alert('로그인 해주세요');
    return next('/user/login');
})*/

export default router

