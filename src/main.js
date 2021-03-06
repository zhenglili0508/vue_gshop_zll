/*
  入口js
 */

  import Vue from 'vue'
  import App from './App.vue'
  import VueLazyload from 'vue-lazyload'
  import router from './router'
  import store from './store'
  import {Button} from 'mint-ui'

  import './mock/mockServer' // 加载mockServer即可
  import loading from './common/imgs/loading.gif'
  import '../src/filters' // 加载过滤器


  //注册全局组件标签 
  Vue.component(Button.name,Button)  //可以全局用的标签  <mt-button></mt-button>
  Vue.use(VueLazyload, { // 内部自定义一个指令lazy
    loading
  })

  new  Vue({
    el:'#app',
    render: h=>h(App),
    router, // 使用上 vue-router
    store,// 使用上vuex   
  })