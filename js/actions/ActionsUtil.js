import Utils from '../utils/Utils'
import ProjectModels from '../model/ProjectModel'

export function handleData(actionType,dispatch, storeName, data, pageSize,favoriteDao) {
    let fixItem = [];
    if (data && data.data ) {
        if(Array.isArray(data.data)){
            fixItem = data.data
        }else if(Array.isArray(data.data.items)){
            fixItem = data.data.items  
        }       
    }

    let showItems =  pageSize > fixItem.length ? fixItem : fixItem.slice(0, pageSize)
    _projectModules(showItems,favoriteDao, projectModels=>{
        // console.log(projectModels)  
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
    if(typeof(callback)  === 'function'){  
        callback(projectModels)
    }
    // console.log(projectModels)
    // return projectModels 
   
}