import Vuex from "vuex";
import Vue from 'vue'
import label from './labeladmin.js'
import menu from './menu.js'
Vue.use(Vuex);
const store = new Vuex.Store({
  modules:{
    label,
    menu
  }    
});

export default store
