//更新state的对象      多个方法！！
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
} from './mutations_types'
export default{
  [RECEIVE_ADDRESS](state,{address}){
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
  [RECEIVE_GOODS](state,{shops}){
    state.shops = shops
  },

  [RECEIVE_RATINGS](state,{shops}){
    state.shops = shops
  },
  
  [RECEIVE_INFO](state,{shops}){
    state.shops = shops
  },

}