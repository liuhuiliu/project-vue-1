<template>
 
  <Layout>
    <!-- <p>Statistics.vue</p> -->
    <!-- <Types :value.sync="record.type" /> -->
    <!-- <Types class-prefix="zzz" :value.sync="yyy" /> -->
    <Tabs classPrefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <!-- <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval"/> -->
  
    <!-- <div>
      type:{{type}}
      <br>
      interval:{{interval}}
    </div> -->
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <!-- {{group}} -->
          <!-- {{index}} -->
          <h3 class="title">{{beautify(group.title)}}
            <!-- <span>¥{{group.total}}</span> -->
          </h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes"
              :style="{marginRight:'auto'}">{{item.notes}}</span>
              <span>¥{{item.amount}}</span>
               <!-- {{item.createdAt}} -->
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前无相关记录
      </div>
  
  </Layout>

 
  
</template>
 

<script lang="ts">
// import Vue from 'vue'
import Types from "@/components/Money/Types.vue"
import Tabs from "@/components/Tabs.vue"
import Vue from 'vue'
import { Component, Watch} from 'vue-property-decorator';
import intervalList from '@/constans/intervalList'
import recordTypeList from '@/constans/recordTypeList'
import dayjs from 'dayjs'
import clone from '@/lib/clone'
// const api =dayjs()
// console.log(api)
@Component({
  components:{Types, Tabs}
})
export default class Statistics extends Vue{
  get recordList(){
      return (this.$store.state as RootState).recordList
    }
  
  tagString(tags: Tag[]){
    return tags.length===0?'无':tags.map(t=>t.name).join('，')
  }
  beautify(string: string){
    // const d =new Date(Date.parse(string))
    // const y = d.getFullYear()
    // const m = d.getMonth()
    // const dd = d.getDate()
    // const now = new Date()
    // if(now.getFullYear()===y&&now.getMonth()===m){
    //   return '今天'
    // }else{
    //   return string
    // }//3.1
    // const api =dayjs(string)
    // // console.log(api)
    // console.log(api.isSame)
    const now = dayjs();
    const day = dayjs(string)
    // console.log(now,day)
    if(day.isSame(now,'day')){
      return '今天'
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天';
    } else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天'
    }else if(day.isSame(now,'year')){
      return day.format('M月D日')//string 替代
    }else{
      return day.format('YYYY年M月D日')
    }
  }

    
    get groupedList(){
      // //
      //   [
      //    {title,items}
      //    {title,items}
      //   ]
      //
      // //
      
      const {recordList} = this;//等于const recordList= this.recordList
      if(recordList.length===0){return []}
      // console.log(recordList)
      type HashTableValue = {title: string; items: RecordItem[]}
      const hashTable: {[key: string]: HashTableValue} = {};
      const newList = clone(recordList)
      .filter(r=>r.type===this.type)
      .sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
      
      console.log(newList)
      if(newList.length===0){return []}
      type Result = { title: string; total?: number; items: RecordItem[]}
      const result: Result[] =[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      // console.log(dayjs(newList[0].createdAt).format('YYYY-MM-DD'))
      for(let i= 1;i<newList.length;i++){
        const current = newList[i]
        const last = result[result.length-1]//x中的最后一项
        console.log(current.amount)
        // console.log(current)
        if(dayjs(last.title).isSame(dayjs(current.createdAt),'day') ){
          last.items.push(current)
          // console.log(last)
        }else{
          result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
        }
      }
      
      result.forEach(group=>{
        group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
      })
      // console.log('result')
      // console.log(result)
      return result

      // const {recordList} = this;
      // type HashTableValue = {title: string; items: RecordItem[]}
      // const hashTable: {[key: string]: HashTableValue} = {};
      // for(let i = 0 ;i<this.recordList.length;i++){
      //   const [date, time] = recordList[i].createdAt!.split('T')
      //   // console.log(date);
      //   // console.log([date, time]);
      //   hashTable[date]=hashTable[date] || {title: date,items:[]};
      //   // hashTable[date].push({title:date, items:recordList[i]});
      //   hashTable[date].items.push(recordList[i])
      // }
      // console.log(hashTable)
      // return hashTable;//3.1先排序
      //
      
    }
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
    type='-';
    interval='day';
    // intervalList=[
    //   {text:'按天',value:'day'},
    //   {text:'按周',value:'week'},
    //   {text:'按月',value:'month'},
    //   ]//组件分离
    intervalList=intervalList;
  //  recordTypeList=[
  //    {text:'支出',value:'-'},
  //    {text:'收入',value:'+'}
  //  ]//组件分离
  recordTypeList = recordTypeList

    
}
</script>
<style lang="scss" scoped>
.noResult{
  padding: 16px;
  text-align: center;
}
%item{
  padding: 8px 16px;
  line-height: 28px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title{
  @extend %item;
}
.record{
  @extend %item;
  background-color: white;
  
}
.notes{
  margin-right: auto;
  margin-left: 8px;
  color: #999;
}



::v-deep{ 
  .type-tabs,.interval-tabs{
    background-color: white;
  }
  
  
  
  .type-tabs-item{
  font-size: 23px;
  border-color: transparent;
  color:rgba(0, 0, 0, 0.5);
  background:white;
  &.selected{
    background:#c4c4c4;
    color:black;
    &::after{
      display: none;
    }
  }
}
.interval-tabs-item{
  border-color: transparent;
  color:rgba(0, 0, 0, 0.5);
  background: white;
  height: 48px;
  font-size: 18px;
  &.selected{
    color:black;
    background:#c4c4c4;
    &::after{
      display: none;
    }
  }
}
}



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
