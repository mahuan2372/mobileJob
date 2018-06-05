import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '../view/index.vue'
import login from '../view/login.vue'
import mobile from '../view/page/mobile/mobile.vue'
import logSearchMobile from '../view/page/logSearch/logSearchMobile.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '点餐管理系统'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '点餐管理系统登录'
      }
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile,
      meta: {
        title: '点餐管理系统登录--移动端'
      }
    },
    {
      path: '/operationLogList',
      name: 'operationLogList',
      component: logSearchMobile,
      meta: {
        title: '点餐管理系统登录--移动端'
      }
    }
  ]
})
