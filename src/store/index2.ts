import Vue from 'vue'
import Vuex from 'vuex'
import tagListModel from '@/models/tagListModel'
import recordListModel from '@/models/recordListModel'
import recordStore from '@/store/recordStore'
import tagStore from '@/store/tagStore'
Vue.use(Vuex)

const store ={
  ...recordStore,
  ...tagStore,
}


// const store = {
//   //record store
//   recordList : recordListModel.fetch(),
//   createRecord : (record:RecordItem)=>{
//     recordListModel.create(record)
//   },
  
//   //全局变量太多，严重依赖window
  
//   //tag.store
//   tagList : tagListModel.fetch(),
//   // findTag (id:string) {
//   //   return this.tagList.filter(t => t.id === id)[0];
//   // },
//   //findTag上下两种皆可
//   findTag :(id:string)=>{
//     return window.store.tagList.filter(t => t.id===id)[0];
//   },
  
  
//   createTag : (name: string) =>{
//         const message = tagListModel.create(name);
//         if(message==='duplicated'){
//           window.alert('重复')
//         }else if(message ==='success'){
//           window.alert('添加成功')
//         }
//   },
  
//   removeTag : (id:string) =>{
//     // if(tagListModel.remove(id)){
//     //   return true;
//     //   // this.$router.replace('/labels')
//     // }else{
//     //   // window.alert('删除失败')
//     //   return false
//     // }
//     return tagListModel.remove(id)
//   },
//   updateTag : (id: string,name: string) =>{
//     return tagListModel.update(id,name)
//   },
  
  
// //其中部分都转移到tagstore recordstore中
// }

export default store;