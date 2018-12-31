import Types from "../types"
import DataStore from '../../utils/DataStore'
import {handleData} from '../ActionsUtil'


// 下拉刷新
export function onFetchData(storeName,src,pageSize){
    // console.log('on',storeName) 
    const dataStore = new  DataStore()
    return (dispatch)=>{
        dispatch({type:Types.POPULAR_FRESH,storeName:storeName})  
        // let url = src+storeName
        dataStore.fetchData(src).then(res=>{
            
        //    dispatch(fetchData(res,storeName))
                handleData(Types.POPULAR_FRESH_SUCCESS,dispatch,storeName,res,pageSize)
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
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray = [],callback ){
  console.log(storeName,pageIndex,pageSize)
    return (dispatch)=>{

        setTimeout(()=>{
            // console.log(666,storeName,pageIndex,pageSize,dataArray)  
            if((pageIndex-1)*pageSize>=dataArray.length){
                // 如果全部加载数据
               
                if(typeof callback == 'function'){
                    callback('no more')
                }
                dispatch({
                    type:Types.POPULAR_LOADMORE_ERROR,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray
                })
            }else{

                let max = pageIndex*pageSize>dataArray.length?dataArray.length:pageIndex*pageSize;
                dispatch({
                    type:Types.POPULAR_LOADMORE_SUCCESS,
                    items:dataArray ,
                    storeName:storeName,
                    pageIndex:pageIndex,   
                    projectModes:dataArray.slice(0,max) 
                })
            }

        },500)


       
    } 
} 




// function handleData(dispatch,storeName,data,pageSize){ 
//    let fixItem = [];
//    if(data && data.data &&  data.data.items){
//     fixItem = data.data.items
//    }
//    dispatch({
//     type:Types.POPULAR_FRESH_SUCCESS,
//     storeName:storeName, 
//     items:fixItem,
//     pageIndex:1,
//     projectModes:pageSize>fixItem.length?fixItem:fixItem.slice(0,pageSize) 
// })
// } 