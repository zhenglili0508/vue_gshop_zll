//基于state的getter 的计算属性
export default{
    totalCount (state){
    return state.cartFoods.reduce((preTotal,food)=> preTotal+food.count,0)
  },

  totalPrice (state){
    return state.cartFoods.reduce((preTotal,food)=> preTotal+food.count*food.price,0)
  },

  positiveSize(state){   //用户评价为满意的 
    return state.ratings.reduce((preTotal,rating)=> preTotal+(rating.rateType === 0),0)
  }, 
}