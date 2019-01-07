import Types from "../types"
import {_projectModules} from '../ActionsUtil'
import FavoriteDao from '../../utils/expand/FavoriteDao'
// 下拉刷新
export function onFetchCollect(storeName){
    const favoriteDao = new FavoriteDao(storeName)
    return (dispatch)=>{
        dispatch({type:Types.COLLECT_FRESH,storeName:storeName})  
            // debugger   
        favoriteDao.getAllItems().then(res=>{
            // console.log(1,storeName)   
            _projectModules(res,favoriteDao,projectModels=>{
                dispatch({
                    type:Types.COLLECT_FRESH_SUCCESS,
                    storeName:storeName,
                    projectModels:projectModels
                })   
            })  
             
        }).catch(error=>{
            dispatch({
                    type:Types.COLLECT_FRESH_ERROR,
                    storeName:storeName
                }) 
            })

    } 

} 
