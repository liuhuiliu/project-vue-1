import router from '@/router';
import idCreate from '@/lib/idCreate.ts'
import createId from '@/lib/idCreate.ts';

const localStorageKeyName = 'tagList'
type Tag = {
    id: string;
    name: string;
}
type tageLIstModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success'|'duplicated';//string//'success'成功 'duplicated'重复//string也可，但记得return
    save: () => void; //void 意为不返回值，抄就完事了
    update: (id: string,name: string) => 'success'|'not-found'|'duplicated';
    remove: (id: string) => 'done';
}
//设置数据类型
const tagListModel: tageLIstModel = {
    data: [],
    // clone(data:RecordItem[]|RecordItem){
    //     return JSON.parse(JSON.stringify(data));
    // },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') ;
        // const x: RecordItem[] =JSON.parse(window.localStorage.getItem('recordList') || '[]');
        // return x;
        //或者像下面这种写法
        // return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    //获取数据
    create(name: string ) {
        
        //this.data = [{id:'1',name:'xxx'},{id:'1',name:'xxxxxx'}]
        const names = this.data.map(item=>item.name)
        //吧data里面的name收集起来生成一个新的数组
        
        if(names.indexOf(name)>=0){ return 'duplicated'}
        const id = createId().toString();//数字又字符串化
        this.data.push({id: id,name: name});
        this.save();
        return 'success';
        
    },
    //新增数据
    update(id,name){
        const idList = this.data.map(item => item.id)
        if(idList.indexOf(id)>=0){
            const names =this.data.map(item => item.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.data.filter(item => item.id ===id)[0]
                tag.name=name;
                tag.id=id;
                this.save()
                return "success"
            }
        }else{
            return 'not-found'
        }
    },
    //更新数据 --12.10该功能已经移入tagStore
    
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    //保存数据
    remove(id: string){
        let index  = -1;
        for(let i= 0 ;i<this.data.length; i++ ){
            if(this.data[i].id ===id){
                index = i
                break;
            }
            
        }
        
        this.data.splice(index,1);
        this.save();
        
        return 'done'
    }
}



export default tagListModel