import Vue from 'vue'
import Vuex from 'vuex'
import tagListModel from '@/models/tagListModel'
import recordListModel from '@/models/recordListModel'
import createId from '@/lib/idCreate'
Vue.use(Vuex)

const localStorageKeyName = 'tagList'

const tagStore={
    //tag.store
//   tagList : tagListModel.fetch(),
  tagList : [] as Tag[],
  fetchTags(){
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') ;
    return this.tagList;
  } ,
  // findTag (id:string) {
  //   return this.tagList.filter(t => t.id === id)[0];
  // },
  //findTag上下两种皆可
  findTag(id: string){
    return this.tagList.filter(t => t.id===id)[0];
  },
  
  
  createTag(name: string) {

    //this.data = [{id:'1',name:'xxx'},{id:'1',name:'xxxxxx'}]
    const names = this.tagList.map(item=>item.name)
    //吧data里面的name收集起来生成一个新的数组
    
    if(names.indexOf(name)>=0){ 
        window.alert('重复')
        return 'duplicated'}
    const id = createId().toString();//数字又字符串化
    this.tagList.push({id: id,name: name});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
    
  },
  
  removeTag(id: string) {
    // if(tagListModel.remove(id)){
    //   return true;
    //   // this.$router.replace('/labels')
    // }else{
    //   // window.alert('删除失败')
    //   return false
    // }
    // return tagListModel.remove(id)
    let index  = -1;
        for(let i= 0 ;i<this.tagList.length; i++ ){
            if(this.tagList[i].id ===id){
                index = i
                break;
            }
            
        }
        
        this.tagList.splice(index,1);
        this.saveTags();
        
        return 'done'
  },
  updateTag (id: string,name: string){
    const idList = this.tagList.map(item => item.id)
        if(idList.indexOf(id)>=0){
            const names =this.tagList.map(item => item.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.tagList.filter(item => item.id ===id)[0]
                tag.name=name;
                tag.id=id;
                this.saveTags()
                return "success"
            }
        }else{
            return 'not-found'
        }
  },
  saveTags(){
    window.localStorage.setItem('tagList', JSON.stringify(this.tagList));
  },
}
tagStore.fetchTags();
export default tagStore;