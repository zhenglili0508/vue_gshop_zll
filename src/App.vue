<template>
  <div>
   <router-view></router-view>
  <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>  


<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqFoodCategorys} from './api'
export default{
  mounted() {
    const result1 = reqFoodCategorys()
    console.log(result1)
    // this.$store.dispatch('getAddress')
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