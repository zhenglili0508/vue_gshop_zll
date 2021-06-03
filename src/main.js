/*
  入口js
 */

  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  import store from './store'
  import {Button} from 'mint-ui'

  //注册全局组件标签 
  Vue.component(Button.name,Button)  //可以全局用的标签  <mt-button></mt-button>
  new  Vue({
    el:'#app',
    render: h=>h(App),
    router, // 使用上 vue-router
    store,// 使用上vuex   
  })