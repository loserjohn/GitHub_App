import Types from "../types"
import {handleData ,_projectModules,doCallback} from '../ActionsUtil'
import Utils from "../../utils/Utils";

const URL = 'https://api.github.com/search/repositories?q='
let CancelArray = []

// 搜索开始
export function onSearchData(keyWord,token,pageSize,favoriteDao,popularKeys,callback){
    
    const url = URL + keyWord +  '&sort=stars';
    debugger 
    return (dispatch)=>{
        dispatch({type:Types.SEARCH_FRESH})  
    //    console.log(url)
        fetch(url).then(response=>{       
            // console.log(0,response)
            // 判断是否取消请求
            if(hasCancel(token,true)){               
                return null
            }else{ 
                // 没有取消  则继续操作            
                return response.json()   
            }
        }).then(res=>{
           
            // 二次判断
            if(hasCancel(token,false)){
                return null
            }else{
                // debugger
                if(!res|| !res.items || res.items.length===0){                 
                    dispatch({
                        type:Types.SEARCH_FRESH_ERROR,
                        message:`没有找到${keyWord}相关的项目`
                    }) 
                    doCallback(callback,`没有找到${keyWord}相关的项目`) 
                    return 
                }
                let items = res.items;
                handleData(Types.SEARCH_FRESH_SUCCESS,dispatch,'',{data:items},pageSize,favoriteDao)  
            }
           
        }).catch(error=>{
            dispatch({
                type:Types.SEARCH_FRESH_ERROR
            }) 
        })
       
    } 

} 

// 判断是否取消对列中
function hasCancel(token,bool){
    // debugger
   if(CancelArray.includes(token)){
    //    在取消的队列中
    Utils.ArrayRemove(CancelArray,token);
    return true
   }else{
        if(bool){
            Utils.ArrayRemove(CancelArray,token);
        }
        return false 
   }
}

// 取消请求
export function onSearchCancel(token){
    Utils.ArrayRemove(CancelArray,token);
    dispatch({
        type:Types.SEARCH_CANCEL
    })
 }


// 加载更多

export function onLoadMoreSearch(pageIndex,pageSize,dataArray = [],callback ,favoriteDao){
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
                    type:Types.SEARCH_LOADMORE_ERROR,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex
                })
            }else{
               
                let max = pageIndex*pageSize>dataArray.length?dataArray.length:pageIndex*pageSize;
            
                _projectModules(dataArray.slice(0,max) ,favoriteDao,projectModels=>{

                    dispatch({
                        type:Types.SEARCH_LOADMORE_SUCCESS,
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
