/*
路由器对象模块 
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/Msite/Msite.vue' 
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import Shop from '../pages/Shop/Shop.vue'


Vue.use(VueRouter)

export default new VueRouter({
    //所有路由 
    routes:[
        {
            path: '/msite',
            component: MSite, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
            meta:{
              showFooter:true
            }
          },
           
          {
            path: '/search',
            component: Search,
            meta:{
              showFooter:true
            },
          },
          {
            path: '/order',
            component: Order,
            meta:{
              showFooter:true
            },
          },
          {
            path: '/profile',
            component: Profile,
            meta:{
              showFooter:true
            },
          },
          {
            path: '/',
            redirect: '/msite'
          },
          {
            path: '/login',
            component: Login,
          },
          //shop
          {
            path: '/shop',
            component: Shop,
            children:[
                      {
                        path: '/shop/goods',
                        component: ShopGoods,                       
                      },
                      {
                        path: '/shop/info',
                        component: ShopInfo,
                      },
                      {
                        path: '/shop/ratings',
                        component: ShopRatings,
                      },
                      {
                        path: '',
                        redirect: '/shop/goods'
                      },
            ]
          },

     //路由配置结束部分       
    ]
})