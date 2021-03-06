export default class Utils {
    static checkFavorite(item, keys = []){
        if(!keys) return false;
        for(let i =0,len = keys.length;i<len;i++){
            let id = item.id ? item.id : item.fullName;
            if(id.toString() === keys[i]){
                return true;
            }
        }
        return false
    }

    static ArrayRemove(arr,key){
        arr.map((item,index)=>{
            if(item == key){
                arr.splice(index,1)
            }   
        })
    }
}