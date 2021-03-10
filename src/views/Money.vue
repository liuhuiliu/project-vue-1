<template>

  <Layout class-prefix="layout">
    <!-- <p>Money.vue</p> -->
    <!--  -->
    <!-- {{record}} -->
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <!-- 监听submit 执行 saverecor -->
    <!-- <NumberPad @update:amount="onUpadteAmount"/> -->
    <!-- <Types :value.sync="record.type" />已改为tabs -->
    <!-- <Types :value="record.type" @update:value="onUpdateType"/> -->
    <Tabs classPrefix='type'
          :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
           place-holder="在此处输入备注" 
           :value.sync="record.notes"
           />
          <!-- @update:value="onUpdateNotes /:value.sync="record.notes""/> -->
    </div>
    
    <Tags @update:value="record.tags= $event"/>
    <!-- {{count}}<button @click="$store.commit('increment',1)">+1</button> -->
    
    <!-- <Tags :data-source.sync="tags" @update:value="onUpdateTags"/> -->
    <!-- <div class="number-pad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>3</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">ok</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div> -->

<!--  -->
    <!-- <div >
      <ul class="types" >
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div> -->
<!--  -->
<!--  -->
    <!-- <div>      
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="请在此处输入金额">
      </label>     
    </div> -->
<!--  -->
<!--  -->
    <!-- <div class="tags">
      <div class="new">
        <button>新增新标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        
      </ul>
      
    </div> -->

    
    
  </Layout>
 
 
</template>




<script lang="ts">
import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue"
import Types from "@/components/Money/Types.vue"
import Tags from "@/components/Money/Tags.vue"
// import Nav from "@/components/Nav.vue";
import { Component, Watch} from 'vue-property-decorator';
// import model from "@/model.js" 这种引入方法有问题，看视频
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
import oldstore from '@/store/index'
import oldstore2 from '@/store/index2'
import store from '@/store/index'
import Tabs from '@/components/Tabs.vue'
import recordTypeList from '@/constans/recordTypeList'
// console.log(oldstore===oldstore2) //证明labels中的oldstore和money中的oldstore是统一的
// const model = require('@/model.js')model;
// console.log(model)

// const recordList=recordListModel.fetch();
// 已经上升到main.ts中

// const tagList = tagListModel.fetch();//已经上升到main.ts中
//
//假设版本更新 recordList中有新的属性，更新方法
//数据库升级，数据迁移


const version=window.localStorage.getItem('version') || '0';
// const recordList: Record[]=JSON.parse(window.localStorage.getItem('recordList')||'[]');
if(version === '0.0.1'){

  window.recordList.forEach(record => {
    record.createdAt = new Date(2020,0,1).toISOString();
    });
    window.localStorage.setItem('recordList',JSON.stringify(window.recordList));
}else if(version ==='0.0.2'){
  //迁移
}
window.localStorage.setItem('version','0.0.5')

// type RecordItem={
//   tags?: string[];
//   notes: string;
//   type: string;
//   amount: number;//数据类型
//   createdAt?: Date;//类（构造函数）
// }
//上述定义已经迁移到custom.d.ts全局定义中

@Component({
  components:{ NumberPad ,Tags, FormItem, Types, Tabs},
  computed:{
    // recordList(){
    //   return this.$store.state.recordList;
    // }
  },
})
export default class Money extends Vue {
  get recordList(){
    return this.$store.state.recordList;
  }

  recordTypeList=recordTypeList;

  // recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');//确认record的类型且定义为空[]，后改为localstorage
  //main.ts

  // recordList: RecordItem[] = oldstore.recordList;//删
  // tags = oldstore.tagList;
  record: RecordItem ={
  tags:[],
  notes:'',
  type:'-',
  amount: 0, 
};
  // components: { Nav }
  // onUpdateTags(value: string[]){
  //   console.log(value);
  //   this.record.tags=value
  // }
  created(){
    this.$store.commit('fetchRecords')
  }
  onUpdateNotes(value: string){
    console.log(value);
    this.record.notes=value
  }
  // onUpdateType(value: string){
  //   console.log(value);
  //   this.record.type=value
  // }
  // onUpadteAmount(value: string){
  //    console.log(value);
  //    this.record.amount= parseFloat(value)
  //    //小数点的可能性所以不能用number
  // }
  saveRecord(){
    // const record2: RecordItem = JSON.parse(JSON.stringify(this.record));//深拷贝,确定record2的数据类型为Record
    
    // const record2: RecordItem =recordListModel.clone(this.record)
    // record2.createdAt = new Date;
    // this.recordList.push(record2);
    //转移到recordListModel中

    // recordListModel.create(this.record)//装一道main.ts中
    // oldstore.createRecord(this.record)//12.19改为store中
    if(!this.record.tags || this.record.tags.length===0){
      return window.alert('请添加标签')
    }
    this.$store.commit('createRecord',this.record)
    
    window.alert('已录入，请勿重复录入')
    this.record.notes = ''
    
    // if(this.$store.state.createRecordError=== null){
    //   window.alert('已录入，请勿重复录入')
    //   this.record.notes = ''
    // }
    // console.log(this.recordList);
  }
  //saveRecord部分内容已经迁移到custom.d.ts全局定义中

  // @Watch('recordList')
  // onRecordListChange(){
  //   // window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
  //   recordListModel.save()
  // }

  //onRecordListChange部分内容已经迁移到custom.d.ts全局定义中
}
</script>
<style lang="scss" >
// .layout-wrapper{
//   border: 3px solid blue;
// }

// .layout-content{
//   // border: 3px solid red;
//   display: flex;
//   flex-direction: column-reverse;

// } //移动到下方中scoped
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep {.layout-content{
  // border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;

} 
.type-tabs-item{
  background:#f5f5f5;
  color:rgba(0, 0, 0, 0.4);
  &.selected{
    background:#c4c4c4;
    color:black;
    &::after{
      display: none;
    }
  }
}

}

.notes{
  padding: 12px 0;
}
// .tags{
//   flex-grow: 1;
//   font-size: 14px;
//   padding: 16px;
//   display: flex;
//   flex-direction: column-reverse;
//   >.current{
//     display: flex;
//     flex-wrap: wrap;
    
//     >li{
//       background: #d9d9d9;
//       $h:24px;
//       line-height: $h;
//       height: $h;
//       border-radius: ($h/2);
//       padding: 0 16px;
//       margin-right: 12px;
//     }
//   }
//   >.new{
//     padding-top: 16px;
//     >button{
//       background: transparent;
//       border: none;
//       border-bottom: 1px solid;
//       color: #999;
//       padding: 0 3px;
//     }
//   }
// }
// .notes{
//   background: #f5f5f5;
  
//   font-size: 14px;
//   padding-left: 16px;
//   display: flex;
//   align-items: center;
//   .name{
//     padding-right: 16px;
//   }
//   input{
//     height: 64px;
//     flex-grow: 1;
//     background: transparent;
//     border: none;
//   }
// }
// .types{
//   background: #c4c4c4;
//   display: flex;
//   text-align: center;
//   font-size: 24px;
//   >li{
//     width: 50%;
//     display: flex;
//     height: 64px;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     &.selected::after{
//       content: '';
//       position: absolute;
//       bottom:0;
//       left: 0;
//       width: 100%;
//       height: 4px;
//       background: #333333;
//     }
//   }
// }
// .number-pad{
//   .output{
//     @extend %clearFix;
//     @extend %innerShadow;
//     font-size: 36px;
//     font-family: Consolas,monospace;
//     padding:9px 16px ;
//     text-align: right;
//     // box-shadow: inset 0 -5px 5px -5px fade-out(black, 0.5),
//     //             inset 0 5px 5px -5px fade-out(black, 0.5);
//   }
//   .buttons{
//     // display: flex;
//     // flex-wrap: wrap;
//     @extend %clearFix;
//     &::after{
//       content: '';
//       display: block;
//       clear: both;
//     }
//     >button{
//       width: 25%;
//       height:64px;
//       float: left;
//       background: transparent;
//       border: none;
//       &.ok{
//         height: 64px*2;
//         float: right;
//       }
//       &.zero{
//         width: 50%;
//       }
//       $bg:#f2f2f2;
//       &:nth-child(1){
//         background: $bg;
//       }
//       &:nth-child(2),&:nth-child(5){
//         background: darken($color: $bg, $amount: 4%);
//       }
//       &:nth-child(3),&:nth-child(6),&:nth-child(9){
//         background: darken($color: $bg, $amount: 4*2%);
//       }
//       &:nth-child(4),&:nth-child(7),&:nth-child(10){
//         background: darken($color: $bg, $amount: 4*3%);
//       }
//       &:nth-child(8),&:nth-child(11),&:nth-child(13){
//         background: darken($color: $bg, $amount: 4*4%);
//       }
//       &:nth-child(14){
//         background: darken($color: $bg, $amount: 4*5%);
//       }
//       &:nth-child(12){
//         background: darken($color: $bg, $amount: 4*6%);
//       }
//     }
//   }

  
// }


// .nav-wrapper {
//   border: 1px solid greenyellow;
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
// }
// .content {
//   border: 1px solid blue;
//   overflow: auto;
//   flex-grow: 1;
// }
</style>