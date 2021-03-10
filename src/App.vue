<template>
  <div id="app">
    <!-- App
    <hr/>-->
    <router-view />
    
    
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";


//---------------------------------
// *{
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }
//------------------------------------
body{
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #333;
  line-height: 1.5;
  font-size: 16px;
  font-family: $font-heiti;
  background: #f5f5f5;
}
// .clearfix::after{
//   content: '';
//   display: block;
//   clear: both;
// }
a{
  text-decoration: none;
  color: inherit;
}
//-------------------------------------------
// #app {
//   // font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   // text-align: center;
//   color: #333;
//   line-height: 1.5;
//   font-family: $font-heiti;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
