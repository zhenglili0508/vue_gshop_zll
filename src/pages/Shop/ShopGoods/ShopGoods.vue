<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <!--  current  显示为绿色 ！！-->
                    <li class="menu-item " v-for="(good,index) in goods" :key="index"
                     :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
                        <span class="text bottom-border-1px">
                            <img class="icon" :src="good.icon" v-if="good.icon">
                           {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>

            <div class="foods-wrapper" >
                <ul ref="foodsUl">
                    <li class="food-list-hook"  v-for="(good,index) in goods" :key="index" >
                        <h1 class="title"> {{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"  @click="showFood(food)">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p> 
                                    <div class="extra">
                                    <span class="count">月售 {{food.sellCount}} 份</span>
                                    <span>好评率 {{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                     <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                    <CartControl :food="food"></CartControl>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                  
                </ul>
            </div>

            <ShopCart></ShopCart>
        </div>
        <Food :food="food" ref="food"></Food>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
import {mapState} from 'vuex'
export default{
    data() {
        return {
        scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化) 
        tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
                    //  tops中存的是每个 每个li 的位置   像素值    
        food: {}, // 需要显示的food     
        }
    },

    mounted() {
        //获取数据 
        this.$store.dispatch('getShopGoods',()=>{
            this.$nextTick(()=>{  // 列表数据更新显示后执行

            this._initScroll()   //收集数据的
            this._initTops()

            })
           
        })
    },
        
    computed:{
        ...mapState(['goods']),
        //计算得到 当前分类的下标
        currentIndex(){
           // 得到条件数据
        const {scrollY, tops} = this
        // 根据条件计算产生一个结果
            const index = tops.findIndex((top, index)=>{
                // scrollY>=当前top && scrollY<下一个top
                return scrollY >= top && scrollY < tops[index + 1]
            })
             // 返回结果
        return index
        },

    },

    methods: {
        _initScroll(){
             //列表显示后创建 
            new BScroll('.menu-wrapper',{
                   click: true   //  允许 左边可以点击  默认为false 
            })  //关联对应的div 
            this.foodsScroll = new BScroll('.foods-wrapper',{
                 probeType: 2, // 可以触发监听 
                 click: true
            })
            //给右侧 的绑定监听     'scroll' 是参数 表示绑定什么样的监听   当滚动的时候就触发
             this.foodsScroll.on('scroll',({x,y})=>{
                // console.log(x,y)
                this.scrollY = Math.abs(y)  //收集 坐标 
            })
             this.foodsScroll.on('scrollEnd',({x,y})=>{   //防止 惯性滑动    直接得到最后坐标   
                // console.log("scrollEnd"+x,y)
                this.scrollY = Math.abs(y)  //收集 坐标 
            })

        },
        //初始化 tops
        _initTops(){
            // 1 初始化 tops    
            const tops = []
            let top = 0
            tops.push(top)
            // 2  收集数据  
             //找到所有的 li
            const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook")
             //塞数据到 tops
              Array.prototype.slice.call(lis).forEach(li => {
                top += li.clientHeight //  clientHeight = 内容实际高度 + 上下内边距。
                tops.push(top)
                })
            // 3 更新数据 
            this.tops = tops
            // console.log( tops)
        },
        //点击分类  右侧滑动 
        clickMenuItem(index){
            // console.log(index)
            const scrollY = this.tops[index]
            this.scrollY = scrollY   // 立即更新当前分类   点到哪里  哪里就变绿色   不然会延迟 
            this.foodsScroll.scrollTo(0,-scrollY,1)  //平滑滚动右侧列表 
        },

        showFood(food){
            //跟新food
            this.food = food
            //显示 food  调用子组件的方法 
            this.$refs.food.toggleShow()

        },
        
    },

  components:{
    CartControl,
    Food,
    ShopCart
  }

}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>








