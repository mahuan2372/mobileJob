// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import axios from './httpjs.js'
import store from './store/index.js'
import tableAdmin from './view/page/tableAdmin/tableAdmin.vue'
import classify from './view/page/classify/classify.vue'
import commodityAdmin from './view/page/commodityAdmin/commodityAdmin.vue'
import logSearch from './view/page/logSearch/logSearch.vue'
import orderAdmin from './view/page/orderAdmin/orderAdmin.vue'
import sellCount from './view/page/sellCount/sellCount.vue'
import editPw from './view/page/editPw/editPw.vue'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.path=='/'){
    if(!axios.defaults.headers.post['tokenId']){
      next('/login')
    }else{     
      next();
    }
  }else{
    next();
  }

})
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mandMobile);
Vue.component('tableCardList',tableAdmin)//桌位管理
Vue.component('categoryList',classify)//销售分类
Vue.component('goodsList',commodityAdmin)//商品管理
Vue.component('operationLogList',logSearch)//日志查询
Vue.component('orderList',orderAdmin)//订单管理
Vue.component('goodCountList',sellCount)//销售统计
Vue.component('editPw',editPw)//修改密码
Vue.prototype.$http = axios;
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {}
});
