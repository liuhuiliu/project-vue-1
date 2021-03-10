let id: number = parseInt(window.localStorage.getItem('-idMax')|| '0') || 6;
//字符串转化为整数

function createId() {
    id++
    window.localStorage.setItem('-idMax',id.toString())
    return id
}

export default createId