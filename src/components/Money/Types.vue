<template>
    <div >
      <ul class="types" >
        <li :class="{selected: value==='-',
        [classPrefix+'-item']: classPrefix}"
        @click="selectType( '-' )">支出
         </li>
        <li :class="{selected: value==='+',
        [classPrefix+'-item']:classPrefix}"
         @click="selectType( '+' )">收入
         </li>
      </ul>
    </div>
</template>
<script lang= "ts">
//这是js代码
// export default {
//     name: 'Types',
//     props:['xxx'],
//   data(){
//     return{
//       type:'-'//-为支出+为收入
//     }
//   },
//   mounted(){
//     console.log(this.xxx)
//   }
//   ,
//   methods:{
//     selectType(type){
//       if(type!=='-' && type !=='+'){
//         throw new Error('type is unkonw')
//       }
//       this.type = type;
//     }
//   }
// }
//以下为ts-----------------------------------------------
import Vue from 'vue'
// import {Component} from 'vue-property-decorator';
import { Component, Prop, Watch } from 'vue-property-decorator'
@Component

export default class Types extends Vue{
  // @Prop(Number) xxx: number | undefined;
  //prop 告诉 vue xxx不是data 是prop
  //Number 告诉vue xxx运行时是个number
  //xxx 是属性名字
  // number | undefined 告诉ts编译时就是 xxx的类型

  // type = '-';
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  type = this.value
  selectType(type: string){
    if(type!=='-' && type !=='+'){
        throw new Error('type is unkonw');
      }
      // this.type = type;
    this.$emit('update:value',type)

      
  }

  // @Watch('type')
  // onTypeChanged(value: string){
  //   this.$emit('update:value',value);
  }
  // created(){}
  // mounted(){
  //   if(this.xxx===undefined){
  //     console.log('undefined')
  //   }else{
  //     console.log(this.xxx.toString())
  //   }
    
  // }


</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types{
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  >li{
    width: 50%;
    display: flex;
    height: 64px;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after{
      content: '';
      position: absolute;
      bottom:0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333333;
    }
  }
}
</style>