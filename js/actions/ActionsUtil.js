import Utils from '../utils/Utils'
import ProjectModels from '../model/ProjectModel'
 
export function handleData(actionType,dispatch, storeName, data, pageSize,favoriteDao) {
    // debugger
    let fixItem = [];
    if (data && data.data ) {
        if(Array.isArray(data.data)){
            fixItem = data.data
        }else if(Array.isArray(data.data.items)){
            fixItem = data.data.items  
        }       
    }
    // console.log(3,data)    
    let showItems =  pageSize > fixItem.length ? fixItem : fixItem.slice(0, pageSize)
    _projectModules(showItems,favoriteDao, projectModels=>{
       
        dispatch({
            type: actionType,
            storeName: storeName,
            items: fixItem,
            pageIndex: 1,
            projectModels:projectModels
        })
    }) 

     
}
export async function _projectModules(showItems,favoriteDao,callback){
    let keys = [];
    try{
        keys = await favoriteDao.getFavoriteKeys()
    }catch{
        console.log(e)
    }
    let projectModels = [];
    for(let i = 0,len = showItems.length;i<len;i++){
        projectModels.push(new ProjectModels(showItems[i],Utils.checkFavorite(showItems[i],keys)))
    }
    // debugger
    if(callback){
        doCallback(callback,projectModels)
    }
   
    // console.log(projectModels)
    // return projectModels 
   
}

export  function doCallback(callback,object){  
    
    if(callback && typeof callback === 'function'){
        // alert(0)  
        callback(object)
    }
}
