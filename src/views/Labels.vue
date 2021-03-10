<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" 
       :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span> <Icons name="righticon"/>
      </router-link>
      <!-- <li><span>衣</span> <Icons name="righticon"/></li>
      <li><span>食</span> <Icons name="righticon"/></li>
      <li><span>住</span> <Icons name="righticon"/></li>
      <li><span>行</span> <Icons name="righticon"/></li> -->
    </div>
    <div class="createTag-wrapper">
      <ButtonCreate class="createTag" @click="createTag">新建标签</ButtonCreate>
      <!-- or<ButtonCreate class="createTag" @click.native="createTag">新建标签</ButtonCreate> -->
    </div>
  </Layout>

  
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'
import tagListModel from '@/models/tagListModel';
import ButtonCreate from '@/components/ButtonCreate.vue';
import oldstore from '@/store/index2'
import { mixins } from 'vue-class-component';
import TagHelper from  '@/lib/mixins/TagHelper'


// tagListModel.fetch();


@Component({
  components: {ButtonCreate} ,
  
  // computed:{
  //   tags(){
  //     return this.$store.state.tagList//改为get（）
  //   }

    
  // }
})
export default  class Labels extends mixins(TagHelper){
  get tags(){
    return this.$store.state.tagList
  }
  beforeCreate(){
    this.$store.commit('fetchTags')
  }
  //TODO
  // tags = [];
  // tags = oldstore.tagList;//main.ts
  

  createTag(){
    const name = window.prompt('请输入标签名');
    if(name){
      // const message = tagListModel.create(name);
      // if(message==='duplicated'){
      //   window.alert('重复')
      // }else if(message ==='success'){
      //   window.alert('添加成功')
      // }
      // oldstore.createTag(name);//Todo
      this.$store.commit('createTag',name)
    }
  }

}
</script>
<style lang="scss" scoped>
.tags{
  font-size: 16px;
  background: white;
  padding-left: 16px;
  > .tag{
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color:#666;
      margin-right:16px;
    }
  }
}
.createTag{
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  //内联父元素
  &-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
// .nav-wrapper {
//   // border: 1px solid greenyellow;
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
// }
// .content {
//   // border: 1px solid blue;
//   overflow: auto;
//   flex-grow: 1;
// }

</style>