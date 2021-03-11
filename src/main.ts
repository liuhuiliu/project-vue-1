import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icons from '@/components/Icons.vue'
import tagListModel from './models/tagListModel'
import recordListModel from './models/recordListModel'
import picture from '@/assets/qrcode.png';

Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout',Layout)
Vue.component('Icons',Icons)

// window.store = {
// //record store
// recordList : recordListModel.fetch(),
// createRecord : (record:RecordItem)=>{
//   recordListModel.create(record)
// },

// //全局变量太多，严重依赖window

// //tag.store
// tagList : tagListModel.fetch(),
// // findTag (id:string) {
// //   return this.tagList.filter(t => t.id === id)[0];
// // },
// //findTag上下两种皆可
// findTag :(id:string)=>{
//   return window.store.tagList.filter(t => t.id===id)[0];
// },


// createTag : (name: string) =>{
//       const message = tagListModel.create(name);
//       if(message==='duplicated'){
//         window.alert('重复')
//       }else if(message ==='success'){
//         window.alert('添加成功')
//       }
// },

// removeTag : (id:string) =>{
//   // if(tagListModel.remove(id)){
//   //   return true;
//   //   // this.$router.replace('/labels')
//   // }else{
//   //   // window.alert('删除失败')
//   //   return false
//   // }
//   return tagListModel.remove(id)
// },
// updateTag : (id: string,name: string) =>{
//   return tagListModel.update(id,name)
// },

// }
//移到index2.ts中





//
// //record store
// window.store.recordList = recordListModel.fetch();
// window.store.createRecord = (record:RecordItem)=>{
//   recordListModel.create(record)
// }

// //全局变量太多，严重依赖window

// //tag.store
// window.store.tagList = tagListModel.fetch();
// window.store.findTag= (id:string) =>{
//   return window.tagList.filter(t => t.id===id)[0];
// }
// window.store.createTag = (name: string) =>{
//       const message = tagListModel.create(name);
//       if(message==='duplicated'){
//         window.alert('重复')
//       }else if(message ==='success'){
//         window.alert('添加成功')
//       }
// };
// window.store.removeTag= (id:string) =>{
//   // if(tagListModel.remove(id)){
//   //   return true;
//   //   // this.$router.replace('/labels')
//   // }else{
//   //   // window.alert('删除失败')
//   //   return false
//   // }
//   return tagListModel.remove(id)
// };
// window.store.updateTag = (id: string,name: string) =>{
//   return tagListModel.update(id,name)
// }
//以上移入store中

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


window.onload = function(){
 setTimeout(
  function(){
    window.scrollTo(0,200)
  },0
 )
}
console.log(document.documentElement.clientWidth)
if(document.documentElement.clientWidth>500){
  window.alert('请使用手机浏览器或者按F12进入调试模式刷新本网页，以保证浏览效果')
 const image = document.createElement('img')
 console.log(picture)
 image.src= picture
 image.style.position = 'fixed'
 image.style.left='50%'
 image.style.top='50%'
 image.style.transform ='translate(-50%,-50%)'
 image.style.boxShadow = ' 0 0 10px rgba(0,0,0,0.25)'
 document.body.appendChild(image)

}

