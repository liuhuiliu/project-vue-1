import Vue from 'vue'
import Vuex from 'vuex'
import tagListModel from '@/models/tagListModel'
import recordListModel from '@/models/recordListModel'
import clone from '@/lib/clone'
Vue.use(Vuex)

const localStorageKeyName = 'recordList'

// function fetchRecords() {
//     // const x: RecordItem[] =JSON.parse(window.localStorage.getItem('recordList') || '[]');
//     // return x;
//     //或者像下面这种写法
//     data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
//     return data
// };

// function saveRecords() {
//     window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
// }

const recordStore={
    recordList : []as RecordItem[],
    fetchRecords() {
        // const x: RecordItem[] =JSON.parse(window.localStorage.getItem('recordList') || '[]');
        // return x;
        //或者像下面这种写法
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    
    createRecord(record: RecordItem){
    // recordListModel.create(record)
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date().toISOString();
    this.recordList&&this.recordList.push(record2);//若data 不存在时
    recordStore.saveRecords();
    //替换到index中
  },
};

recordStore.fetchRecords();
export default recordStore;