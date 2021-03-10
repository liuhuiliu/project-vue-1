<template>
    <div class="tags">
      <div class="new">
        <button @click="createTag">新增新标签</button>
      </div>
      <ul class="current">
        <li v-for="tag in tagList" :key="tag.id" 
        :class="{selected:selectedTags.indexOf(tag)>=0}"
        @click="toggle(tag)">{{tag.name}}</li>
       
        
      </ul>
      
    </div>
</template>


<script lang="ts">
import TagHelper from '@/lib/mixins/TagHelper';
import store from '@/store/index';
import oldstore from '@/store/index2';
import Vue from 'vue';
import { mixins } from 'vue-class-component';

import { Component, Prop } from 'vue-property-decorator';

@Component({
  computed:{
    // tagList(){
    //   // return this.$store.fetchTags();
    //   return this.$store.state.tagList;//改为get（）
    // },

  }
})
export default class Tags extends mixins(TagHelper){
  // @Prop({required:true}) readonly dataSource: string[]|undefined;
  
// tagList = oldstore.fetchTags();//移入computed
  selectedTags: string[]=[];
  get tagList(){
    return this.$store.state.tagList;
  }
  created(){
    this.$store.commit('fetchTags')
    
  }
  
  
  toggle(tag: string){
    const index = this.selectedTags.indexOf(tag)
    if(index>=0){
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags);
  }
  // create(){//该功能移入mixins中12.25
  //   const name =window.prompt('请输入标签名');
  //   if(name){
  //     this.$store.commit('createTag',name);//todo
  //     // console.log(this.tagList)
  //   }else{window.alert('不得为空');}
    
  //   //转移到main。ts同一管理
  //   // const name=window.prompt('请输入标签名');
  //   // if(name===''){
  //   //   window.alert('标签名不得为空')
  //   // }else if(this.dataSource){
  //   //   this.$emit('update:dataSource',[...this.dataSource,name])
  //   //   //不能修改外部数据!}
  //   // }else{
  //   //   console.log('cancel')
  //   // }
  // }
}
// export default {
//     name: 'Tags'
// }
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags{
  background: white;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  >.current{
    display: flex;
    flex-wrap: wrap;
    
    >li{
      $bg:#d9d9d9;
      background: $bg;
      $h:24px;
      line-height: $h;
      height: $h;
      border-radius: ($h/2);
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background: darken($bg,30%);
        color: white;
      }
    }
  }
  >.new{
    padding-top: 16px;
    >button{
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 3px;
    }
  }
}
</style>