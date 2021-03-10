<template>
    
        <div class="number-pad">
      <div class="output">{{output}}</div>
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove">删除</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">清空</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="ok" class="ok">ok</button>
        <button @click="inputContent" class="zero">0</button>
        <button @click="inputContent">.</button>
      </div>
    </div>
    
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
@Component
export default class NumberPad extends Vue{
  // output: string= '0';
  @Prop(Number) readonly value!: number;

  output = this.value.toString();
  
  inputContent(event: MouseEvent){
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    // console.log(button.textContent);
    if(this.output.length===16){return;}
    if(this.output === '0'){      
      if('0123456789'.indexOf(input) >=0){
        this.output = input;
      }else{
        this.output +=input
      }
      return;
    }
    if(this.output.indexOf('.')>=0 && input==='.'){
      return;
    }
  this.output +=input;
  }
  remove(){
    
    this.output = this.output.slice(0,-1);
    if(this.output.length===0){
      this.output='0';
    }
  }
  clear(){
    this.output='0';
  }
  ok(){
    if(parseFloat(this.output)<=0){ return window.alert('金额不可为0或负数')}
    this.$emit('update:value',parseFloat(this.output));
    this.$emit('submit',parseFloat(this.output));
    // console.log(this.output)
    this.output='0'
  }
}


// export default {
//     name: 'NumberPad'
// }
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.number-pad{
  .output{
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas,monospace;
    padding:9px 16px ;
    text-align: right;
    min-height: 72px;
    // box-shadow: inset 0 -5px 5px -5px fade-out(black, 0.5),
    //             inset 0 5px 5px -5px fade-out(black, 0.5);
  }
  .buttons{
    // display: flex;
    // flex-wrap: wrap;
    @extend %clearFix;
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    >button{
      width: 25%;
      height:64px;
      float: left;
      background: transparent;
      border: none;
      &.ok{
        height: 64px*2;
        float: right;
      }
      &.zero{
        width: 50%;
      }
      $bg:#f2f2f2;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($color: $bg, $amount: 4%);
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($color: $bg, $amount: 4*2%);
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($color: $bg, $amount: 4*3%);
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($color: $bg, $amount: 4*4%);
      }
      &:nth-child(14){
        background: darken($color: $bg, $amount: 4*5%);
      }
      &:nth-child(12){
        background: darken($color: $bg, $amount: 4*6%);
      }
    }
  }

  
}
</style>