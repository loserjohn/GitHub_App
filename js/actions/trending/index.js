import Types from "../types"
import DataStore from '../../utils/DataStore'
export const FLAG_STORE = {
    flag_popular: 'popular',
    flag_trending: 'trending'
}
import {handleData ,_projectModules} from '../ActionsUtil'

// 下拉刷新
export function onRefreshTrending(storeName,src, pageSize,favoriteDao) {
    // console.log('on',storeName,src, pageSize) 
    const dataStore = new DataStore()
    return (dispatch) => {
        dispatch({
            type: Types.TRENDING_FRESH,
            storeName: storeName
        })
         
        // let url = src+storeName;
        // alert(url)
        dataStore.fetchData(src,FLAG_STORE.flag_trending)
            .then(res => {
                // console.log(res)
                handleData(Types.TRENDING_FRESH_SUCCESS,dispatch, storeName, res, pageSize,favoriteDao)
            }).catch(error => {
                dispatch({
                    type: Types.TRENDING_FRESH_ERROR,
                    storeName: storeName
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
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callback,favoriteDao) {
    //   console.log(storeName,pageIndex,pageSize)
    return (dispatch) => {

        setTimeout(() => {
            // console.log(666,storeName,pageIndex,pageSize,dataArray)  
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                // 如果全部加载数据

                if (typeof callback == 'function') {
                    callback('no more')
                }
                dispatch({
                    type: Types.TRENDING_LOADMORE_ERROR,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex
                })
            } else {

                let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
                _projectModules(dataArray.slice(0,max) ,favoriteDao,projectModels=>{
                    // debugger 
                    dispatch({
                        type:Types.TRENDING_LOADMORE_SUCCESS, 
                        items:dataArray ,
                        storeName:storeName,
                        pageIndex:pageIndex,   
                        projectModels:projectModels 
                    })
                })

            }

        }, 500)



    }
}
