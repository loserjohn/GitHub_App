import Types from "../types"
import DataStore from '../../utils/DataStore'
import {handleData ,_projectModules} from '../ActionsUtil'


// 下拉刷新
export function onFetchData(storeName,src,pageSize,favoriteDao){
    // console.log('on',storeName) 
    const dataStore = new  DataStore()
    return (dispatch)=>{
        dispatch({type:Types.POPULAR_FRESH,storeName:storeName})  
        // let url = src+storeName
        dataStore.fetchData(src).then(res=>{
            
        //    dispatch(fetchData(res,storeName))
                handleData(Types.POPULAR_FRESH_SUCCESS,dispatch,storeName,res,pageSize,favoriteDao) 
        }).catch(error=>{
            dispatch({
                type:Types.POPULAR_FRESH_ERROR,
                storeName:storeName
            }) 
        })
       
    } 

} 

// 加载更多

/**
 *
 *
 * @export
 * @param {*} storeName
 * @param {*} pageIndex
 * @param {*} pageSize
 * @param {*} [dataArray=[]]
 * @param {*} callback
 */
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray = [],callback ,favoriteDao){
//   console.log(storeName,pageIndex,pageSize)
// alert(1)   
    return (dispatch)=>{

        setTimeout(()=>{
        //    alert(1) 
            if((pageIndex-1)*pageSize>=dataArray.length){
                // 如果全部加载数据
               
                if(typeof callback == 'function'){
                    callback('no more')
                }
                dispatch({
                    type:Types.POPULAR_LOADMORE_ERROR,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex
                })
            }else{
               
                let max = pageIndex*pageSize>dataArray.length?dataArray.length:pageIndex*pageSize;
            
                _projectModules(dataArray.slice(0,max) ,favoriteDao,projectModels=>{

                    dispatch({
                        type:Types.POPULAR_LOADMORE_SUCCESS,
                        items:dataArray ,
                        storeName:storeName,
                        pageIndex:pageIndex,   
                        projectModels:projectModels
                    })
                })

            }

        },500)


       
    } 
} 
