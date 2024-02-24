import { ElNotification,ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
export function toast(message,type="success",dangerouslyUseHTMLString=true){
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString
    })
}

export function showModal(content="提示内容",type="warning",title=""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type,
        }
      )
}

//显示全屏loading
export function showFullloading(){
        nprogress.start()
}
//隐藏全局loading
export function hideFullloading(){
    nprogress.done()
}
export function showPrompt(tip,value){
    return  ElMessageBox.prompt(tip, '', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValue:value
      })
}
//将query转成url参数
export function queryparams(query){
    let q=[]
    for (const key in query) {
       if( query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
       }
    }
    let r=q.join("&")
    r=r? ("?"+r):""
    
    return r
}
export function useArrayMoveup(arr,index){
    swapArray(arr,index,index-1)
}
export function useArrayMovedown(arr,index){
    swapArray(arr,index,index+1)
}
function swapArray(arr,index1,index2){
    arr[index1]=arr.splice(index2,1,arr[index1])[0]
    return arr
}
// sku排列算法
export function cartesianProductOf() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
        var ret = [];
        a.forEach(function (a) {
            b.forEach(function (b) {
                ret.push(a.concat([b]));
            });
        });
        return ret;
    }, [
        []
    ]);
  }