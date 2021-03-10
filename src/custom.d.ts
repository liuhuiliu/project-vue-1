type RootState = {
  recordList: RecordItem[];
  // createRecordError?:Error|null,
  tagList: Tag[];
  currentTag?: Tag;
}


type RecordItem={
    tags?: string[];
    notes: string;
    type: string;
    amount: number;//数据类型object\string
    createdAt?: string;//类（构造函数）
  }
type Tag = {
    id: string;
    name: string;
}
type tagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success'|'duplicated';//string//'success'成功 'duplicated'重复//string也可，但记得return
    save: () => void; //void 意为不返回值，抄就完事了
    update: (id: string,name: string) => 'success'|'not-found'|'duplicated';
    remove: (id: string) => 'done';
}

//全局作用域
  interface Window{
    store: {
      tagList: Tag[];
      recordList: RecordItem[]; 
      createRecord: (record: RecordItem) => void;
      //
      findTag: (id: string) => Tag | undefined;
      createTag: (name: string) => void;
      removeTag: (id: string) => string;
      updateTag: (id: string,namne: string) => 'success'|'not-found'|'duplicated';
      //updateTag:tagLIstModel['update']
    };



    tagList: Tag[];
    recordList: RecordItem[]; 
    createRecord: (record: RecordItem) => void;
    //
    findTag: (id: string) => Tag | undefined;
    createTag: (name: string) => void;
    removeTag: (id: string) => string;
    updateTag: (id: string,namne: string) => 'success'|'not-found'|'duplicated';
    //updateTag:tagLIstModel['update']
    //以上移入store中
    
  }