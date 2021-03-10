<template>
  <nav>
  <router-link to="/money" class="item" active-class="selected">
  <Icons class="icon" name="jisuanqi"/>记账
  
    <!-- <svg>
      <use xlink:href="#jisuanqi"/>
    </svg> -->
    
    </router-link>
    
    <router-link to="/labels" class="item" active-class="selected">
    <Icons class="icon" name="biaoqian"/>标签
    <!-- <svg>
      <use xlink:href="#biaoqian"/>
    </svg>   -->
    <!--  -->
    </router-link>
    
    <router-link to="/statistics" class="item" active-class="selected">
    <Icons class="icon" name="zhangdan"/>统计
    <!-- <svg>
      <use xlink:href="#zhangdan"/>
    </svg>   -->
    <!--  -->
    </router-link>
  </nav>
</template> 
<script lang="ts">
// import x from '@/assets/icons/biaoqian.svg';
// import y from '@/assets/icons/jisuanqi.svg';
// import z from '@/assets/icons/zhangdan.svg';
// console.log(x)
// console.log(y)
// console.log(z)

// let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
// try{
//   importAll(require.context('../assets/icons', true, /\.svg$/));
// }catch(error){
//   console.log(error 
//   )
// }

export default {
  name: "Nav"
};
</script>
<style lang="scss" scoped>
// .nav {
//   border: 1px solid orangered;
// }
@import "~@/assets/style/helper.scss";
nav{
  display: flex;
  @extend %outerShadow;
  // box-shadow: 0 0 3px rgba(0,0,0,0.25);
  flex-direction: row ;
  >.item{
    padding: 2px 0;
    width: 33.333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .icon{
    width:32px;
    height: 32px;
  }
  .item.selected{
    color: orange;
   }
}



</style>