// function clone(data:any){
//     return JSON.parse(JSON.stringify(data));
// }//数据类型的问题3.1
function clone<x>(data: x): x{
    return JSON.parse(JSON.stringify(data));
}


export default clone;