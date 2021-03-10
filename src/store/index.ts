import clone from '@/lib/clone';
import createId from '@/lib/idCreate';
import TagHelper from '@/lib/mixins/TagHelper';
import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)//把store 绑定到vue.prototype.$store= store

// type RootState = {
//   recordList: RecordItem[],
//   tagList: Tag[],
//   currentTag?: Tag,
// };//移动到custom中2/23
const localStorageKeyName = 'recordList'
const store =  new Vuex.Store({
  state: {//data
    count: 0,
    // createRecordError:null,
    recordList:[] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined,
  } as RootState,
  mutations: {//method
    //records
    fetchRecords(state) {
      // const x: RecordItem[] =JSON.parse(window.localStorage.getItem('recordList') || '[]');
      // return x;
      //或者像下面这种写法
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      
  },

    createRecord(state,record){
    // recordListModel.create(record)
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date().toISOString();
    state.recordList.push(record2);//若data 不存在时
    console.log(state.recordList)
    store.commit('saveRecords')
    window.alert('saved')
    },
    saveRecords(state){
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.recordList));
    },
    //tags
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') ;
      if(!state.tagList || state.tagList.length===0){
        // store.commit('createTag','衣')
        // store.commit('createTag','食')
        // store.commit('createTag','住')
        // store.commit('createTag','行')
        // store.commit('createTag','其他')
        state.tagList.push({id: '1',name: '衣'});
        state.tagList.push({id: '2',name: '食'});
        state.tagList.push({id: '3',name: '住'});
        state.tagList.push({id: '4',name: '行'});
        state.tagList.push({id: '5',name: '其他'});
        store.commit('saveTags')
      }
    } ,
    createTag(state,name: string) {

      //this.data = [{id:'1',name:'xxx'},{id:'1',name:'xxxxxx'}]
      const names = state.tagList.map(item=>item.name)
      //吧data里面的name收集起来生成一个新的数组
      
      if(names.indexOf(name)>=0){ 
          window.alert('重复')
          return 'duplicated'}
      const id = createId().toString();//数字又字符串化
      state.tagList.push({id: id,name: name});
      store.commit('saveTags')
      window.alert('添加成功');
      return 'success';
      
    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    findTag(state, id: string){
      return state.tagList.filter(t => t.id===id)[0];
    },
    setCurrentTag(state,id: string){
      
      state.currentTag =  state.tagList.filter(t => t.id===id)[0];
      
    },
    updateTag (state,payload: {id: string;name: string}){
      const{id,name}=payload
      const idList = state.tagList.map(item => item.id)
          if(idList.indexOf(id)>=0){
              const names =state.tagList.map(item => item.name)
              if(names.indexOf(name)>=0){
                  window.alert('标签名重复')
                  return 'duplicated'
              }else{
                  const tag = state.tagList.filter(item => item.id ===id)[0]
                  tag.name=name;
                  tag.id=id;
                  // this.saveTags()
                  store.commit('saveTags')
                  // return "success"
              }
          }else{
              // return 'not-found'
          }
    },

    removeTag(state,id: string) {
      // if(tagListModel.remove(id)){
      //   return true;
      //   // this.$router.replace('/labels')
      // }else{
      //   // window.alert('删除失败')
      //   return false
      // }
      // return tagListModel.remove(id)
      let index  = -1;
          for(let i= 0 ;i<state.tagList.length; i++ ){
              if(state.tagList[i].id ===id){
                  index = i
                  break;
              }
              
          }
          if(index>=0){state.tagList.splice(index,1);
            store.commit('saveTags');
            console.log('done')
            window.alert('删除成功')
            router.replace('/labels')
          }else{
            window.alert('删除失败')
          }
          
          
          
    },
    
  },
  // actions: {
  // },
  // modules: {
  // }
})


export default store;