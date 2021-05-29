<template>
  <div>
   <router-view></router-view>
  <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>  


<script>
import {mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

export default{
  mounted() { 
    //this.$store.dispatch('getAddress')  //异步操作 '    这是在更新状态 
    this.getAddress()  //更新了 地址状态    默认的state内部是没有地址的    先更新了  就有
  },

  methods: {
    ...mapActions(['getAddress'])
  },

  components: {
    FooterGuide
  }

 
}

</script>
 

<style lang="stylus" rel="stylesheet/stylus">  
.app 
    width 100%
    height 100%
    background #f5f5f5
    position relative

</style>