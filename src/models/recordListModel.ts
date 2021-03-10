import clone from '@/lib/clone.ts';

const localStorageKeyName = 'recordList'

const recordListModel = {
    data:[] as RecordItem[],
    // clone(data:RecordItem[]|RecordItem){
    //     return JSON.parse(JSON.stringify(data));
    // },
    //clone已经封装成单独模块
    create(record: RecordItem){
        const record2: RecordItem =clone(record)
        record2.createdAt = new Date().toISOString();
        this.data.push(record2);
        this.save();
    }
    //12.9 create也移入recordstore中
    ,
    fetch() {
        // const x: RecordItem[] =JSON.parse(window.localStorage.getItem('recordList') || '[]');
        // return x;
        //或者像下面这种写法
        this.data= JSON.parse(JSON.stringify(this.data))
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    //12.8fetch功能移入到recordStore中
    //获取数据
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
    //保存数据
}



export default recordListModel