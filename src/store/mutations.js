//更新state的对象      多个方法！！
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT, 
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS

} from './mutations_types'
export default{
  [RECEIVE_ADDRESS](state,{address}){
    // console.log(address)
    state.address = address
  },

  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },

  [RESET_USER_INFO](state){
    state.userInfo = {}
  },
  //接收 商品信息 
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },

  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },

  [RECEIVE_INFO](state,{Shopinfo}){
    // console.log(Shopinfo)
    state.info = Shopinfo
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){  //判断没有这个 food.count 的时候 就初始为1 
      // food.count = 1  //新增的属性  （没有数据绑定效果）
      /* 对象 属性 属性值 */      
      Vue.set(food,"count",1)  // 注意 count 是属性名  所以要加“”
      state.cartFoods.push(food)  
    }else{
    //增加food的数量 
      food.count++ 
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    //减少food的数量 
    if(food.count){
      food.count--
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },


  [CLEAR_CART](state){
    //清除food中的count 
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    //移除购物车中的购物项
    state.cartFoods = []
  },
  
  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops
  },


}